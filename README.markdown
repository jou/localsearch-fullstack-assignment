# localsearch Home Assignment - Jiayong Ou

This implementation consist of a Vue SPA with an express app serving as a BFF.

## Running

The repository root has a `package.json` as well which can install dependencies & run both applications.

By default, the BFF listens on port 3000 and the web app listens on port 5173. If one of those is taken, check the README of the respective application for more info.

### Install dependencies

Run install from here and everything will be ready to go

```shell
$ npm install
```

### Run BFF

The BFF can be launched with

```shell
$ npm run dev:bff
```

Afterwards, it will be reachable at <http://localhost:3000/>

### Run web app

The web app can be launched with

```shell
$ npm run dev:web
```

Afterwards, it will be reachable at <http://localhost:5173/>

## Implementation Notes

There are comments containing notes about specific sections of the source code. The more interesting ones are tagged with `NOTE: (jou)` and can be found by searching for it in the project.

Also, in the respective READMEs of both `places-bff` and `places-web` each contains a section with implementation notes of the subproject.

### Vendored Package

A copy of my personal ESLint, Prettier, and TypeScript config is included here. While it's not published, it's marked with `"license": "MIT"` in its `package.json` and is subject to the MIT license.
