import React, { memo, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import EmptyData from 'components/EmptyData';
import RecommendAcocunt from 'components/Search/RecommendAccount';
import { Context as MainContentsContext } from 'context/MainContents';

const commentList = {
  follower: ['회원님을 팔로우하는,', '계정이 없습니다.'],
  following: ['회원님이 팔로잉하는,', '계정이 없습니다.'],
};

export default function EmptyUser({ my, opt }) {
  const textList = commentList[opt];
  const { getMainRecommendDJ } = useContext(MainContentsContext);

  const IconComponent = memo(() => {
    return <Icon style={styles.icon} source={require('public/icons/account-empty-data.png')} />;
  });
  const dataFetch = async () => {
    await getMainRecommendDJ();
  };
  useEffect(() => {
    if (my) {
      dataFetch();
    }
  }, []);

  return (
    <>
      <EmptyData icon={<IconComponent />} textList={textList} />
      {my && <RecommendAcocunt />}
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    marginBottom: 17 * SCALE_HEIGHT,
  },
});
