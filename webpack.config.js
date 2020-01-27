var webpack = require('webpack');

module.exports = {
    entry: [__dirname + "/app/main.tsx"],
    output: {
        path: __dirname + '/public/',
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        contentBase: __dirname + '/public/',
        compress: true,
        port: 8091
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "awesome-typescript-loader"
                },
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "resolve-url-loader",
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.css/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader"
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};
