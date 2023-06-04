# @jou's web coding style

Collection of JS tooling configuration that hits my tastes.

## Installation

If not already done, set up authentication for NPM by adding that snippet into `~/.npmrc`:

```
@npm-jou:registry=https://gitlab.home.orly.ch/api/v4/packages/npm/
//gitlab.home.orly.ch/api/v4/packages/npm/:_authToken=<token>
//gitlab.home.orly.ch/api/v4/projects/:_authToken=<token>
```

Where `<token>` is a personal access token with `api_read` scope.

Once authentication is taken care of, add the package by running

```bash
# NPM
$ npm install @npm-jou/web-style-guide --dev
# Yarn
$ yarn add --dev @npm-jou/web-style-guide
```

## ESLint

ESLint rules can be set up by extending the appropriate base ESLint config.

### Browser

For browser based environment, use `eslint-browser`:

```js
module.exports = {
    extends: [
        // ...
        './node_modules/@npm-jou/web-style-guide/eslint-browser',
    ],
};
```

### Node.js

For Node.js, use `eslint-node`:

```js
module.exports = {
    extends: [
        // ...
        './node_modules/@npm-jou/web-style-guide/eslint-node',
    ],
};
```

## TypeScript

There's a base `tsconfig.json` that can be extended from for defaults:

```json
{
  "extends": "@npm-jou/web-style-guide/tsconfig-jou.json",
}
```

### ESLint

For TypeScript ESLint support, `typescript` and `@typescript-eslint/parser` needs to be installed:

```bash
# NPM
$ npm install typescript @typescript-eslint/parser --dev
# Yarn
$ yarn add --dev typescript @typescript-eslint/parser
```

Once that has been taken care of, `eslint-typescript` can be pulled in through adding it to `extends` in `.eslintrc.js`:

```js
module.exports = {
    extends: [
        // ...
        './node_modules/@npm-jou/web-style-guide/eslint-typescript',
    ]
}
```

## Prettier

Pull in prettier config by extending the provided `.prettierrc.js`:

```js
module.exports = {
  ...require('@npm-jou/web-style-guide/.prettierrc'),
  // ... overrides
}
```
