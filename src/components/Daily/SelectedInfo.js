import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as DailyContext } from 'context/Daily';
import { TouchableOpacity } from 'react-native-gesture-handler';
import style from 'constants/styles';
import Icon from 'widgets/Icon';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';

export default function SelectedInfo({ myId, dailyId, likes, commentCount }) {
  const [like, setLike] = useState(likes.includes(myId));
  const likeCount = likes.length;
  const { likeDaily, unLikeDaily } = useContext(DailyContext);
  const onPressLike = () => {
    if (like) {
      unLikeDaily({ id: dailyId });
    } else {
      likeDaily({ id: dailyId });
    }
    setLike(!like);
  };
  return (
    <View style={[styles.container, style.flexRow, style.space_between]}>
      <View style={style.flexRow}>
        <Icon source={require('public/icons/daily-comment.png')} style={styles.icon} />
        <Text style={styles.countText}>{commentCount}</Text>
      </View>
      <View style={style.flexRow}>
        <View style={style.flexRow}>
          <TouchableOpacity onPress={onPressLike} style={styles.icon}>
            <Icon
              style={styles.icon}
              source={
                like
                  ? require('public/icons/daily-like-filled.png')
                  : require('public/icons/daily-like-empty.png')
              }
            />
          </TouchableOpacity>
          <Text style={styles.countText}>{likeCount}</Text>
        </View>
        <TouchableOpacity style={styles.icon}>
          <Icon style={styles.icon} source={require('public/icons/daily-share.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 8 * SCALE_WIDTH,
    paddingRight: 7 * SCALE_WIDTH,
    paddingBottom: 8 * SCALE_HEIGHT,
  },
  icon: {
    width: 40,
    height: 40,
  },
  countText: {
    fontSize: FS(16),
    color: COLOR_1,
  },
});
