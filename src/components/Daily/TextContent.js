import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { tmpWidth } from 'components/FontNormalize';

const TextContent = ({ daily }) => {
  const onClickUrl = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Hyperlink linkStyle={styles.link} onPress={(url) => onClickUrl(url)}>
        <Text style={{ lineHeight: 26 * tmpWidth, fontSize: 14 * tmpWidth }}>
          {daily.textcontent}
        </Text>
      </Hyperlink>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18 * tmpWidth,
    paddingRight: 18 * tmpWidth,
    maxHeight: 182 * tmpWidth,
  },
  link: {
    fontSize: 14 * tmpWidth,
    lineHeight: 20 * tmpWidth,
    fontWeight: '400',
    color: '#2980b9',
  },
});

export default TextContent;
