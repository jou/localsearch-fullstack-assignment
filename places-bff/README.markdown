# places-bff

A simple express application serving up data for the web UI.

## Implementation notes

This section collects notes and assumptions made for the BFF.

### Bootstrapping process

-   Bootstrap through [express-generator][] with `--no-view`, given this will only need to return JSON.
-   Set up ESLint & Prettier with a copy of my personal settings in `vendor/jou-style-guide` & reformatted project.
-   Set up TypeScript using settings in `vendor/jou-style-guide` and tweak scripts in `package.json` accordingly.
-   Convert code to TypeScript

[express-generator]: https://expressjs.com/en/starter/generator.html
