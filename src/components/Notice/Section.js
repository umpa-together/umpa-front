/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/User';
import { Context as NoticeContext } from 'context/Notice';
import PlaylistNoticeForm from 'components/Notice/PlaylistNoticeForm';
import DailyNoticeForm from 'components/Notice/DailyNoticeForm';
import UserNoticeForm from 'components/Notice/UserNoticeForm';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import { push } from 'lib/utils/navigation';
import { Context as PlaylistContext } from 'context/Playlist';
import { Context as DailyContext } from 'context/Daily';

export default function Section({ data }) {
  const { noticinguser: user, _id: id, isRead, noticetype: type, playlist, daily } = data;
  const { readNotice } = useContext(NoticeContext);
  const { getOtherInformation } = useContext(UserContext);
  const { getSelectedPlaylist } = useContext(PlaylistContext);
  const { getSelectedDaily } = useContext(DailyContext);

  const onClickProfile = async () => {
    await getOtherInformation({ id: user._id });
    push('OtherAccount', { otherUserId: user._id });
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
      await getSelectedPlaylist({ id: playlist._id, postUserId: playlist.postUserId });
      push('SelectedPlaylist', { id: playlist._id, postUser: playlist.postUserId });
    } else {
      await getSelectedDaily({ id: daily._id, postUserId: daily.postUserId });
      push('SelectedDaily', { id: daily._id, postUser: daily.postUserId });
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
        <UserNoticeForm notice={data} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18 * SCALE_WIDTH,
    marginVertical: 7 * SCALE_HEIGHT,
    borderWidth: 1,
  },
});
