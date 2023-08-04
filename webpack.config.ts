import path from 'path';
// Webpack
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Configuration } from 'webpack';
// Loading HTML
import HtmlWebpackPlugin from 'html-webpack-plugin';
// Loading CSS and minimizing
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
// Linting
import ESLintPlugin from 'eslint-webpack-plugin';
// TypeScript Checking
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// React Refresh Plugin
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

// Determine if environment is development or production
const isEnvProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';
const isEnvDevelopment = process.argv[process.argv.indexOf('--mode') + 1] === 'development';

process.env.NODE_ENV = process.env.BABEL_ENV = process.argv[process.argv.indexOf('--mode') + 1];

const devServer: DevServerConfiguration = {
  static: {
    directory: path.join(__dirname, 'dist'),
  },
  port: 8080,
  hot:true,
  historyApiFallback: true,
}

const config: Configuration = {
  mode: isEnvProduction ? 'production' : 'development',
  devServer,
  devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx|css)$/,
        enforce: 'pre',
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        use: 'source-map-loader',
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10000,
              },
            },
          },
          {
            test: /\.s[ac]|css$/,
            use: [
              isEnvProduction ?
              MiniCssExtractPlugin.loader :
              { loader: 'style-loader' },
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'resolve-url-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } },
            ],
            sideEffects: true,
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                presets: [
                  [
                    require.resolve('babel-preset-react-app'),
                    {
                      runtime: 'automatic',
                    },
                  ],
                ],
                plugins: [
                  isEnvDevelopment &&
                  require.resolve('react-refresh/babel')
                ].filter(Boolean),
                cacheDirectory: true,
                cacheCompression: false,
                compact: isEnvProduction,
              },
            },
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            type: 'asset/resource',
          },
        ]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: './src/index.html',
          filename: './index.html',
          favicon: './src/title-bar-icon.png',
        },
        isEnvProduction
          ? {
              minify: {
                caseSensitive: true,
                collapseWhitespace: true,
                keepClosingSlash: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
              },
            }
        : undefined
      )
    ),
    new ESLintPlugin({
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      failOnError: isEnvProduction,
      context: '.',
      baseConfig: {
        extends: [require.resolve('./eslint.config.js')],
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      async: isEnvDevelopment,
      typescript: {
        build: true,
        context: '.',
        configOverwrite: {
          compilerOptions: {
            sourceMap: isEnvProduction
              ? true
              : isEnvDevelopment,
          },
        },
        diagnosticOptions: {
          syntactic: true,
        },
        mode: 'write-references',
      },
      issue: {
        include: [
          { file: './src/**/*.{ts,tsx}' },
        ],
        exclude: [
          { file: '**/src/**/__tests__/**' },
          { file: '**/src/**/?(*.){spec|test}.*' },
          { file: '**/src/setupProxy.*' },
          { file: '**/src/setupTests.*' },
        ],
      },
      // logger: {
      //   infrastructure: 'silent',
      // },
    }),
    isEnvDevelopment && new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  watchOptions : {
    ignored: /node_modules/,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    fallback: {
      "fs": false,
      "path": false,
    },
    alias: {
      '@tensorflow/tfjs$':
          path.resolve(__dirname, './src/assets/tfjs-model/custom_tfjs.js'),
      '@tensorflow/tfjs-core$': path.resolve(
          __dirname, './src/assets/tfjs-model/custom_tfjs_core.js'),
    }
  },
};

export default config;
