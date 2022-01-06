import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as DailyContext } from 'context/Daily';
import { TouchableOpacity } from 'react-native-gesture-handler';
import style from 'constants/styles';

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
    <View style={style.flexRow}>
      <TouchableOpacity onPress={onPressLike} style={styles.icon}>
        <View />
      </TouchableOpacity>
      <Text>{likeCount}</Text>
      <View style={styles.icon} />
      <Text>{commentCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    borderWidth: 1,
  },
});
