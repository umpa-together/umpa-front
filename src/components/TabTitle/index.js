import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from 'components/Text';

export default function TabTitle({ title, titleStyle, actions = [] }) {
  return (
    <View>
      <Text style={titleStyle}>{title}</Text>
      <View style={styles.actions}>
        {actions.map((action) => {
          return <View key={Math.random()}>{action}</View>;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    width: '100%',
  },
  landings: {
    position: 'absolute',
    left: 15,
    zIndex: 99,
    flexDirection: 'row',
  },
  actions: {
    position: 'absolute',
    right: 15,
    zIndex: 99,
    flexDirection: 'row',
  },
});
