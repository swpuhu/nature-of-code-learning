const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fs = require("fs");
const path = require("path");

const allPages = {};
const htmlPages = [];
function readDirectory(rootPath) {
    const fileList = fs.readdirSync(rootPath);
    for (const file of fileList) {
        const newPath = path.join(rootPath, file);
        if (file === "page" && fs.statSync(newPath).isDirectory()) {
            const pages = fs.readdirSync(newPath);
            for (const page of pages) {
                const pageName = page.substring(0, page.indexOf("."));
                allPages[pageName] = path.join(newPath, page);
                htmlPages.push(
                    new HtmlWebpackPlugin({
                        title: pageName,
                        filename: pageName + ".html",
                        template: "public/htmlTemplate.html",
                        chunks: [pageName],
                    })
                );
            }
        } else if (fs.statSync(newPath).isDirectory()) {
            readDirectory(newPath);
        }
    }
}

readDirectory(path.resolve(__dirname, "./src"));

module.exports = {
    mode: "development",
    entry: allPages,
    output: {
        filename: "[name]_bundle.js",
        path: __dirname + "/dist",
    },
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        port: 9002,
    },
    module: {
        rules: [
            // Place this *before* the `ts-loader`.
            {
                test: /\.ts?$/,
                use: [{ loader: "ts-loader" }],
            },
        ],
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            "@src": path.resolve(__dirname, "./src/"),
            "@lib": path.resolve(__dirname, "./lib"),
        },
    },

    plugins: [new CleanWebpackPlugin(), ...htmlPages],
};
