import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function ResultOpt({ resultOpt, setResultOpt }) {
  const onPressOpt = (index) => {
    setResultOpt(index);
  };
  const optionLists = [
    {
      title: '플레이리스트',
      value: 'playlist',
    },
    {
      title: '데일리',
      value: 'daily',
    },
    {
      title: '릴레이플리',
      value: 'relayplaylist',
    },
  ];
  return (
    <View style={[style.flexRow, style.spaceEven]}>
      {optionLists.map((item) => {
        return (
          <TouchableOpacity
            key={item.title}
            onPress={() => onPressOpt(item.value)}
            style={[resultOpt === item.value && styles.focused, styles.elementcontainer]}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  elementContainer: {
    width: (375 * SCALE_WIDTH) / 3,
    height: 20 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
    alignItems: 'center',
  },
  focused: {
    borderBottomWidth: 3,
    borderBottomColor: '#AAA',
  },
});
