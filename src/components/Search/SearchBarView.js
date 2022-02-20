/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { navigate } from 'lib/utils/navigation';
import Icon from 'widgets/Icon';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import { COLOR_3, MAIN_COLOR } from 'constants/colors';
import Text from 'components/Text';

export default function SearchBarView() {
  const onClickBar = () => {
    navigate('SearchDetail');
  };

  return (
    <View style={[style.alignCenter, styles.container]}>
      <TouchableOpacity style={[style.flexRow, styles.bar]} onPress={onClickBar}>
        <Icon source={require('public/icons/search-glass.png')} style={styles.icon} />
        <Text style={styles.searchInput}>검색어를 입력하세요</Text>
      </TouchableOpacity>
      <Text style={styles.description}>계정, 키워드, 노래 및 아티스트를 </Text>
      <Text style={[styles.description, styles.margin]}>검색해보세요</Text>
      <Text style={styles.exampleText}>ex. ‘신나는', ‘힐링', ‘새벽'</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24 * SCALE_HEIGHT,
    marginBottom: 26 * SCALE_HEIGHT,
  },
  bar: {
    width: 343 * SCALE_WIDTH,
    height: 40 * SCALE_HEIGHT,
    backgroundColor: '#eeeeee',
    borderRadius: 6 * SCALE_HEIGHT,
    marginBottom: 26 * SCALE_HEIGHT,
  },
  icon: {
    width: 16 * SCALE_WIDTH,
    height: 16 * SCALE_WIDTH,
    marginLeft: 16 * SCALE_WIDTH,
    marginRight: 12 * SCALE_WIDTH,
  },
  searchInput: {
    color: COLOR_3,
    fontSize: FS(14),
  },
  description: {
    fontSize: FS(14),
    color: '#818181',
    fontWeight: '400',
  },
  margin: {
    marginTop: 8 * SCALE_HEIGHT,
  },
  exampleText: {
    fontSize: FS(14),
    marginTop: 13 * SCALE_HEIGHT,
    color: MAIN_COLOR,
  },
});
