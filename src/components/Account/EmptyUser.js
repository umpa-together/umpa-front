import React, { useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import EmptyData from 'components/EmptyData';
import RecommendAccount from 'components/Search/RecommendAccount';
import { Context as MainContentsContext } from 'context/MainContents';
import { SCALE_HEIGHT } from 'lib/utils/normalize';

const commentList = {
  follower: ['회원님을 팔로우하는,', '계정이 없습니다.'],
  following: ['회원님이 팔로잉하는,', '계정이 없습니다.'],
};

export default function EmptyUser({ my, opt }) {
  const textList = commentList[opt];
  const { getMainRecommendDJ } = useContext(MainContentsContext);

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
      <EmptyData
        customContainer={opt === 'follower' && styles.customContainer}
        icon
        textList={textList}
      />
      {my && <RecommendAccount />}
    </>
  );
}

const styles = StyleSheet.create({
  customContainer: {
    paddingBottom: 150 * SCALE_HEIGHT,
  },
});
