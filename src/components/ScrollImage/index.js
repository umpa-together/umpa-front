import React, { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import { useScroll } from 'providers/scroll';

export default function ScrollImage({ images, children }) {
  const { positions, scrollViewRef, updatePositionImg, handleScroll, onLayoutScroll, TOTAL_WIDTH } =
    useScroll();
  const [render, setRender] = useState(false);

  useEffect(() => {
    updatePositionImg(images);
    setTimeout(() => {
      setRender(!render);
    }, 20);
  }, [images]);

  return (
    <>
      {images.length <= Object.keys(positions.current.value).length && (
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          onLayout={onLayoutScroll}
          onScroll={handleScroll}
          contentContainerStyle={{
            width: TOTAL_WIDTH * images.length + TOTAL_WIDTH / 2,
          }}
        >
          {children}
        </Animated.ScrollView>
      )}
    </>
  );
}
