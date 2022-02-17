/* eslint-disable no-nested-ternary */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useDerivedValue,
  interpolate,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Context as RelayContext } from 'context/Relay';
import { Context as UserContext } from 'context/User';
import SwipeCard from 'components/Relay/SwipeCard';
import { useTrackPlayer } from 'providers/trackPlayer';
import Background from 'components/Relay/Background';
import { SCALE_HEIGHT } from 'lib/utils/normalize';
import AddedModal from 'components/Modal/AddedModal';
import { useModal } from 'providers/modal';
import RecommendButton from 'components/Relay/RecommendButton';
import HarmfulModal from 'components/Modal/HarmfulModal';
import { useFocusEffect } from '@react-navigation/native';
import GuideModal from 'components/Modal/GuideModal';

export default function Swipe() {
  const {
    state: { selectedRelay, swipeSongs },
    likeRelaySong,
    unlikeRelaySong,
    getCurrentRelay,
  } = useContext(RelayContext);
  const {
    state: { user },
  } = useContext(UserContext);
  const { addTrackSong, stopTrackSong } = useTrackPlayer();
  const translateX = useSharedValue(0);
  const { _id: playlistId, image, evaluateUserId, representSong } = selectedRelay.playlist;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [like, setLike] = useState(false);
  const [firstView, setFirstView] = useState(true);

  const hiddentranslateX = 800;
  const rotate = useDerivedValue(() => `${interpolate(translateX.value, [0, 600], [0, 60])}deg`);

  const { addedModal, guideModal, setGuideModal } = useModal();

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
      runOnJS(setIsEnd)(false);
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event, context) => {
      if (Math.abs(event.translationX) < 140) {
        translateX.value = 0;
        context.startX = translateX.value;
        return;
      }
      if (event.translationX > 0) {
        translateX.value = withTiming(hiddentranslateX, {
          duration: 400,
        });
      } else {
        translateX.value = withTiming(-hiddentranslateX, {
          duration: 400,
        });
      }
      runOnJS(setIsEnd)(true);
    },
  });

  useEffect(() => {
    translateX.value = 0;
    if (swipeSongs[currentIdx]) {
      const { contentRating } = swipeSongs[currentIdx].song.attributes;
      if (contentRating !== 'explicit') {
        addTrackSong(swipeSongs[currentIdx].song);
      }
    }
  }, [currentIdx]);

  useEffect(() => {
    if (isEnd) {
      const targetId = swipeSongs[currentIdx]._id;
      if (like) {
        likeRelaySong({ id: targetId });
      } else {
        unlikeRelaySong({ id: targetId });
      }
      setLike(false);
      stopTrackSong();
      setTimeout(() => {
        setCurrentIdx(currentIdx + 1);
      }, 400);
    }
  }, [isEnd]);

  useEffect(() => {
    setFirstView(!evaluateUserId.includes(user._id));
    return () => {
      stopTrackSong();
      getCurrentRelay();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (firstView) {
        addTrackSong(representSong);
      } else if (swipeSongs[currentIdx]) {
        addTrackSong(swipeSongs[currentIdx].song);
      }
    }, [currentIdx, firstView]),
  );

  useEffect(() => {
    if (user && !user.guide.swipe) {
      setGuideModal('swipe');
    }
  }, [user]);

  const representCard = {
    postUserId: {
      name: '첫 곡',
      profileImage: 'https://umpa.s3.ap-northeast-2.amazonaws.com/dev/icons/main1-icon.png',
    },
    song: representSong,
    playlistId,
  };

  return (
    <View>
      <Background />
      {firstView ? (
        <View>
          <SwipeCard image={image} card={representCard} like={like} setLike={setLike} />
        </View>
      ) : (
        swipeSongs.map((item, index) => {
          return (
            <PanGestureHandler key={item._id} onGestureEvent={gestureHandler}>
              <Animated.View
                style={[
                  currentIdx === index && cardStyle,
                  currentIdx === index
                    ? styles.topCard
                    : currentIdx === index - 1
                    ? styles.beforeCard
                    : styles.hiddenCard,
                ]}
              >
                <SwipeCard image={image} card={item} like={like} setLike={setLike} />
              </Animated.View>
            </PanGestureHandler>
          );
        })
      )}
      <RecommendButton playlistId={playlistId} firstView={firstView} setFirstView={setFirstView} />
      <GuideModal modal={guideModal === 'swipe'} setModal={setGuideModal} />
      {addedModal && <AddedModal customContainer={styles.addedModal} />}
      <HarmfulModal />
    </View>
  );
}

const styles = StyleSheet.create({
  addedModal: {
    top: 740 * SCALE_HEIGHT,
    zIndex: 100,
  },
  topCard: {
    zIndex: 20,
  },
  beforeCard: {
    zIndex: 10,
  },
  hiddenCard: {
    zIndex: -100,
  },
});
