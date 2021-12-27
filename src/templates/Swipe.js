import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

const data = [
  { value: 1, color: 'red' },
  { value: 2, color: 'green' },
  { value: 3, color: 'blue' },
  { value: 4, color: 'yellow' },
  { value: 5, color: 'white' },
];

const Swipe = () => {
  const translateX = useSharedValue(0);
  const [currentindex, setCurrentindex] = useState(0);
  const currentProfile = data[currentindex];
  const [nextindex, setNextindex] = useState(currentindex + 1);
  const [endcheck, setEndCheck] = useState(false);
  const nextProfile = data[nextindex];
  const hiddentranslateX = 600;
  const rotate = useDerivedValue(() => `${interpolate(translateX.value, [0, 600], [0, 60])}deg`);
  const nextscale = useDerivedValue(() =>
    interpolate(translateX.value, [-300, -200, 0, 200, 300], [1, 1, 0.9, 1, 1]),
  );
  const opacityright = useDerivedValue(() =>
    interpolate(translateX.value, [0, 100, 300], [0, 1, 1]),
  );
  const opacityleft = useDerivedValue(() =>
    interpolate(translateX.value, [-300, -100, 0], [1, 1, 0]),
  );

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

  const nextcardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: nextscale.value,
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
      runOnJS(setEndCheck)(false);
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
      runOnJS(setEndCheck)(true);
    },
  });

  const onPressLike = async () => {
    translateX.value = withTiming(hiddentranslateX, {
      duration: 400,
    });
    setTimeout(() => {
      setCurrentindex(currentindex + 1);
    }, 400);
  };
  const onPressUnlike = () => {
    translateX.value = withTiming(-hiddentranslateX, {
      duration: 400,
    });
    setTimeout(() => {
      setCurrentindex(currentindex + 1);
    }, 400);
  };

  useEffect(() => {
    translateX.value = 0;
    setNextindex(currentindex + 1);
  }, [currentindex]);
  useEffect(() => {
    if (endcheck === true) {
      setTimeout(() => {
        setCurrentindex(currentindex + 1);
      }, 400);
    }
  }, [endcheck]);
  return (
    <GestureHandlerRootView>
      <View style={{ marginTop: 200, justifyContent: 'center', alignItems: 'center' }}>
        {nextProfile && (
          <Animated.View
            style={[
              style.cardContainer,
              { backgroundColor: nextProfile.color },
              style.absolute,
              nextcardStyle,
            ]}
          >
            <View />
          </Animated.View>
        )}
        {currentProfile && (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
              style={[style.cardContainer, { backgroundColor: currentProfile.color }, cardStyle]}
            >
              <View>
                <Animated.View style={textboxopacityright}>
                  <View style={[style.textbox, style.likelocation]}>
                    <Text>like</Text>
                  </View>
                </Animated.View>
                <Animated.View style={textboxopacityleft}>
                  <View style={[style.textbox, style.unlikelocation]}>
                    <Text>unlike</Text>
                  </View>
                </Animated.View>
              </View>
            </Animated.View>
          </PanGestureHandler>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={onPressLike}>
          <Text>좋아요</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressUnlike}>
          <Text>싫어요</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    width: 330,
    height: 330,
  },
  absolute: {
    position: 'absolute',
  },
  textbox: {
    width: 100,
    height: 50,
    borderWidth: 1,
  },
  likelocation: {
    top: 10,
    left: 200,
    backgroundColor: 'green',
    position: 'absolute',
  },
  unlikelocation: {
    top: 10,
    left: 10,
    backgroundColor: '#EFAAAA',
    position: 'absolute',
  },
});

export default Swipe;
