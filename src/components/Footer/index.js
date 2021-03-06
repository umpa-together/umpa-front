import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/User';
import { Context as PlaylistContext } from 'context/Playlist';
import { Context as DailyContext } from 'context/Daily';
import { Context as RelayContext } from 'context/Relay';
import FS, { SCALE_WIDTH } from 'lib/utils/normalize';
import style from 'constants/styles';
import Icon from 'widgets/Icon';
import { COLOR_1 } from 'constants/colors';
import SendList, { SendFeed } from 'lib/utils/kakaoShare';
import Text from 'components/Text';

export default function Footer({ object, type }) {
  const { state } = useContext(UserContext);
  const { likePlaylist, unLikePlaylist } = useContext(PlaylistContext);
  const { likeDaily, unLikeDaily } = useContext(DailyContext);
  const { likeRelayPlaylist, unlikeRelayPlaylist } = useContext(RelayContext);
  const { likes, comments, _id: id } = object;
  const [isLike, setIsLike] = useState(likes.includes(state.user._id));
  const [likeCount, setLikeCount] = useState(likes.length);
  const onClickLikes = () => {
    if (isLike) {
      if (type === 'playlist') {
        unLikePlaylist({ id });
      } else if (type === 'daily') {
        unLikeDaily({ id });
      } else if (type === 'relay') {
        unlikeRelayPlaylist({ id });
      }
      setLikeCount(likeCount - 1);
    } else {
      if (type === 'playlist') {
        likePlaylist({ id });
      } else if (type === 'daily') {
        likeDaily({ id });
      } else if (type === 'relay') {
        likeRelayPlaylist({ id });
      }
      setLikeCount(likeCount + 1);
    }
    setIsLike(!isLike);
  };

  const onClickShare = () => {
    if (type === 'playlist' || type === 'relay') {
      SendList({ playlist: object });
    } else if (type === 'daily') {
      SendFeed({ daily: object });
    }
  };

  return (
    <View style={[styles.container, style.flexRow, style.space_between]}>
      <View style={style.flexRow}>
        <Icon source={require('public/icons/comment.png')} style={styles.icon} />
        <Text style={styles.indicator}>{comments && comments.length}</Text>
      </View>
      <View style={style.flexRow}>
        <TouchableOpacity onPress={onClickLikes}>
          <View style={style.flexRow}>
            <Icon
              source={
                isLike
                  ? require('public/icons/like-filled.png')
                  : require('public/icons/like-empty.png')
              }
              style={styles.icon}
            />
            <Text style={styles.indicator}>{likes && likeCount > 0 && likeCount}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickShare}>
          <Icon source={require('public/icons/share.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 8 * SCALE_WIDTH,
    paddingRight: 3 * SCALE_WIDTH,
  },
  icon: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
  },
  indicator: {
    fontSize: FS(16),
    color: COLOR_1,
  },
});
