import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function ResultOpt({ resultOpt, setResultOpt }) {
  const onPressOpt = (index) => {
    setResultOpt(index);
  };
  const optionLists = ['플레이리스트', '데일리', '릴레이플리'];
  return (
    <View style={[style.flexRow, style.spaceEven]}>
      {optionLists.map((item, index) => {
        return (
          <TouchableOpacity
            key={item}
            onPress={() => onPressOpt(index)}
            style={[resultOpt === index && styles.focused, styles.elementcontainer]}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  elementcontainer: {
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
