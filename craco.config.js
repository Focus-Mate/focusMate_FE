const { CracoAliasPlugin } = require('react-app-alias');
const CracoEnvPlugin = require('craco-plugin-env');

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
    {
      plugin: CracoEnvPlugin,
      options: {
        variables: {},
      },
    },
  ],
};
