module.exports = {
    extends: [
        'plugin:vue/vue3-recommended',
        '../vendor/jou-style-guide/eslint-browser',
        '../vendor/jou-style-guide/eslint-typescript'
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    }
};
