import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { tmpWidth } from 'components/FontNormalize';
import LoadingIndicator from 'components/LoadingIndicator';
import { push } from 'lib/utils/navigation';
import { useRefresh } from 'providers/refresh';

const LikePlaylists = () => {
  const { state, getLikePlaylists } = useContext(UserContext);
  const { getPlaylist } = useContext(PlaylistContext);
  const { refreshing, onRefresh, setRefresh } = useRefresh();

  const onClickPlaylist = async (id, postUserId) => {
    await getPlaylist({ id, postUserId });
    push('SelectedPlaylist', { id, postUser: postUserId });
  };

  useEffect(() => {
    setRefresh(getLikePlaylists);
  }, []);

  return (
    <View style={styles.container}>
      {state.likePlaylists == null ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          numColumns={2}
          onRefresh={onRefresh}
          refreshing={refreshing}
          data={state.likePlaylists}
          keyExtractor={(playlist) => playlist._id}
          contentContainerStyle={styles.padding}
          renderItem={({ item }) => {
            const { image } = item;
            return (
              <TouchableOpacity onPress={() => onClickPlaylist(item._id, item.postUserId)}>
                <Image style={styles.thumbnail} source={{ url: image }} />
                <View style={styles.titleArea}>
                  <Text numberOfLines={2} style={styles.title}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8 * tmpWidth,
    paddingLeft: 18 * tmpWidth,
    flex: 1,
  },
  thumbnail: {
    width: 160 * tmpWidth,
    height: 160 * tmpWidth,
    borderRadius: 4 * tmpWidth,
    marginBottom: 8 * tmpWidth,
    marginRight: 12 * tmpWidth,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 8 * tmpWidth,
  },
  titleArea: {
    width: 161 * tmpWidth,
  },
  title: {
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
    marginBottom: 16 * tmpWidth,
  },
  padding: {
    paddingBottom: 18 * tmpWidth,
  },
});

export default LikePlaylists;
