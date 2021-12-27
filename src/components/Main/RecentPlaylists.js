/* eslint-disable no-shadow */
import React, { useRef, useEffect, useState, useCallback, useContext } from 'react';
import { Text, FlatList, Image, View, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { push } from 'lib/utils/navigation';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from 'widgets/ProfileImage';

const SPACING = 10;
const VISIBLE_ITEMS = 3;

const RecentPlaylists = ({ playlists }) => {
  const { getPlaylist } = useContext(PlaylistContext);
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const setActiveIndex = useCallback((activeIndex) => {
    setIndex(activeIndex);
    scrollXIndex.setValue(activeIndex);
  });

  const onClickPlaylist = async (id, postUserId) => {
    await getPlaylist({ id, postUserId: postUserId._id });
    push('SelectedPlaylist', { id, postUser: postUserId._id });
  };

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <View>
      <Text style={styles.title}>지금 화제의 플레이리스트</Text>
      <FlingGestureHandler
        key="left"
        direction={Directions.LEFT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === playlists.length - 1) return;
            setActiveIndex(index + 1);
          }
        }}
      >
        <FlingGestureHandler
          key="right"
          direction={Directions.RIGHT}
          onHandlerStateChange={(ev) => {
            if (ev.nativeEvent.state === State.END) {
              if (index === 0) return;
              setActiveIndex(index - 1);
            }
          }}
        >
          <FlatList
            data={playlists}
            keyExtractor={(_, index) => String(index)}
            horizontal
            bounces={false}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
            }}
            CellRendererComponent={({ item, index, children, style, ...props }) => {
              const newStyle = [style, { zIndex: playlists.length - index }];
              return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            style={{ height: 240 * tmpWidth }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [35, 0, -500],
              });
              const translateY = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [-4, 0, 0],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.9, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });
              const { _id, postUserId, image, postUserId: postUser, title, hashtag } = item;
              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: -350 / 2,
                    transform: [
                      {
                        translateX,
                      },
                      {
                        translateY,
                      },
                      {
                        scale,
                      },
                    ],
                    opacity,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => onClickPlaylist(_id, postUserId)}
                  >
                    <Image source={{ uri: image }} style={styles.playlistImg} />
                    <View style={styles.flexRow}>
                      <ProfileImage img={postUser.profileImage} imgStyle={styles.profileImg} />
                      <Text style={styles.name}>{postUser.name}</Text>
                    </View>
                    <View style={styles.footer}>
                      <Text style={styles.footerTitle}>{title}</Text>
                      <Text style={styles.hashtag}>{hashtag.map((item) => `#${item} `)}</Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
        </FlingGestureHandler>
      </FlingGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16 * tmpWidth,
    fontWeight: '700',
    marginTop: 22 * tmpWidth,
    paddingLeft: 18 * tmpWidth,
  },
  playlistImg: {
    width: 306 * tmpWidth,
    height: 218 * tmpWidth,
    borderRadius: 4 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 12 * tmpWidth,
    top: 12 * tmpWidth,
  },
  profileImg: {
    width: 20 * tmpWidth,
    height: 20 * tmpWidth,
    borderRadius: 20 * tmpWidth,
    marginRight: 6 * tmpWidth,
  },
  name: {
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
    color: '#ffffff',
  },
  footer: {
    position: 'absolute',
    bottom: 12 * tmpWidth,
    right: 12 * tmpWidth,
  },
  footerTitle: {
    fontSize: 14 * tmpWidth,
    fontWeight: '500',
    color: '#ffffff',
  },
  hashtag: {
    color: '#ffffff',
    fontSize: 12 * tmpWidth,
    fontWeight: '400',
    textAlign: 'right',
  },
});

export default RecentPlaylists;
