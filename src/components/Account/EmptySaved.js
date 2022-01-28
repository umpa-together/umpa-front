import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import EmptyData from 'components/EmptyData';

const commentList = {
  playlist: ['회원님이 저장한', '플레이리스트가 없습니다.'],
  song: ['회원님이 저장한', '곡이 없습니다.'],
};

export default function EmptySaved({ opt }) {
  const textList = commentList[opt];

  const IconComponent = memo(() => {
    return <Icon style={styles.icon} source={require('public/icons/account-empty-data.png')} />;
  });

  return (
    <>
      <EmptyData icon={<IconComponent />} textList={textList} customContainer={styles.height} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  height: {
    flex: 1,
  },
  icon: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    marginBottom: 17 * SCALE_HEIGHT,
  },
});
