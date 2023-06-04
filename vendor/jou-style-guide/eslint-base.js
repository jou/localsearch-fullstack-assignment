module.exports = {
    "extends": [
        "eslint:recommended",
        "prettier"
    ],
    "rules": {
        "block-scoped-var": "error",
        "eqeqeq": "error",
        "no-var": "error",
        "prefer-const": "error",
        "eol-last": "error",
        "prefer-arrow-callback": "error",
        "no-trailing-spaces": "error",
        "quotes": ["warn", "single", {"avoidEscape": true}],
        "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    },
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
    }
}

