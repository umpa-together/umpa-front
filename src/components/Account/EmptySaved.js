import React from 'react';
import EmptyData from 'components/EmptyData';

const commentList = {
  playlist: ['회원님이 저장한', '플레이리스트가 없습니다.'],
  song: ['회원님이 저장한', '곡이 없습니다.'],
};

export default function EmptySaved({ opt }) {
  const textList = commentList[opt];

  return (
    <>
      <EmptyData icon textList={textList} />
    </>
  );
}
