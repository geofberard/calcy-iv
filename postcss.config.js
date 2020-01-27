const cssnanoConfig = {
    preset: ['default', {discardComments: {removeAll: true}}]
};

module.exports = ({file, options}) => {
    return {
        parser: options.mode === "production" ? 'postcss-safe-parser' : undefined,
        plugins: {
            cssnano: options.mode === "production" ? cssnanoConfig : false,
            autoprefixer: true
        },
    };
};