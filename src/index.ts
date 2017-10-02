import * as ts_module from '../node_modules/typescript/lib/tsserverlibrary';

interface Config {
	ignore: number[];
	warning: number[];
}

function init(modules: { typescript: typeof ts_module }) {
	const ts = modules.typescript;

	function create(info: ts.server.PluginCreateInfo) {
		const config = info.config as Config;

		if (config && (config.ignore || config.warning)) {
			// set up the proxy object
			const proxy = Object.create(null) as ts.LanguageService;
			const oldLS = info.languageService;
			for (const k in oldLS) {
				proxy[k] = function () {
					return oldLS[k].apply(oldLS, arguments);
				}
			}

			const ignoreSet = config.ignore && new Set(config.ignore);
			const warningSet = config.warning && new Set(config.warning);

			proxy.getSemanticDiagnostics = function (fileName: string) {
				let diagnostics = oldLS.getSemanticDiagnostics(fileName);

				if (diagnostics) {
					if (ignoreSet)
						diagnostics = diagnostics.filter(diagnostic => !ignoreSet.has(diagnostic.code));

					if (warningSet)
						diagnostics = diagnostics.map(diagnostic => {
							return warningSet.has(diagnostic.code)
								? { ...diagnostic, category: ts.DiagnosticCategory.Warning }
								: diagnostic;
						});
				}

				return diagnostics;
			}

			return proxy;
		} else {
			return info.languageService;
		}
	}

	return { create };
}

export = init;
