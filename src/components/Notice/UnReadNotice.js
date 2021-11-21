/* eslint-disable no-nested-ternary */
import React from 'react';
import { View } from 'react-native';
import PlaylistNoticeForm from 'components/Notice/PlaylistNoticeForm';
import UserNoticeForm from 'components/Notice/UserNoticeForm';
import DailyNoticeForm from 'components/Notice/DailyNoticeForm';

const UnReadNotice = ({ notice }) => {
  const { noticetype: type } = notice;
  return (
    <View style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
      {type === 'plike' ||
      type === 'pcom' ||
      type === 'pcomlike' ||
      type === 'precom' ||
      type === 'precomlike' ? (
        <PlaylistNoticeForm notice={notice} />
      ) : type === 'dlike' ||
        type === 'dcom' ||
        type === 'dcomlike' ||
        type === 'drecom' ||
        type === 'drecomlike' ? (
        <DailyNoticeForm notice={notice} />
      ) : type === 'follow' ? (
        <UserNoticeForm notice={notice} />
      ) : null}
    </View>
  );
};

export default UnReadNotice;
