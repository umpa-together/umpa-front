module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@public': './src/public',
          '@components': './src/components',
          '@context': './src/context',
          '@providers': './src/providers',
          '@screens': './src/screens',
          '@lib': './src/lib',
          '@widgets': './src/widgets',
          '@constants': './src/constants',
        },
      },
    ],
    'react-native-reanimated/plugin'
  ],
};
