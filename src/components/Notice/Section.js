/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Context as NoticeContext } from 'context/Notice';
import PlaylistNoticeForm from 'components/Notice/PlaylistNoticeForm';
import DailyNoticeForm from 'components/Notice/DailyNoticeForm';
import UserNoticeForm from 'components/Notice/UserNoticeForm';
import RelayNoticeForm from 'components/Notice/RelayNoticeForm';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import { push } from 'lib/utils/navigation';

export default function Section({ data }) {
  const { noticinguser: user, _id: id, isRead, noticetype: type, playlist, daily } = data;
  const { readNotice } = useContext(NoticeContext);
  const playlistTypeLists = ['plike', 'pcom', 'pcomlike', 'precom', 'precomlike'];
  const dailyTypeLists = ['dlike', 'dcom', 'dcomlike', 'drecom', 'drecomlike'];
  const userTypeLists = ['follow'];
  const relayTypeLists = ['relay', 'rrecom', 'rcomlike', 'rrecomlike'];

  const onClickProfile = async () => {
    push('OtherAccount', { id: user._id });
  };

  const onClickNotice = async () => {
    if (!isRead) readNotice({ id });
    if (userTypeLists.includes(type)) {
      onClickProfile();
    } else if (playlistTypeLists.includes(type)) {
      push('SelectedPlaylist', {
        post: false,
        id: playlist._id,
        postUserId: playlist.postUserId,
      });
    } else if (dailyTypeLists.includes(type)) {
      push('SelectedDaily', { post: false, id: daily._id, postUserId: daily.postUserId });
    } else if (relayTypeLists.includes(type)) {
      push('SelectedRelay', { id });
    }
  };

  return (
    <TouchableOpacity style={[style.flexRow, styles.container]} onPress={onClickNotice}>
      {playlistTypeLists.includes(type) ? (
        <PlaylistNoticeForm notice={data} onClickProfile={onClickProfile} />
      ) : dailyTypeLists.includes(type) ? (
        <DailyNoticeForm notice={data} onClickProfile={onClickProfile} />
      ) : userTypeLists.includes(type) ? (
        <UserNoticeForm notice={data} onClickProfile={onClickProfile} />
      ) : (
        <RelayNoticeForm notice={data} onClickProfile={onClickProfile} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18 * SCALE_WIDTH,
    marginTop: 18 * SCALE_HEIGHT,
  },
});
