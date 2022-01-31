import React, { useEffect, useContext } from 'react';
import EmptyData from 'components/EmptyData';
import RecommendAccount from 'components/Search/RecommendAccount';
import { Context as MainContentsContext } from 'context/MainContents';

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
      <EmptyData icon textList={textList} />
      {my && <RecommendAccount />}
    </>
  );
}
