/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PostingCard from 'components/PostingCard';
import UserView from 'components/UserView';
import { useTrackPlayer } from 'providers/trackPlayer';
import SearchSongView from 'components/SongView/SearchSongView';
import Icon from 'widgets/Icon';
import FS, { SCALE_WIDTH } from 'lib/utils/normalize';
import style from 'constants/styles';
import { COLOR_1 } from 'constants/colors';
import HashtagView from 'components/Search/HashtagView';
import { Provider as AddedProvider } from 'context/Added';
import DailyView from 'components/DailyView';
import HarmfulModal from 'components/Modal/HarmfulModal';

const Header = ({ title, jumpTo, routeKey }) => {
  const onClickMore = () => {
    jumpTo(routeKey);
  };

  return (
    <View style={[style.flexRow, styles.container]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onClickMore}>
        <Icon source={require('public/icons/search-more.png')} style={styles.more} />
      </TouchableOpacity>
    </View>
  );
};

const PlayAction = ({ song }) => {
  const { onClickSong, isPlayingId } = useTrackPlayer();
  return (
    <TouchableOpacity onPress={() => onClickSong(song)}>
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

export default function ResultSection({ title, data, jumpTo, routeKey }) {
  return (
    <View>
      <Header title={title} data={data} jumpTo={jumpTo} routeKey={routeKey} />
      <AddedProvider>
        {data.slice(0, 3).map((item) => {
          const id = item._id !== undefined ? item._id : item.song.id;
          return (
            <View key={id}>
              {title === '곡' ? (
                <SearchSongView info={item} />
              ) : title === '플레이리스트' ? (
                <PostingCard
                  item={item}
                  opt="playlist"
                  round
                  action={<PlayAction song={item.songs[0]} />}
                />
              ) : title === '데일리' ? (
                <DailyView info={item} actions />
              ) : title === '계정' ? (
                <UserView user={item} />
              ) : (
                <HashtagView info={item} />
              )}
            </View>
          );
        })}
      </AddedProvider>
      <HarmfulModal />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: COLOR_1,
    fontSize: FS(18),
    fontWeight: 'bold',
    marginLeft: 16 * SCALE_WIDTH,
  },
  more: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    left: -5 * SCALE_WIDTH,
  },
  container: {
    marginBottom: 12 * SCALE_WIDTH,
  },
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
  },
});
