const { dependencies } = require('./package.json');

module.exports = {
  name: 'mesto_root',
  filename: 'remoteEntry.js',
  exposes: { },
  remotes: {
    mesto_ui_kit: 'mesto_ui_kit@http://localhost:3001/remoteEntry.js',
    mesto_auth: 'mesto_auth@http://localhost:3002/remoteEntry.js',
    mesto_places: 'mesto_places@http://localhost:3003/remoteEntry.js',
    mesto_profile: 'mesto_profile@http://localhost:3004/remoteEntry.js',
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
