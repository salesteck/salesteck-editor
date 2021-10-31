
'use strict';

const path = require('path');
const webpack = require( 'webpack' );
const { bundler, styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = false;
// const CKFinder = require( './assets/plugin/ckfinder/ckfinder' );

// const { styles } = require( './node_modules/@ckeditor/ckeditor5-dev-utils' );
module.exports = {
    // entry : [
    //     './assets/plugin/ckfinder/ckfinder.js',
    //     './assets/js/script.js'
    // ],
    // output : {
    //     filename : './public/js/bundle.js'
    // },
    externals: {
        //define jquery as external file
        jquery: 'jQuery',
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    },
    entry : {
        script : './content-editor.js'
        // script : './download/src/ckeditor.js'
    },
    output : {

        // The name under which the editor will be exported.
        library: 'SalesteckEditor',

        path: path.resolve( __dirname, 'build' ),
        filename:  './js/salesteck-editor.bundle.js',
        libraryTarget: 'umd',
        libraryExport: 'default'

    },
    optimization: {
        //remove unused function
        usedExports: true,
        minimizer: [
            new TerserWebpackPlugin( {
                sourceMap : devMode,
                terserOptions: {
                    //
                    // format: {
                    //     comments: devMode,
                    // },
                    output: {
                        // Preserve CKEditor 5 license comments.
                        // comments: /^!/
                        comments: devMode
                    }
                },
                extractComments: devMode
            } )
        ]
    },
    plugins: [
        new CKEditorWebpackPlugin( {
            // UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
            // When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.js).
            language: 'fr',
            additionalLanguages: ['en', 'de', 'nl'],
            buildAllTranslationsToSeparateFiles : true
        } ),
        // new webpack.BannerPlugin( {
        //     banner: bundler.getLicenseBanner(),
        //     raw: true
        // } ),
        new MiniCssExtractPlugin({
            filename: './css/salesteck-editor.bundle.css'
        }),
    ],
    module: {
        rules: [
            //loading svg file
            {
                test: /\.svg$/,
                use: 'svg-inline-loader'
            },
            //loading fonts file
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            //loading css file
            {
                // test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: styles.getPostCssConfig( {
                                themeImporter: {
                                    themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                                },
                                minify: !devMode
                            } ),
                            sourceMap : devMode,
                        }
                    },
                ],
            }
        ]
    },
    // mode: 'production',
    mode: devMode ? 'development' : 'production',

    // Useful for debugging.
    devtool: devMode ? 'source-map' : 'hidden-source-map',
    // devtool: 'hidden-source-map',

    // By default webpack logs warnings if the bundle is bigger than 200kb.
    performance: { hints: false }
};
