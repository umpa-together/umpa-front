import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SCALE_HEIGHT } from 'lib/utils/normalize';
import UserView from 'components/UserView';

export default function UserList({ users }) {
  return (
    <View style={styles.container}>
      {users &&
        users.map((item) => {
          // eslint-disable-next-line no-underscore-dangle
          return <UserView key={item._id} user={item} />;
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20 * SCALE_HEIGHT,
  },
});
