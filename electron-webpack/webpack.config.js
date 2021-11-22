const path = require('path')

module.exports = {
    target: 'electron-main',
    mode: 'development',
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    devtool: 'source-map',
    externals: {
        sqlite3: 'commonjs sqlite3',
        typeorm: 'commonjs typeorm'
    },
    node: {
        __filename: true,
        __dirname: true
    }
}