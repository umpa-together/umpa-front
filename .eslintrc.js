module.exports = {
  root: true,
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'no-use-before-define': 'off',
    'prettier/prettier': 'error',
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/named': 0,
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
