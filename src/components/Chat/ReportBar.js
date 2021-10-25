import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import { Context as ChatContext } from 'context/ChatContext';
import { Context as UserContext } from 'context/UserContext';
import ProfileImage from 'components/ProfileImage';
import ReportModal from 'components/ReportModal';
import { useChat } from 'providers/chat';

const ReportBar = ({ user }) => {
  const { state, blockchat, unblockchat } = useContext(ChatContext);
  const { state: userState } = useContext(UserContext);
  const { optionModal, setOptionModal } = useChat();
  const [reportModal, setReportModal] = useState(false);

  const onClose = () => {
    setOptionModal(false);
  };

  const onClickReport = () => {
    setReportModal(true);
  };

  const onClickBlock = async () => {
    if (state.chatroom.rejectPerson.includes(userState.myInfo._id)) {
      await unblockchat({ chatid: state.chatroom._id });
    } else {
      await blockchat({ chatid: state.chatroom._id });
    }
  };

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={optionModal}
      backdropOpacity={0.4}
      onBackdropPress={onClose}
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <View style={styles.modal}>
        <View style={[styles.flexRow, styles.margin, styles.space]}>
          <View style={styles.flexRow}>
            <ProfileImage img={user.profileImage} imgStyle={styles.chatProfile} />
            <View style={styles.nameArea}>
              <Text style={styles.name} numberOfLines={1}>
                {user.name}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.exit} onPress={onClose}>
            <SvgUri
              width={14 * tmpWidth}
              height={14 * tmpWidth}
              source={require('assets/icons/chatexit.svg')}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.flexRow, styles.space, styles.boxMargin]}>
          <TouchableOpacity onPress={onClickReport} style={styles.textbox}>
            <Text style={styles.text}>신고</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textbox} onPress={onClickBlock}>
            <Text style={styles.text}>
              {state.chatroom.rejectPerson.includes(userState.myInfo._id) ? '차단풀기' : '차단하기'}
            </Text>
          </TouchableOpacity>
        </View>
        <ReportModal
          reportModal={reportModal}
          setReportModal={setReportModal}
          type="chat"
          subjectId={user._id}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: 375 * tmpWidth,
    height: 172 * tmpWidth,
    backgroundColor: '#fff',
    borderTopLeftRadius: 18 * tmpWidth,
    borderTopRightRadius: 18 * tmpWidth,
    paddingLeft: 14 * tmpWidth,
    paddingRight: 14 * tmpWidth,
  },
  chatProfile: {
    height: 40 * tmpWidth,
    width: 40 * tmpWidth,
    borderRadius: 40 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  margin: {
    marginTop: 16 * tmpWidth,
  },
  space: {
    justifyContent: 'space-between',
  },
  name: {
    marginLeft: 10 * tmpWidth,
    fontSize: 16 * tmpWidth,
    fontWeight: '500',
  },
  nameArea: {
    width: 240 * tmpWidth,
  },
  textbox: {
    width: 167 * tmpWidth,
    height: 40 * tmpWidth,
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: 10 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16 * tmpWidth,
    color: '#ff0000',
  },
  exit: {
    width: 40 * tmpWidth,
    height: 40 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  boxMargin: {
    marginTop: 20 * tmpWidth,
  },
});

export default ReportBar;
