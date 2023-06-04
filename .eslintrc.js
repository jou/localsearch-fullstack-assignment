module.exports = {
    extends: [
        'eslint:recommended',
        './vendor/jou-style-guide/eslint-node',
        './vendor/jou-style-guide/eslint-typescript',
    ],
    overrides: [
        {
            files: [
                '**/*.test.[jt]s',
                '**/__test__/**/*.[jt]s',
                '**/test-utils/**/*.[jt]s',
            ],
            env: {
                jest: true,
            },
        },
    ],
    root: true,
};
