/* eslint-disable no-undef, no-console , import/no-extraneous-dependencies */

import colors from 'colors'; // eslint-disable-line no-unused-vars
import express from 'express';
import fs from 'fs';
import open from 'open';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer/lib/BundleAnalyzerPlugin';
import webpackConfig from '../webpack.config';


const port = 60253;
const host = 'localhost';
const app = express();
const compiler = webpack(webpackConfig);
compiler.apply(new BundleAnalyzerPlugin({analyzerPort: port + 1, openAnalyzer: false}));
const middleware = webpackDevMiddleware(compiler, {
    contentBase: `http://${host}:${port}`,
    quiet: false,
    noInfo: false,
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
        assets: true,
        colors: true,
        version: false,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false
    }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

const content = fs.readFileSync(path.join(__dirname, '../src/index.html'), 'utf-8');
const newValue = content.replace(/-->/g, '').replace(/<!--/g, '');

app.get('*', (req, res) => {
    res.send(newValue);
});

app.listen(port, error => {
    if (error) {
        console.log(error.red);
    } else {
        open(`http://${host}:${port}`);
    }
});
