/* eslint-disable no-nested-ternary */
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import FS from 'lib/utils/normalize';
import { Context as UserContext } from 'context/User';
import Header from 'components/Header';
import style from 'constants/styles';
import { COLOR_1 } from 'constants/colors';
import UserList from 'components/Account/UserList';
import EmptyUser from 'components/Account/EmptyUser';
import { Provider as MainContentsProvider } from 'context/MainContents';
import LoadingIndicator from 'components/LoadingIndicator';
import FollowSearch from 'components/Account/FollowSearch';

export default function Follow({ opt, my, id }) {
  const {
    state: { follow },
    getFollow,
  } = useContext(UserContext);
  const title = opt === 'follower' ? '팔로워' : '팔로잉';
  const [users, setUsers] = useState(null);
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    getFollow({ id, opt });
  }, [id]);

  useEffect(() => {
    setUsers(follow);
  }, [follow]);

  useEffect(() => {
    if (users) {
      setUsers(follow.filter((user) => user.name.includes(keyword)));
    }
  }, [keyword]);

  return (
    <View style={style.background}>
      <Header back title={title} titleStyle={styles.headerTitle} />
      <FollowSearch text={keyword} setText={setKeyword} opt={title} />
      {users ? (
        users.length > 0 ? (
          <UserList users={users} />
        ) : (
          follow.length === 0 && (
            <MainContentsProvider>
              <EmptyUser opt={opt} my={my} />
            </MainContentsProvider>
          )
        )
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: FS(18),
    color: COLOR_1,
  },
});
