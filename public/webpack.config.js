module.exports = {
    entry: './index.js',
    output: {
        path: './bundle',
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map'
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [
            {test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel'}
        ]
    }
};