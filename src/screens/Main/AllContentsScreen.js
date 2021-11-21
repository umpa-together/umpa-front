import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import StatusBarHeight from 'components/StatusBarHeight';
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import AllPlaylistForm from 'components/Main/AllPlaylistForm';
import AllUsersForm from 'components/Main/AllUsersForm';
import AllDailyForm from 'components/Main/AllDailyForm';
import { goBack } from 'lib/utils/navigation';

const AllContentsScreen = ({ route }) => {
  const { type } = route.params;
  const contentsForm = {
    플레이리스트: <AllPlaylistForm />,
    유저: <AllUsersForm />,
    데일리: <AllDailyForm />,
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.back} onPress={goBack}>
          <SvgUri width="40" height="40" source={require('assets/icons/back.svg')} />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {type} 둘러보기
        </Text>
      </View>
      <View style={styles.container}>{contentsForm[type]}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'rgb(255,255,255)',
    height: (48 + StatusBarHeight) * tmpWidth,
    paddingTop: StatusBarHeight * tmpWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 5 * tmpWidth,
    top: (2 + StatusBarHeight) * tmpWidth,
  },
  title: {
    fontSize: 16 * tmpWidth,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default AllContentsScreen;
