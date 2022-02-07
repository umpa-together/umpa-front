import React, { useContext, useEffect, useState } from 'react';
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
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Context as RelayContext } from 'context/Relay';
import style from 'constants/styles';
import SwipeCard from 'components/Relay/SwipeCard';
import { useTrackPlayer } from 'providers/trackPlayer';
import Background from 'components/Relay/Background';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import AddedModal from 'components/Modal/AddedModal';
import { useModal } from 'providers/modal';

export default function Swipe() {
  const { state, likeRelaySong, unlikeRelaySong } = useContext(RelayContext);
  const { addtracksong } = useTrackPlayer();
  const translateX = useSharedValue(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const hiddentranslateX = 600;
  const rotate = useDerivedValue(() => `${interpolate(translateX.value, [0, 600], [0, 60])}deg`);
  const nextScale = useDerivedValue(() =>
    interpolate(translateX.value, [-300, -200, 0, 200, 300], [1, 1, 0.9, 1, 1]),
  );
  const opacityright = useDerivedValue(() =>
    interpolate(translateX.value, [0, 100, 300], [0, 1, 1]),
  );
  const opacityleft = useDerivedValue(() =>
    interpolate(translateX.value, [-300, -100, 0], [1, 1, 0]),
  );
  const { addedModal } = useModal();

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

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: nextScale.value,
      },
    ],
  }));

  const textboxopacityright = useAnimatedStyle(() => ({
    opacity: opacityright.value,
  }));

  const textboxopacityleft = useAnimatedStyle(() => ({
    opacity: opacityleft.value,
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
      if (Math.abs(event.translationX) < 180) {
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

  const onPressLike = async () => {
    translateX.value = withTiming(hiddentranslateX, {
      duration: 400,
    });
    setTimeout(() => {
      setCurrentIdx(currentIdx + 1);
    }, 400);
  };

  const onPressUnlike = () => {
    translateX.value = withTiming(-hiddentranslateX, {
      duration: 400,
    });
    setTimeout(() => {
      setCurrentIdx(currentIdx + 1);
    }, 400);
  };

  useEffect(() => {
    translateX.value = 0;
    if (state.swipeSongs[currentIdx]) {
      addtracksong({ data: state.swipeSongs[currentIdx].song });
    }
  }, [currentIdx]);

  useEffect(() => {
    if (isEnd) {
      const targetId = state.swipeSongs[currentIdx]._id;
      if (translateX.value < 0) {
        unlikeRelaySong({ id: targetId });
      } else {
        likeRelaySong({ id: targetId });
      }
      setTimeout(() => {
        setCurrentIdx(currentIdx + 1);
      }, 400);
    }
  }, [isEnd]);

  return (
    <View>
      <Background />
      {state.swipeSongs && (
        <GestureHandlerRootView>
          {state.swipeSongs[currentIdx + 1] && (
            <Animated.View style={[nextCardStyle, { position: 'absolute' }]}>
              <SwipeCard card={state.swipeSongs[currentIdx + 1]} />
            </Animated.View>
          )}
          {state.swipeSongs[currentIdx] && (
            <PanGestureHandler onGestureEvent={gestureHandler}>
              <Animated.View style={cardStyle}>
                <SwipeCard card={state.swipeSongs[currentIdx]} />
              </Animated.View>
            </PanGestureHandler>
          )}
        </GestureHandlerRootView>
      )}
      {addedModal && (
        <AddedModal
          title="1곡을 저장한 곡 목록에 담았습니다."
          customContainer={styles.addedModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  songImg: {
    width: '100%',
    height: 350,
  },
  addedModal: {
    bottom: -60,
  },
});
