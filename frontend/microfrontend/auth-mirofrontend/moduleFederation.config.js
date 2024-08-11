const { dependencies } = require('./package.json');

module.exports = {
  name: 'mesto_auth',
  filename: 'remoteEntry.js',
  exposes: {
    './Register': './src/components/Register.js',
    './Login': './src/components/Login.js',
    './hooks/useLocalToken': '/src/hooks/useLocalToken.js'
  },
  remotes: {
    mesto_ui_kit: 'mesto_ui_kit@http://localhost:3001/remoteEntry.js',
  },
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
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: dependencies['react-router-dom'],
    },
  },
};
