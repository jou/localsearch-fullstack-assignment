module.exports = {
    ...require('./vendor/jou-style-guide/.prettierrc'),
    overrides: [
        {
            // Keep NPM generated files as two spaces
            files: ['package.json', 'package-lock.json'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
