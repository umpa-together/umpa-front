import React, { createContext, useContext, useState, useRef } from 'react';
import {
  useAnimatedRef,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedReaction,
  scrollTo,
} from 'react-native-reanimated';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

const SONG_HEIGHT = 50 * SCALE_WIDTH;
const SCROLL_HEIGHT_THRESHOLD = 10;
const MARGIN_BOTTOM = 14 * SCALE_HEIGHT;
const INIT_MARGIN_TOP = 13 * SCALE_HEIGHT;
const INIT_MARGIN_LEFT = 18 * SCALE_WIDTH;

const TOTAL_HEIGHT = SONG_HEIGHT + MARGIN_BOTTOM;
const CORRECTION = 20 * SCALE_HEIGHT;
const CORRECTION_WIDTH = 20 * SCALE_WIDTH;

const IMAGE_WIDTH = 90 * SCALE_WIDTH;
const MARGIN_RIGHT = 12 * SCALE_WIDTH;
const TOTAL_WIDTH = IMAGE_WIDTH + MARGIN_RIGHT;

const ScrollContext = createContext(null);

export const useScroll = () => useContext(ScrollContext);

export default function ScrollProvider({ children }) {
  const listToObject = (list) => {
    const object = {};
    Object.values(list).forEach((song, index) => {
      object[song.id] = index;
    });
    return object;
  };

  const listToObjectImg = (list) => {
    const object = {};
    Object.values(list).forEach((image, index) => {
      object[image.uri] = index;
    });
    return object;
  };

  const positions = useRef(useSharedValue(listToObject([])));
  const scrollY = useSharedValue(0);
  const scrollX = useSharedValue(0);
  const scrollViewRef = useAnimatedRef();
  const outsideScrollViewRef = useAnimatedRef();
  const scrollOutsideY = useSharedValue(0);
  const [topOffset, setTopOffset] = useState(0);
  const [leftOffset, setLeftOffset] = useState(0);

  // update scroll view location by using shared value
  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false),
  );

  const arraySort = (songs, setSongs) => {
    const result = [];
    Object.keys(positions.current.value).forEach((position) => {
      result[positions.current.value[position]] =
        songs[songs.findIndex((item) => item.id === position)];
    });
    setSongs(result);
    return result;
  };

  const arraySortImage = (images, setImages) => {
    const result = [];
    Object.keys(positions.current.value).forEach((position) => {
      result[positions.current.value[position]] =
        images[images.findIndex((item) => item.uri === position)];
    });
    setImages(result);
    return result;
  };

  const onLayoutScroll = ({ initRender, song }) => {
    if (song && !initRender) {
      scrollViewRef.current.measure((x, y, width, height, pagex, pagey) => {
        setTopOffset(pagey);
        setLeftOffset(pagex);
      });
    }
    if (!song) {
      scrollViewRef.current.measure((x, y, width, height, pagex, pagey) => {
        setTopOffset(pagey);
        setLeftOffset(pagex);
      });
    }
  };

  const updatePosition = (songs) => {
    positions.current.value = listToObject(songs);
  };

  const updatePositionImg = (images) => {
    positions.current.value = listToObjectImg(images);
  };

  // set scrolly value accrroding scroll offset
  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    scrollX.value = event.contentOffset.x;
  });

  const handleOutsideScroll = (event) => {
    scrollOutsideY.value = event.nativeEvent.contentOffset.y;
  };

  // give position in range song length
  const clamp = (value, lowerBound, upperBound) => {
    'worklet';

    return Math.max(lowerBound, Math.min(value, upperBound));
  };

  // switch location
  const objectMove = (object, from, to) => {
    'worklet';

    const newObject = { ...object };
    Object.keys(object).forEach((position) => {
      if (object[position] === from) {
        newObject[position] = to;
      }
      if (object[position] === to) {
        newObject[position] = from;
      }
    });
    return newObject;
  };

  const value = {
    SONG_HEIGHT,
    TOTAL_WIDTH,
    SCROLL_HEIGHT_THRESHOLD,
    INIT_MARGIN_TOP,
    INIT_MARGIN_LEFT,
    TOTAL_HEIGHT,
    CORRECTION,
    CORRECTION_WIDTH,
    IMAGE_WIDTH,
    scrollY,
    scrollX,
    scrollViewRef,
    scrollOutsideY,
    outsideScrollViewRef,
    topOffset,
    leftOffset,
    positions,
    updatePosition,
    updatePositionImg,
    handleScroll,
    onLayoutScroll,
    handleOutsideScroll,
    arraySort,
    arraySortImage,
    clamp,
    objectMove,
  };

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}
