# places-web

Web appplication for the localsearch home assignment.

## Implementation notes

This section collects notes and assumptions made for the web app.

### Bootstrapping process

-   Create new [Vite][] app as per [its guide][vite-guide] with `vue-ts` as template & reformatted output with prettier
-   Add [Tailwind CSS][tailwindcss] as per its [instructions for Vite][tailwindcss-vite].
-   Add [vue-router][] per its [instructions][vue-router-instructions].
-   Set up [vitest][] with Vue support mostly follwing [this blog post][vitest-logrocket-blog].

[Vite]: https://vitejs.dev
[vite-guide]: https://vitejs.dev/guide/
[tailwindcss]: https://tailwindcss.com
[tailwindcss-vite]: https://tailwindcss.com/docs/guides/vite
[vue-router]: https://router.vuejs.org
[vue-router-instructions]: https://router.vuejs.org/guide/#javascript
[vitest]: http://vitest.dev
[vitest-logrocket-blog]: https://blog.logrocket.com/guide-vitest-automated-testing-vue-components/
