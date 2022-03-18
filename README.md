# @gamerig/package-starter

This is a utility package to help you start writing typescript libraries faster. It is integrated with rollup.js and builds library as UMD,ES and CommonJS modules.

## Usage

- clone this repository and run `npm install`
- remove `.git` folder and initialize git with your own remote repo
- edit `package.json` to match the library info you are building
- start writing the code in `src` dir

## Building

- for development run `npm run dev` which is an alias to `rollup -c -w`
- for production run `npm run build`
- by default the output is in `dist` folder
- typescript declaration files are also generated and bundles into a single `index.d.ts` file

## Releasing

When you are ready to push it to npm repository, just follow the regular guidelines to publish it
The package has release-it installed to help with versioning and publishing

- change `.release-it.json` config to suit your needs
- run `npm run release` and answer the questions or run it in a CI env

_Note_: we recommend using VS Code, it is already setup to use the eslint and prettier rules and formatters
