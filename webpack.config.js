var path = require('path')

module.exports={
    entry: {
        'harryblog': './index.js',
    },
    output:{
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/static/'
    },
    devServer: {
        historyApiFallback: true
    },
    module:{
        loaders:[
            {
                test:/\.js?$/,
                loader:'babel',
                exclude:/node_modules/,
                query:{
                    presets:['react','es2015','stage-0']
                }
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader',
            },
            {
                test:/\.scss$/,
                exclude: /node_modules/,
                loader:'style-loader!css-loader!sass-loader',
            },{
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    }
}