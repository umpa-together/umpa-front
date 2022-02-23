import React, { useState, useContext, useCallback } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Context as AuthContext } from 'context/Auth';
import { Context as ReportContext } from 'context/Report';
import { Context as UserContext } from 'context/User';
import Icon from 'widgets/Icon';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1, COLOR_5, COLOR_2, COLOR_3, MAIN_COLOR } from 'constants/colors';
import style from 'constants/styles';
import WithdrawalModal from 'components/Modal/WithDrawalModal';
import Text from 'components/Text';

export default function WithDrawalSection() {
  const { withdrawal } = useContext(AuthContext);
  const { postReport } = useContext(ReportContext);
  const {
    state: { user },
  } = useContext(UserContext);
  const [lastCheck, setLastCheck] = useState(false);
  const [reasonModal, setReasonModal] = useState(false);
  const [reason, setReason] = useState(null);
  const [directReason, setDirectReason] = useState('');
  const onClickLastCheck = () => {
    setLastCheck(!lastCheck);
  };

  const onClickReason = () => {
    setReasonModal(true);
  };

  const onClickWithDrawal = async () => {
    if (lastCheck && reason) {
      await postReport({
        type: '회원탈퇴',
        reason:
          reason === '직접 입력' ? `${directReason} by ${user.name}` : `${reason} by ${user.name}`,
        subjectId: user._id,
      });
      withdrawal({ id: user._id });
    }
  };
  const onChangeText = useCallback((text) => setDirectReason(text), []);

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Icon source={require('public/icons/withdrawal-icon.png')} style={styles.withdrawalIcon} />
      <Text style={styles.withdrawalText}>음파를 떠나시나요?</Text>
      <Text style={[styles.withdrawalText, styles.textMargin]}>
        탈퇴하시기 전에 한번 확인해주세요
      </Text>
      <View style={styles.withDrawalContainer}>
        <Text style={styles.withdrawalSub}>
          탈퇴 사유 <Text style={styles.mainCOLOR}>*</Text>
        </Text>
        <TouchableOpacity
          style={[
            style.flexRow,
            styles.box,
            style.space_between,
            { marginBottom: reason !== '직접 입력' ? 57 * SCALE_HEIGHT : 10 * SCALE_HEIGHT },
          ]}
          onPress={onClickReason}
        >
          <Text style={reason ? styles.selectedReason : styles.reason}>
            {reason || '탈퇴 사유 선택'}
          </Text>
          <Icon source={require('public/icons/right-action.png')} style={styles.rightAction} />
        </TouchableOpacity>
        {reason === '직접 입력' && (
          <View style={styles.directBox}>
            <TextInput
              value={directReason}
              placeholder="탈퇴 사유를 입력해주세요."
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onChangeText}
              placeholderTextColor={COLOR_5}
              allowFontScaling={false}
            />
          </View>
        )}
        <Text style={styles.withdrawalSub}>유의 사항 *</Text>
        <Text style={styles.detail}>
          탈퇴시, 회원님의 계정은 영구적으로 삭제되며, 해당 계정의 모든 데이터(플레이리스트, 댓글,
          좋아요 등) 또한 모두 삭제됩니다. 삭제된 정보는 복구할 수 없습니다.
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.lastContainer, style.flexRow]} onPress={onClickLastCheck}>
          <Icon
            source={
              lastCheck
                ? require('public/icons/term-check.png')
                : require('public/icons/term-uncheck.png')
            }
            style={styles.term}
          />
          <Text style={styles.last}>안내사항을 모두 확인했으며, 탈퇴를 신청합니다.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onClickWithDrawal}
          activeOpacity={0.8}
          style={[styles.sendBox, lastCheck && reason && styles.active]}
        >
          <Text style={styles.sendText}>탈퇴하기</Text>
        </TouchableOpacity>
      </View>
      <WithdrawalModal
        modal={reasonModal}
        setModal={setReasonModal}
        setReason={setReason}
        reason={reason}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 20 * SCALE_HEIGHT,
    width: '100%',
    marginLeft: 16 * SCALE_WIDTH,
  },
  sendBox: {
    width: 343 * SCALE_WIDTH,
    height: 49 * SCALE_HEIGHT,
    borderRadius: 20 * SCALE_HEIGHT,
    backgroundColor: '#c4c4c4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: MAIN_COLOR,
  },
  sendText: {
    fontSize: FS(16),
    color: '#fff',
  },
  withdrawalText: {
    fontSize: FS(18),
    color: COLOR_1,
    textAlign: 'center',
    lineHeight: 21 * SCALE_HEIGHT,
  },
  textMargin: {
    marginTop: 5 * SCALE_HEIGHT,
  },
  withDrawalContainer: {
    paddingHorizontal: 16 * SCALE_WIDTH,
    marginTop: 75 * SCALE_HEIGHT,
  },
  box: {
    width: 343 * SCALE_WIDTH,
    minHeight: 38 * SCALE_HEIGHT,
    borderColor: '#dbdbdb',
    borderWidth: 1 * SCALE_WIDTH,
    borderRadius: 6 * SCALE_HEIGHT,
    justifyContent: 'center',
    padding: 0,
    paddingHorizontal: 12 * SCALE_WIDTH,
    marginTop: 10 * SCALE_HEIGHT,
  },
  withdrawalSub: {
    fontSize: FS(12),
    lineHeight: 14 * SCALE_HEIGHT,
    color: COLOR_2,
  },
  withdrawalIcon: {
    width: 60 * SCALE_WIDTH,
    height: 60 * SCALE_WIDTH,
    marginLeft: 158 * SCALE_WIDTH,
    marginVertical: 31 * SCALE_HEIGHT,
  },
  mainCOLOR: {
    color: MAIN_COLOR,
  },
  selectedReason: {
    color: COLOR_1,
    fontSize: FS(14),
  },
  reason: {
    color: COLOR_5,
    fontSize: FS(14),
  },
  detail: {
    fontSize: FS(14),
    lineHeight: 25 * SCALE_HEIGHT,
    color: COLOR_3,
    marginTop: 10 * SCALE_HEIGHT,
  },
  rightAction: {
    width: 6 * SCALE_WIDTH,
    height: 13 * SCALE_HEIGHT,
  },
  lastContainer: {
    marginBottom: 16 * SCALE_HEIGHT,
  },
  last: {
    fontSize: FS(12),
    color: COLOR_1,
  },
  term: {
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_WIDTH,
  },
  directBox: {
    backgroundColor: '#ebebeb',
    borderRadius: 6 * SCALE_HEIGHT,
    width: 343 * SCALE_WIDTH,
    height: 38 * SCALE_HEIGHT,
    marginBottom: 47 * SCALE_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 12 * SCALE_WIDTH,
  },
});
