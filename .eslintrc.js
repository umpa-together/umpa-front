module.exports = {
  root: true,
  extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended'],
  rules: {
    'func-names': 0,
    'react/function-component-definition': 0,
    'no-use-before-define': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'no-undef': 0,
    'react/jsx-no-constructed-context-values': 0,
    'import/no-import-module-exports': 0,
    'global-require': 0,
    'no-param-reassign': 0,
  },
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      'babel-module': {},
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
