import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { goBack } from 'lib/utils/navigation';
import style from 'constants/styles';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';

const Header = ({ headerStyle, title, titleStyle, back, landings = [], actions = [] }) => {
  const onClickBack = () => {
    goBack();
  };
  return (
    <View style={[styles.container, style.flexRow, style.space_between, headerStyle]}>
      <View style={styles.landings}>
        {landings.length > 0
          ? landings.map((landing) => {
              return <View key={Math.random()}>{landing}</View>;
            })
          : back && (
              <TouchableOpacity onPress={onClickBack} style={styles.back} activeOpacity={0.9}>
                <Icon source={require('public/icons/back-40.png')} style={style.icons} />
              </TouchableOpacity>
            )}
      </View>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <View style={styles.actions}>
        {actions.map((action) => {
          return <View key={Math.random()}>{action}</View>;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48 * SCALE_HEIGHT,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    width: '100%',
  },
  landings: {
    position: 'absolute',
    left: 15 * SCALE_WIDTH,
    zIndex: 99,
    flexDirection: 'row',
  },
  actions: {
    position: 'absolute',
    right: 15 * SCALE_WIDTH,
    zIndex: 99,
    flexDirection: 'row',
  },
  back: {
    left: -15 * SCALE_WIDTH,
  },
});

export default Header;
