/* eslint-disable no-nested-ternary */
import React, { useContext, useState } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { Context as AppleMusicContext } from 'context/AppleMusic';
import SongView from 'components/SongView';
import TrackPlayerProvider from 'providers/trackPlayer';
import { navigate } from 'lib/utils/navigation';

const SongLists = () => {
  const { state, searchNext } = useContext(AppleMusicContext);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    if (state.songData.length >= 20 && !state.notNextSong) {
      setLoading(true);
      await searchNext({ nextUrl: state.nextSongUrl });
      setLoading(false);
    }
  };

  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  };

  const onClickSongView = (song) => {
    navigate('SelectedSong', { song });
  };

  return (
    <TrackPlayerProvider>
      <FlatList
        data={state.songData}
        keyExtractor={(song) => song.id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.6}
        ListFooterComponent={loading && <ActivityIndicator />}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => onClickSongView(item)}>
              <SongView song={item} />
            </TouchableOpacity>
          );
        }}
      />
    </TrackPlayerProvider>
  );
};

const PlaylistLists = () => {
  return null;
};

const DailyLists = () => {
  return null;
};

const DJLists = () => {
  return null;
};

const HashtagLists = ({ item }) => {
  const { hashtag, _id: id } = item;

  const onClickHashtag = () => {
    navigate('SelectedHashtag', { id, hashtag });
  };

  return (
    <TouchableOpacity onPress={onClickHashtag}>
      <Text>#{hashtag}</Text>
    </TouchableOpacity>
  );
};

export default function MoreLists({ title, data }) {
  return (
    <>
      {title === '곡' ? (
        <SongLists />
      ) : (
        <>
          {data.map((item) => {
            const { _id: id } = item;
            return (
              <View key={id}>
                {title === '플레이리스트' ? (
                  <PlaylistLists />
                ) : title === '데일리' ? (
                  <DailyLists />
                ) : title === '계정' ? (
                  <DJLists />
                ) : (
                  <HashtagLists item={item} />
                )}
              </View>
            );
          })}
        </>
      )}
    </>
  );
}