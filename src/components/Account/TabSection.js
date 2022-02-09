import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import PostingResult from 'components/PostingCard/PostingResult';
import CreateButton from 'components/Account/CreateButton';
import SortPosting from 'components/Account/SortPosting';
import SortModal from 'components/Modal/SortModal';

const sortList = [
  { title: '인기 순', key: 'like' },
  { title: '최근추가 순', key: 'timeRecent' },
  { title: '오래된 순', key: 'timeOld' },
];

export default function TabSection({ my, data, opt }) {
  const [sortOpt, setSortOpt] = useState('최근추가 순');
  const [sortModal, setSortModal] = useState(false);
  const onPressModal = () => {
    setSortModal(!sortModal);
  };

  const sortFunction = (key) => {
    if (key === 'like') {
      data.sort(function (a, b) {
        if (a.likes.length > b.likes.length) return -1;
        if (a.likes.length > b.likes.length) return 0;
        return 1;
      });
      setSortOpt('인기 순');
    } else if (key === 'timeRecent') {
      data.sort(function (a, b) {
        if (a.time > b.time) return -1;
        if (a.time > b.time) return 0;
        return 1;
      });
      setSortOpt('최근추가 순');
    } else {
      data.sort(function (a, b) {
        if (a.time > b.time) return 1;
        if (a.time > b.time) return 0;
        return -1;
      });
      setSortOpt('오래된 순');
    }
    setSortModal(false);
  };
  const sortInfo = {
    list: sortList,
    func: sortFunction,
    current: sortOpt,
  };
  return (
    <ScrollView>
      <SortPosting count={data.length} onPressModal={onPressModal} title={sortOpt} />
      {my && opt !== 'relay' && <CreateButton opt={opt} />}
      <PostingResult my={my} data={data} opt={opt} />
      <SortModal modal={sortModal} setModal={setSortModal} sortInfo={sortInfo} />
    </ScrollView>
  );
}
