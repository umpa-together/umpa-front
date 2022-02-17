import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import style from 'constants/styles';
import { SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import Text from 'components/Text';

export default memo(function MoveText({
  container,
  text,
  isMove,
  isExplicit,
  textStyle,
  center,
  iconCustom,
}) {
  return (
    <View style={container}>
      <View style={[style.flexRow, center && styles.center]}>
        {isExplicit && (
          <Icon
            source={require('public/icons/19-notice.png')}
            style={[styles.explicit, iconCustom]}
          />
        )}
        {isMove ? (
          <TextTicker
            duration={7000}
            bounce={false}
            marqueeDelay={1000}
            style={textStyle}
            allowFontScaling={false}
          >
            {text}
          </TextTicker>
        ) : (
          <Text style={textStyle} numberOfLines={1}>
            {text}
          </Text>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  explicit: {
    width: 20 * SCALE_WIDTH,
    height: 20 * SCALE_WIDTH,
    left: -4 * SCALE_WIDTH,
  },
  center: {
    justifyContent: 'center',
  },
});
