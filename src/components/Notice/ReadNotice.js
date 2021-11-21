/* eslint-disable no-nested-ternary */
import React from 'react';
import { View } from 'react-native';
import PlaylistNoticeForm from 'components/Notice/PlaylistNoticeForm';
import UserNoticeForm from 'components/Notice/UserNoticeForm';
import DailyNoticeForm from 'components/Notice/DailyNoticeForm';

const ReadNotice = ({ notice }) => {
  const { noticetype: type } = notice;
  return (
    <View>
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

export default ReadNotice;
