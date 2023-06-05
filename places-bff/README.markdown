# places-bff

A simple express application serving up data for the web UI.

## Running

### Install dependencies

Install dependencies first if not done already

```shell
$ npm install
```

### Run service

Run service in development mode

```shell
$ npm run dev
```

By default, the service listens on <http://localhost:3000>. The port it listens to can be changed through the `PORT` environment variable, e.g.

```shell
$ PORT=9001 npm run dev
```

will make the service listen on <http://localhost:9001>.

### Run tests

To run the test suite, run them through `npm`

```shell
$ npm run test
```

## Notes

### Project structure

The `src` directory contains all the interesting bits. This is the way it's structured:

```
<root>/src
  - components/ <- Self contained components that don't depend on external state
  - hooks/ <- composition API `use...()` hooks
  - models/ <- type definitions for entities
  - pages/ <- Page level component that are aware of the outside world
  - services/ <- Responsible to talk to the API and returning domain models
  - stores/ <- pinia stores
  - App.vue <- Root component for the entire SPA
  - main.ts <- main entry point
  - router.ts <- routing
  - style.css <- global styles
```

## Implementation notes

This section collects notes and assumptions made for the BFF.

### Project structure

The `src` directory contains all the interesting bits. This is the way it's structured:

```
<root>/src
  - bin/ <- sources for executables
  - models/ <- type definitions for entities
  - routes/ <- express routers
  - services/ <- Responsible to talk to the API and converting to domain models
  - test-utils/ <- utilities for testing
  - app.ts <- main express app
```

### Bootstrapping process

Mostly artisanal hand assembled from different bits and pieces:

-   Bootstrap through [express-generator][] with `--no-view`, given this will only need to return JSON.
-   Set up ESLint & Prettier with a copy of my personal settings in `vendor/jou-style-guide` & reformatted project.
-   Set up TypeScript using settings in `vendor/jou-style-guide`, move code around, and tweak scripts in `package.json` accordingly.
-   Convert code to TypeScript.
-   Set up Jest with [`ts-jest`' setup instructions][ts-jest].

[express-generator]: https://expressjs.com/en/starter/generator.html
[ts-jest]: https://kulshekhar.github.io/ts-jest/docs/getting-started/installation
