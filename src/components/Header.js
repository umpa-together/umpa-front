import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { tmpWidth, tmpHeight } from 'components/FontNormalize';
import StatusBarHeight from 'components/StatusBarHeight';
import SvgUri from 'react-native-svg-uri';
import { goBack, navigate } from 'lib/utils/navigation';
import TextTicker from 'react-native-text-ticker';
import { useChat } from 'providers/chat';

const Header = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity style={styles.back} onPress={goBack}>
      <SvgUri
        width={40 * tmpWidth}
        height={40 * tmpWidth}
        source={require('assets/icons/back.svg')}
      />
    </TouchableOpacity>
  </View>
);

export const NavHeader = ({ title, isBack = false }) => (
  <View style={styles.navContainer}>
    <Text style={styles.title}>{title}</Text>
    {isBack && (
      <TouchableOpacity style={styles.back} onPress={goBack}>
        <SvgUri
          width={40 * tmpWidth}
          height={40 * tmpWidth}
          source={require('assets/icons/back.svg')}
        />
      </TouchableOpacity>
    )}
  </View>
);

export const PlaylistHeader = ({ title }) => (
  <View style={styles.playlistContainer}>
    <View style={styles.titleMoveArea}>
      <TextTicker duration={10000} bounce={false} marqueeDelay={1000} style={styles.playlistTitle}>
        {title}
      </TextTicker>
    </View>
    <TouchableOpacity style={styles.back} onPress={goBack}>
      <SvgUri
        width={40 * tmpWidth}
        height={40 * tmpWidth}
        source={require('assets/icons/back.svg')}
      />
    </TouchableOpacity>
  </View>
);

export const ChatHeader = ({ title, callback, isCreate }) => {
  const { setOptionModal } = useChat();

  const onClickBack = () => {
    if (callback) callback();
    goBack();
  };

  const onClickOption = () => {
    if (!callback) {
      navigate('CreateChat');
    } else {
      setOptionModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.back} onPress={onClickBack}>
        <SvgUri
          width={40 * tmpWidth}
          height={40 * tmpWidth}
          source={require('assets/icons/back.svg')}
        />
      </TouchableOpacity>
      {!isCreate && (
        <TouchableOpacity style={styles.icon} onPress={onClickOption}>
          <View style={{ width: 40 * tmpWidth, height: 40 * tmpHeight, backgroundColor: '#222' }} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: (48 + StatusBarHeight) * tmpWidth,
    paddingTop: StatusBarHeight * tmpWidth,
    backgroundColor: 'rgb(254,254,254)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistContainer: {
    height: (48 + StatusBarHeight) * tmpWidth,
    paddingTop: StatusBarHeight * tmpWidth,
    backgroundColor: 'rgb(254,254,254)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleMoveArea: {
    width: 250 * tmpWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navContainer: {
    width: '100%',
    height: (48 + StatusBarHeight) * tmpWidth,
    paddingTop: StatusBarHeight * tmpWidth,
    backgroundColor: 'rgb(255, 255, 255)',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      height: 3 * tmpWidth,
      width: 0,
    },
    shadowRadius: 8 * tmpWidth,
    shadowOpacity: 0.07,
  },
  title: {
    textAlign: 'center',
    fontSize: 18 * tmpWidth,
  },
  playlistTitle: {
    textAlign: 'center',
    fontSize: 16 * tmpWidth,
    fontWeight: '700',
  },
  back: {
    position: 'absolute',
    left: 5 * tmpWidth,
    top: (2 + StatusBarHeight) * tmpWidth,
  },
  icon: {
    position: 'absolute',
    right: 5 * tmpWidth,
    top: (2 + StatusBarHeight) * tmpWidth,
  },
});

export default Header;
