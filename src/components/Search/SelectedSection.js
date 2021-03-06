/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import PostingCard from 'components/PostingCard';
import { useTrackPlayer } from 'providers/trackPlayer';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import DailyView from 'components/DailyView';
import EmptyData from 'components/EmptyData';
import NavigateButton from 'components/EmptyData/NavigateButton';
import { navigate } from 'lib/utils/navigation';
import UserView from 'components/UserView';

const PlayAction = ({ song }) => {
  const { onClickSong, isPlayingId } = useTrackPlayer();
  const onClickPlay = () => {
    onClickSong(song);
  };
  return (
    <TouchableOpacity onPress={onClickPlay}>
      <Icon
        source={
          song.id === isPlayingId
            ? require('public/icons/stop.png')
            : require('public/icons/play.png')
        }
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export const Playlist = ({ hashtag }) => {
  const {
    state: {
      selected: { playlist },
    },
  } = useContext(SearchContext);
  const count = playlist.length;
  const textList = ['아직 생성된 플레이리스트가 없습니다'];
  const onPress = () => {
    navigate('PlaylistCreate');
  };
  return (
    <View style={styles.playlistContainer}>
      {count > 0 ? (
        playlist.map((item) => {
          const { _id: id, songs } = item;
          return (
            <View key={id}>
              <PostingCard
                item={item}
                opt="playlist"
                round
                key={id}
                action={<PlayAction song={songs[0]} />}
              />
            </View>
          );
        })
      ) : (
        <EmptyData
          action={!hashtag && <NavigateButton onPress={onPress} text="플레이리스트 만들기" />}
          customContainer={styles.emptyContainer}
          textList={textList}
        />
      )}
    </View>
  );
};

export const Daily = ({ actions, song, hashtag }) => {
  const {
    state: {
      selected: { daily },
    },
  } = useContext(SearchContext);
  const count = daily.length;

  const textList = ['아직 생성된 데일리가 없습니다'];
  const data = {
    song,
    information: { content: '', hashtags: [] },
    images: [],
  };
  const onPress = () => {
    navigate('DailyCreate', { data });
  };
  return (
    <View style={styles.dailyContainer}>
      {count > 0 ? (
        daily.map((item) => {
          const { _id: id } = item;
          return <DailyView info={item} key={id} actions={actions} isSelected />;
        })
      ) : (
        <EmptyData
          action={!hashtag && <NavigateButton onPress={onPress} text="이 곡으로 데일리 만들기" />}
          customContainer={styles.emptyContainer}
          textList={textList}
        />
      )}
    </View>
  );
};

export const DJ = () => {
  const {
    state: {
      selected: { dj },
    },
  } = useContext(SearchContext);
  const count = dj.length;
  const textList = ['이 곡을 대표곡으로 하는 계정이 아직 없습니다.'];

  return (
    <View style={styles.djContainer}>
      {count > 0 ? (
        dj.map((item) => {
          const { _id: id } = item;
          return (
            <View key={id}>
              <UserView user={item} />
            </View>
          );
        })
      ) : (
        <EmptyData customContainer={styles.emptyContainer} textList={textList} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  playlistContainer: {
    marginTop: 16 * SCALE_HEIGHT,
  },
  dailyContainer: {
    marginTop: 18 * SCALE_HEIGHT,
  },
  djContainer: {
    marginTop: 15 * SCALE_HEIGHT,
  },
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
  },
  emptyContainer: {
    paddingTop: 150 * SCALE_HEIGHT,
  },
});
