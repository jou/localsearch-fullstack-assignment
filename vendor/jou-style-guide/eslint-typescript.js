module.exports = {
    "overrides": [
        {
            "files": ["**/*.ts", "**/*.tsx"],
            "parser": "@typescript-eslint/parser",
            "extends": [
                "plugin:@typescript-eslint/recommended"
            ],
            "rules": {
                "@typescript-eslint/no-non-null-assertion": "off",
                "@typescript-eslint/no-use-before-define": "off",
                "@typescript-eslint/no-warning-comments": "off",
                "@typescript-eslint/no-empty-function": "off",
                "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
                "@typescript-eslint/explicit-function-return-type": "off",
                "@typescript-eslint/camelcase": "off",
                "node/no-missing-import": "off",
                "node/no-empty-function": "off",
                "node/no-unsupported-features/es-syntax": "off",
                "node/no-missing-require": "off",
                "node/shebang": "off",
                "no-dupe-class-members": "off",
                "require-atomic-updates": "off"
            }
        }
    ]
}
