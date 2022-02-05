import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { navigate } from 'lib/utils/navigation';
import FastImage from 'react-native-fast-image';
import { StatusBarHeight } from 'components/StatusBar';
import Icon from 'widgets/Icon';
import GuideBox from 'components/Relay/GuideBox';

const TemplateA = ({ title }) => {
  return (
    <View style={styles.templateAContainer}>
      <Text style={styles.playlistText}>Playlist</Text>
      {title.map((item) => {
        return (
          <Text key={item} style={styles.aTitleText}>
            {item}
          </Text>
        );
      })}
    </View>
  );
};

const TemplateB = ({ title }) => {
  return (
    <View style={styles.templateBContainer}>
      {title.map((item) => {
        return (
          <Text key={item} style={styles.bTitleText}>
            {item}
          </Text>
        );
      })}
    </View>
  );
};

const TemplateC = ({ title }) => {
  return (
    <View style={styles.templateCContainer}>
      <Text style={[styles.playlistText, styles.playlistMargin]}>Playlist</Text>
      {title.map((item) => {
        return (
          <Text key={item} style={styles.cTitleText}>
            {item}
          </Text>
        );
      })}
    </View>
  );
};

const TemplateD = ({ title }) => {
  return (
    <View style={styles.templateDContainer}>
      <Text style={styles.playlistText}>Playlist</Text>
      {title.map((item) => {
        return (
          <Text key={item} style={styles.dTitleText}>
            {item}
          </Text>
        );
      })}
    </View>
  );
};

export default function CurrentSection({ relay }) {
  const {
    title,
    image,
    representSong: {
      attributes: { name, artistName },
    },
    _id,
    template,
    opacityTop,
    opacityBottom,
    createdTime,
  } = relay;

  const templateLists = {
    A: <TemplateA title={title} />,
    B: <TemplateB title={title} />,
    C: <TemplateC title={title} />,
    D: <TemplateD title={title} />,
  };

  const onClickRelay = (id) => {
    navigate('SelectedRelay', { id });
  };

  return (
    <TouchableOpacity
      onPress={() => onClickRelay(_id)}
      style={styles.container}
      activeOpacity={0.9}
    >
      <FastImage source={{ uri: image }} style={styles.img} />
      {opacityTop && (
        <Icon source={require('public/icons/opacity-top.png')} style={styles.opacityTop} />
      )}
      {opacityBottom && (
        <Icon source={require('public/icons/opacity-bottom.png')} style={styles.opacityBottom} />
      )}
      {templateLists[template]}
      <View style={styles.songContainer}>
        <View style={styles.firstLine}>
          <Text style={styles.first}>첫곡</Text>
        </View>
        <View style={[styles.nameContainer, style.flexRow]}>
          <Icon source={require('public/icons/main-relay-song.png')} style={styles.icon} />
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text style={styles.artist}>{artistName}</Text>
      </View>
      <GuideBox time={createdTime} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: 495 * SCALE_HEIGHT,
    position: 'absolute',
    zIndex: -1,
  },
  templateAContainer: {
    paddingTop: (80 + StatusBarHeight) * SCALE_HEIGHT,
    paddingLeft: 36 * SCALE_WIDTH,
  },
  playlistText: {
    fontSize: FS(20),
    color: '#fff',
  },
  aTitleText: {
    fontSize: FS(32),
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 16 * SCALE_HEIGHT,
    marginBottom: 4 * SCALE_HEIGHT,
  },
  templateBContainer: {
    paddingTop: (96 + StatusBarHeight) * SCALE_HEIGHT,
    paddingLeft: 36 * SCALE_WIDTH,
  },
  bTitleText: {
    fontSize: FS(30),
    color: '#fff',
    marginBottom: 20 * SCALE_HEIGHT,
  },
  templateCContainer: {
    paddingTop: (72 + StatusBarHeight) * SCALE_HEIGHT,
    paddingRight: 27 * SCALE_WIDTH,
    alignItems: 'flex-end',
  },
  cTitleText: {
    fontSize: FS(36),
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 22 * SCALE_HEIGHT,
    marginBottom: 2 * SCALE_HEIGHT,
  },
  playlistMargin: {
    marginRight: 3 * SCALE_WIDTH,
  },
  templateDContainer: {
    paddingTop: (70 + StatusBarHeight) * SCALE_HEIGHT,
    paddingLeft: 35 * SCALE_WIDTH,
  },
  dTitleText: {
    fontSize: FS(30),
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 12 * SCALE_HEIGHT,
  },
  songContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 36 * SCALE_WIDTH,
    marginBottom: 164 * SCALE_HEIGHT,
  },
  firstLine: {
    borderBottomWidth: 0.7 * SCALE_HEIGHT,
    borderBottomColor: '#fff',
    paddingBottom: 5 * SCALE_HEIGHT,
  },
  first: {
    fontSize: FS(14),
    color: '#fff',
  },
  icon: {
    width: 26 * SCALE_WIDTH,
    height: 26 * SCALE_WIDTH,
    marginRight: 2 * SCALE_WIDTH,
  },
  nameContainer: {
    paddingVertical: 3 * SCALE_HEIGHT,
  },
  name: {
    fontSize: FS(18),
    color: '#fff',
    fontWeight: 'bold',
  },
  artist: {
    fontSize: FS(14),
    color: '#fff',
  },
  opacityTop: {
    width: '100%',
    height: 229 * SCALE_HEIGHT,
    position: 'absolute',
  },
  opacityBottom: {
    width: '100%',
    height: 229 * SCALE_HEIGHT,
    position: 'absolute',
    bottom: 100 * SCALE_HEIGHT,
  },
});
