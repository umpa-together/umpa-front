import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FS from 'lib/utils/normalize';
import { Context as UserContext } from 'context/User';
import Header from 'components/Header';
import style from 'constants/styles';
import { COLOR_1 } from 'constants/colors';
import UserList from 'components/Account/UserList';

export default function Follow({ opt }) {
  const { state } = useContext(UserContext);
  const title = opt === 'follower' ? '팔로워' : '팔로잉';
  const [users] = useState(state.follow);
  return (
    <View style={style.background}>
      <Header back title={title} titleStyle={styles.headerTitle} />
      <ScrollView>
        <UserList users={users} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: FS(18),
    color: COLOR_1,
  },
});
