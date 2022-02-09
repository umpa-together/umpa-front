import React, { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SCALE_HEIGHT } from 'lib/utils/normalize';
import UserView from 'components/UserView';

export default function UserList({ users }) {
  const keyExtractor = useCallback((_) => _._id, []);
  const renderItem = useCallback(({ item }) => <UserView user={item} />, [users]);

  return (
    <FlatList
      data={users}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20 * SCALE_HEIGHT,
  },
});
