import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from 'components/Header';
import FS from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import style from 'constants/styles';
import UserView from 'components/UserView';

export default function Participant({ users }) {
  return (
    <View style={style.background}>
      <Header back title="플리에 참여한 사람들" titleStyle={styles.title} />
      <FlatList
        data={users}
        keyExtractor={(user) => user._id}
        renderItem={({ item }) => {
          return <UserView user={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FS(18),
    color: COLOR_1,
  },
});
