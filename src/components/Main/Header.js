import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import StatusBarHeight from 'components/StatusBarHeight';
import { tmpWidth } from 'components/FontNormalize';
import { navigate } from 'lib/utils/navigation';
import SvgUri from 'react-native-svg-uri';
import { Context as ChatContext } from 'context/ChatContext';

const Header = () => {
  const { state, getChatList } = useContext(ChatContext);

  const onClickNotice = () => {
    navigate('Notice');
  };

  const onClickChat = () => {
    getChatList();
    navigate('Chat');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>환영합니다</Text>
      <View style={styles.flexRow}>
        <TouchableOpacity style={styles.icon} onPress={onClickNotice}>
          <SvgUri width={40} height={40} source={require('assets/icons/alarm.svg')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={onClickChat}>
          <SvgUri width={40} height={40} source={require('assets/icons/chat.svg')} />
          {state.unReadMessagesNum > 0 && (
            <View style={styles.alarm}>
              <Text style={styles.messages}>{state.unReadMessagesNum}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: (46 + StatusBarHeight) * tmpWidth,
    paddingTop: StatusBarHeight * tmpWidth,
    backgroundColor: 'rgb(254,254,254)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24 * tmpWidth,
    marginTop: 8 * tmpWidth,
    paddingLeft: 18 * tmpWidth,
  },
  icon: {
    width: 40 * tmpWidth,
    height: 40 * tmpWidth,
    marginRight: 8 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messages: {
    fontSize: 12 * tmpWidth,
    fontWeight: '500',
    color: '#ffffff',
  },
  alarm: {
    width: 18 * tmpWidth,
    height: 18 * tmpWidth,
    borderRadius: 18 * tmpWidth,
    backgroundColor: '#e74d4d',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 1 * tmpWidth,
  },
});

export default Header;
