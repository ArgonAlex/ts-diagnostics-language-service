# ts-diagnostics-language-service

TypeScript [language service plugin](https://blogs.msdn.microsoft.com/typescript/2017/04/27/announcing-typescript-2-3/) that allows ignoring specific errors or changing them to warnings. 

**Notice** This plugin only affects errors displayed in code editors. It does not affect the diagnostics returned from compilation via tsc, webpack loaders, etc. Errors from compilation will need to be filtered out using some other method. For example, ts-loader for webpack has an ignoreDiagnostics option.

To use the plugin:

 * install the plugin with `npm install ts-diagnostics-language-service` or `yarn add ts-diagnostics-language-service`
 
 * enable the plugin in your `tsconfig.json` file:
```json
{
  "compilerOptions": {
    "plugins": [
      { "name": "ts-diagnostics-language-service"}
    ]
  }
}
```

 * if you use VS Code, select the workspace version of typescript using the version switcher. The integrated version of typescript is currently not able to find installed language service plugins. Reference: https://code.visualstudio.com/docs/languages/typescript#_using-newer-typescript-versions

## Configuration options

Each option takes an array of numbers representing typescript error codes. List of available error codes for reference: https://github.com/Microsoft/TypeScript/blob/master/src/compiler/diagnosticMessages.json

 * `ignore` - array of error codes to remove
 * `warning` - array of error codes to change to warnings
 
Here is a configuration sample:

```json
{
  "compilerOptions": {
    "plugins": [
      { "name": "tslint-language-service",
        "ignore": [2700], // removes "Rest types may only be created from object types" errors
        "warning": [6133] // changes unused locals/parameter errors to warnings
      }
    ]
  }
}
```
