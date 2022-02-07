/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Context as NoticeContext } from 'context/Notice';
import PlaylistNoticeForm from 'components/Notice/PlaylistNoticeForm';
import DailyNoticeForm from 'components/Notice/DailyNoticeForm';
import UserNoticeForm from 'components/Notice/UserNoticeForm';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import { push } from 'lib/utils/navigation';

export default function Section({ data }) {
  const { noticinguser: user, _id: id, isRead, noticetype: type, playlist, daily } = data;
  const { readNotice } = useContext(NoticeContext);

  const onClickProfile = async () => {
    push('OtherAccount', { id: user._id });
  };

  const onClickNotice = async () => {
    if (!isRead) readNotice({ id });
    if (type === 'follow') {
      onClickProfile();
    } else if (
      type === 'plike' ||
      type === 'pcom' ||
      type === 'pcomlike' ||
      type === 'precom' ||
      type === 'precomlike'
    ) {
      push('SelectedPlaylist', {
        post: false,
        id: playlist._id,
        postUserId: playlist.postUserId,
      });
    } else {
      push('SelectedDaily', { post: false, id: daily._id, postUserId: daily.postUserId });
    }
  };

  return (
    <TouchableOpacity style={[style.flexRow, styles.container]} onPress={onClickNotice}>
      {type === 'plike' ||
      type === 'pcom' ||
      type === 'pcomlike' ||
      type === 'precom' ||
      type === 'precomlike' ? (
        <PlaylistNoticeForm notice={data} onClickProfile={onClickProfile} />
      ) : type === 'dlike' ||
        type === 'dcom' ||
        type === 'dcomlike' ||
        type === 'drecom' ||
        type === 'drecomlike' ? (
        <DailyNoticeForm notice={data} onClickProfile={onClickProfile} />
      ) : (
        <UserNoticeForm notice={data} onClickProfile={onClickProfile} />
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
