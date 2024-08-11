const { dependencies } = require('./package.json');

module.exports = {
  name: 'mesto_profile',
  filename: 'remoteEntry.js',
  exposes: {
    './Profile': './src/components/Profile.js',
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
  },
};
