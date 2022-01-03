import React from 'react';
import { View } from 'react-native';
import style from 'constants/styles';
import Header from 'components/Header';
import MoreLists from 'components/Search/MoreLists';

export default function ResultMore({ keyword, title, data }) {
  const headerTitle = `${(title === '해시태그' ? '#' : '') + keyword} 검색 결과`;
  return (
    <View style={style.background}>
      <Header title={headerTitle} back />
      <MoreLists title={title} data={data} />
    </View>
  );
}
