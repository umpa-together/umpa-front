import React from 'react';
import { StyleSheet } from 'react-native';
import EmptyData from 'components/EmptyData';
import { SCALE_HEIGHT } from 'lib/utils/normalize';

const commentList = {
  playlist: ['회원님이 저장한', '플레이리스트가 없습니다.'],
  song: ['회원님이 저장한', '곡이 없습니다.'],
};

export default function EmptySaved({ opt }) {
  const textList = commentList[opt];

  return (
    <>
      <EmptyData customContainer={styles.customContainer} icon textList={textList} />
    </>
  );
}

const styles = StyleSheet.create({
  customContainer: {
    paddingBottom: 150 * SCALE_HEIGHT,
  },
});
