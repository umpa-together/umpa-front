import React, { useContext, memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/User';
import PlaylistAlbumImage from 'components/PlaylistAlbumImage';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_5 } from 'constants/colors';
import style from 'constants/styles';
import Text from 'components/Text';
import { navigate, push } from 'lib/utils/navigation';
import YoutubeLink from 'components/youtubeLink';
import { OpenPlaylist } from 'lib/utils/youtube';

export default memo(function SelectedInfo({ playlist }) {
  const {
    image,
    title,
    textcontent,
    postUserId: { name, _id: postUserId },
    songs,
    time,
    youtubeUrl,
  } = playlist;
  const {
    state: {
      user: { _id: myId },
    },
  } = useContext(UserContext);

  const convertedTime = time.slice(0, 10);

  const onClickProfile = () => {
    if (myId === postUserId) {
      navigate('MyAccount');
    } else {
      push('OtherAccount', { id: postUserId });
    }
  };
  const onClickYoutube = () => {
    OpenPlaylist(youtubeUrl);
  };
  return (
    <View style={[style.flexRow, styles.container]}>
      <View style={style.flexRow}>
        <PlaylistAlbumImage round image={image} songs={songs} size={140} />
        <View style={[styles.textContainer, style.space_between]}>
          <View>
            <Text style={styles.titleText}>{title}</Text>
            {textcontent.length > 0 && <Text style={styles.contextText}>{textcontent}</Text>}
            <Text style={styles.contextText}>{convertedTime}</Text>
          </View>
          <YoutubeLink url={youtubeUrl} func={onClickYoutube} />
          <TouchableOpacity onPress={onClickProfile}>
            <Text style={styles.nameText}>by {name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 17 * SCALE_HEIGHT,
    paddingLeft: 26 * SCALE_WIDTH,
    paddingRight: 18 * SCALE_WIDTH,
    borderWidth: 1,
  },
  imageContainer: {
    width: 140 * SCALE_WIDTH,
    height: 140 * SCALE_WIDTH,
    borderRadius: 6 * SCALE_HEIGHT,
  },
  imageText: {
    fontSize: FS(20),
    color: '#FFF',
    position: 'absolute',
    left: 52 * SCALE_WIDTH,
    top: 58 * SCALE_HEIGHT,
  },
  textContainer: {
    marginLeft: 15 * SCALE_WIDTH,
    width: 176 * SCALE_WIDTH,
    height: 140 * SCALE_HEIGHT,
  },
  titleText: {
    fontSize: FS(16),
    marginBottom: 16 * SCALE_HEIGHT,
    color: '#000',
  },
  contextText: {
    fontSize: FS(11),
    color: COLOR_5,
    marginBottom: 10 * SCALE_HEIGHT,
  },
  nameText: {
    fontSize: FS(11),
    color: '#85A0FF',
  },
});
