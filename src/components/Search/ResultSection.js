/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import SongView from 'components/SongView';
import { navigate } from 'lib/utils/navigation';
import PostingCard from 'components/PostingCard';
import UserView from 'components/UserView';
import { useTrackPlayer } from 'providers/trackPlayer';

const Header = ({ title, jumpTo, routeKey }) => {
  const onClickMore = () => {
    jumpTo(routeKey);
  };

  return (
    <View>
      <Text>{title}</Text>
      <Button title="더보기" onPress={onClickMore} />
    </View>
  );
};

const PlayAction = ({ song }) => {
  const { onClickSong, isPlayingId } = useTrackPlayer();
  return (
    <TouchableOpacity onPress={() => onClickSong(song)}>
      <Text>{isPlayingId !== song.id ? '재생' : '정지'}</Text>
    </TouchableOpacity>
  );
};

export default function ResultSection({ title, data, jumpTo, routeKey }) {
  const onClickItem = (item) => {
    if (title === '곡') {
      navigate('SelectedSong', { song: item });
    }
  };

  return (
    <>
      <Header title={title} data={data} jumpTo={jumpTo} routeKey={routeKey} />
      {data.slice(0, 3).map((item) => {
        const id = item.id ? item.id : item._id;
        return (
          <TouchableOpacity key={id} onPress={() => onClickItem(item)}>
            {title === '곡' ? (
              <SongView song={item} />
            ) : title === '플레이리스트' ? (
              <PostingCard
                item={item}
                opt="playlist"
                round
                action={<PlayAction song={item.songs[0]} />}
              />
            ) : title === '데일리' ? (
              <Text>데일리</Text>
            ) : title === '계정' ? (
              <UserView user={item} />
            ) : (
              <Text>해시태그</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </>
  );
}
