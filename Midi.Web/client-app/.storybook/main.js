const path = require("path");

module.exports = {
    stories: ["../src/**/*.stories.@(ts|tsx)"],
    addons: [
        {
            name: "@storybook/preset-create-react-app",
            options: {
                craOverrides: {
                    fileLoaderExcludes: ["less"],
                },
            },
        },
        "@storybook/addon-knobs",
        "@storybook/addon-links",
    ],
    webpackFinal: async (config) => {
        // add less loader to storybook webpack config
        config.module.rules.push({
            test: /\.less$/,
            loaders: [
                "style-loader",
                "css-loader",
                {
                    loader: "less-loader",
                },
            ],
            include: [path.resolve(__dirname, "../src")],
            exclude: [/node_modules/],
        });

        return config;
    },
};
