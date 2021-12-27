import React, { useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import { SongImage } from 'widgets/SongImage';
import SvgUri from 'react-native-svg-uri';
import { useTrackPlayer } from 'providers/trackPlayer';
import { useChat } from 'providers/chat';

const MyArchiveLists = ({ socket, chatroom }) => {
  const { state } = useContext(UserContext);
  const { isPlayingId, addtracksong, stoptracksong } = useTrackPlayer();
  const { setSearchSongModal } = useChat();
  const { _id: chatid, participate } = chatroom;

  const onClickCover = (song) => {
    if (isPlayingId === song.id) {
      stoptracksong();
    } else {
      addtracksong({ data: song });
    }
  };

  const onClickSend = async (song) => {
    await socket.emit('chat message', {
      room: chatid,
      song,
      type: 'song',
      sender: state.myInfo._id,
      receiver: participate[0] === state.myInfo._id ? participate[1] : participate[0],
    });
    setSearchSongModal(false);
  };

  return (
    <FlatList
      data={state.myPlayList}
      keyExtractor={(song) => song.time}
      renderItem={({ item }) => {
        const img = item.attributes.artwork.url;
        const { name, artistName, contentRating } = item.attributes;
        const { id } = item;
        return (
          <TouchableOpacity style={styles.box} onPress={() => onClickSend(item)}>
            <TouchableOpacity onPress={() => onClickCover(item)}>
              <SongImage url={img} size={46} border={46} />
              <SvgUri
                width="24"
                height="24"
                source={
                  isPlayingId !== id
                    ? require('assets/icons/modalPlay.svg')
                    : require('assets/icons/modalStop.svg')
                }
                style={styles.playIcon}
              />
            </TouchableOpacity>
            <View style={styles.songBox}>
              <View style={styles.flexRow}>
                {contentRating === 'explicit' && (
                  <SvgUri
                    width="17"
                    height="17"
                    source={require('assets/icons/19.svg')}
                    style={styles.explicit}
                  />
                )}
                <Text numberOfLines={1} style={styles.name}>
                  {name}
                </Text>
              </View>
              <Text style={styles.artist}>{artistName}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    height: 54 * tmpWidth,
    marginLeft: 18 * tmpWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  songBox: {
    marginLeft: 11 * tmpWidth,
    width: 270 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  explicit: {
    marginRight: 5 * tmpWidth,
  },
  name: {
    fontSize: 16 * tmpWidth,
    fontWeight: '400',
  },
  artist: {
    color: '#505050',
    fontSize: 12 * tmpWidth,
    fontWeight: '300',
    marginTop: 3 * tmpWidth,
  },
  playIcon: {
    position: 'absolute',
    right: 11 * tmpWidth,
    bottom: 11 * tmpWidth,
  },
});

export default MyArchiveLists;
