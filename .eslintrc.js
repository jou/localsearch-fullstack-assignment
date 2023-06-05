module.exports = {
    extends: ['eslint:recommended'],
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
