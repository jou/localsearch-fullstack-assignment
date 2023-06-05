# places-web

Web appplication for the localsearch home assignment.

## Running

### Install dependencies

Install dependencies first if not done already

```shell
$ npm install
```

### Run dev server

Dev server with hot reload can be started with

```shell
$ npm run dev
```

By default, the dev server listens on <http://localhost:5173>.

### Run tests

To run the test suite, run them through `npm`

```shell
$ npm run test
```

Tests can also be run in watch mode which re-runs the test suite when there's a change:

```shell
$ npm run test:watch
```

## Implementation notes

Stuff used:

-   [Vue.js][] as view framework
-   [vue-router][] for routing
-   [Pinia][] for state management
-   [Vite][] for building
-   [Tailwind CSS][tailwindcss] for styling
-   [vitest][] for unit testing
-   [Vue Test Utils][] for component testing

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

### Bootstrapping process

Mostly artisanal hand assembled from different bits and pieces:

-   Create new [Vite][] app as per [its guide][vite-guide] with `vue-ts` as template & reformatted output with prettier
-   Add [Tailwind CSS][tailwindcss] as per its [instructions for Vite][tailwindcss-vite].
-   Add [vue-router][] per its [instructions][vue-router-instructions].
-   Set up [vitest][] with Vue support mostly follwing [this blog post][vitest-logrocket-blog].

[Vue.js]: https://vuejs.org
[Pinia]: https://pinia.vuejs.org
[Vite]: https://vitejs.dev
[vite-guide]: https://vitejs.dev/guide/
[tailwindcss]: https://tailwindcss.com
[tailwindcss-vite]: https://tailwindcss.com/docs/guides/vite
[vue-router]: https://router.vuejs.org
[vue-router-instructions]: https://router.vuejs.org/guide/#javascript
[vitest]: http://vitest.dev
[vitest-logrocket-blog]: https://blog.logrocket.com/guide-vitest-automated-testing-vue-components/
[Vue Test Utils]: https://test-utils.vuejs.org/
