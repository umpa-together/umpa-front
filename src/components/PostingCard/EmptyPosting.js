import React, { memo } from 'react';
import { Text, StyleSheet } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_3 } from 'constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigate } from 'lib/utils/navigation';
import Icon from 'widgets/Icon';
import EmptyData from 'components/EmptyData';

const commentList = {
  playlist: {
    my: ['새 플레이리스트를 추가해서,', '나만의 취향을 알려주세요.'],
    other: ['플레이리스트 없음'],
  },
  daily: {
    my: ['새 데일리를 추가해서,', '나만의 음악을 이야기해주세요.'],
    other: ['게시물 없음'],
  },
  relay: {
    my: ['참여한 릴레이 플리가 없습니다.'],
    other: ['게시물 없음'],
  },
};

export default function EmptyPosting({ my, opt }) {
  const textList = my ? commentList[opt].my : commentList[opt].other;
  const onPressRelay = () => {
    navigate('Relay');
  };

  const Action = memo(() => {
    return (
      <TouchableOpacity style={styles.relayButton} onPress={onPressRelay}>
        <Text style={styles.relayText}>릴레이 플리 참여하기</Text>
        <Icon style={styles.icon} source={require('public/icons/account-relay-button.png')} />
      </TouchableOpacity>
    );
  });

  return (
    <EmptyData
      action={opt === 'relay' && my && <Action />}
      textList={textList}
      customContainer={my ? styles.myHeight : styles.otherHeight}
    />
  );
}

const styles = StyleSheet.create({
  myHeight: {
    height: 250 * SCALE_HEIGHT,
  },
  otherHeight: {
    height: 300 * SCALE_HEIGHT,
  },
  relayButton: {
    backgroundColor: '#DBDBDB',
    borderRadius: 43 * SCALE_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  relayText: {
    color: COLOR_3,
    fontSize: FS(13),
    paddingLeft: 12 * SCALE_WIDTH,
    paddingRight: 24 * SCALE_WIDTH,
    paddingVertical: 4 * SCALE_HEIGHT,
  },
  icon: {
    width: 20 * SCALE_WIDTH,
    height: 20 * SCALE_WIDTH,
    position: 'absolute',
    right: 6 * SCALE_WIDTH,
  },
});
