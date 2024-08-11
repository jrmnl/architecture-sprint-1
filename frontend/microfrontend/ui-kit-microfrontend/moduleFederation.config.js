const { dependencies } = require('./package.json');

module.exports = {
  name: 'mesto_ui_kit',
  filename: 'remoteEntry.js',
  exposes: {
    './ImagePopup': './src/components/ImagePopup.js',
    './PopupWithForm': './src/components/PopupWithForm.js',
    './InfoTooltip': './src/components/InfoTooltip.js',
    './styles': './src/index.css'
  },
  remotes: {},
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      import: 'react',
      shareScope: 'default',
      requiredVersion: dependencies.react,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    }
  },
};
