const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * @author cooper
 * @description 根据入参判定是否启用热重载
 * @param {Boolean} | isOn
 * @returns {Array}
 */
module.exports = (isOn) => {
  const baseLoader = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../',
        hmr: isOn, //热重载相关
        reloadAll: isOn, //热重载相关
      },
    },
    'css-loader',
  ];

  return [
    {
      test: /\.styl$/,
      use: [...baseLoader, 'stylus-loader'],
    },
    {
      test: /\.(sa|sc)ss$/,
      use: [
        ...baseLoader,
        {
          loader: 'postcss-loader', // Run postcss actions
          options: {
            plugins: function () {
              // postcss plugins, can be exported to postcss.config.js
              return [require('autoprefixer')];
            },
          },
        },
        'sass-loader',
      ],
    },
    {
      test: /\.css$/,
      use: baseLoader,
    },
  ];
};
