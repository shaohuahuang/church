module.exports = {
    entry: './public/index.js',
    output: {
        path: __dirname + '/bundle',
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    }
};