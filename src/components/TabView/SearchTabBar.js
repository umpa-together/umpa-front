import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_7, COLOR_6, COLOR_1 } from 'constants/colors';

export default function SearchTabBar({ props }) {
  const indicatorStyle = {
    backgroundColor: COLOR_7,
    height: 2 * SCALE_HEIGHT,
  };
  const indicatorContainerStyle = {
    marginTop: 45 * SCALE_WIDTH,
    backgroundColor: COLOR_6,
    height: 2 * SCALE_HEIGHT,
  };
  const labelStyle = {
    fontSize: FS(14),
    color: COLOR_1,
  };
  return (
    <TabBar
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      indicatorStyle={indicatorStyle}
      indicatorContainerStyle={indicatorContainerStyle}
      style={{
        backgroundColor: '#fff',
      }}
      tabStyle={{ width: 'auto', paddingHorizontal: 20 * SCALE_WIDTH }}
      scrollEnabled
      bounces={false}
      renderLabel={({ route, focused }) => (
        <Text style={[labelStyle, focused && styles.focusText]}>{route.title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  focusText: {
    color: COLOR_7,
  },
});
