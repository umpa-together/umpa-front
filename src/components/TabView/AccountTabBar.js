import React from 'react';
import { Text } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { MAIN_COLOR, COLOR_6, COLOR_1 } from 'constants/colors';

export default function AccountTabBar({ props }) {
  const indicatorStyle = {
    backgroundColor: MAIN_COLOR,
    height: 3 * SCALE_HEIGHT,
  };
  const indicatorContainerStyle = {
    marginTop: 44 * SCALE_WIDTH,
    backgroundColor: COLOR_6,
    height: 3 * SCALE_HEIGHT,
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
      renderLabel={({ route }) => <Text style={labelStyle}>{route.title}</Text>}
    />
  );
}
