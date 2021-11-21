import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import { navigate } from 'lib/utils/navigation';
import LoadingIndicator from '../LoadingIndicator';
import Playlists from './Playlists';
import Daily from './Daily';

const HashtagResult = ({ playlist, daily }) => {
  const optionLists = [
    {
      title: '플레이리스트',
      components: <Playlists playlists={playlist} />,
    },
    {
      title: '데일리',
      components: <Daily daily={daily} />,
    },
  ];

  const onClickMore = (option) => {
    navigate('ContentsMore', { option, playlist, daily });
  };

  return (
    <>
      {daily === null && playlist === null ? (
        <LoadingIndicator />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {optionLists.map(({ title, components }) => (
            <View key={title}>
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={() => onClickMore(title)}>
                  <SvgUri source={require('assets/icons/more.svg')} style={styles.more} />
                </TouchableOpacity>
              </View>
              {components}
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18 * tmpWidth,
    marginBottom: 9 * tmpWidth,
    marginLeft: 18 * tmpWidth,
    marginRight: 6 * tmpWidth,
  },
  title: {
    fontSize: 16 * tmpWidth,
    fontWeight: '700',
  },
  more: {
    width: 30 * tmpWidth,
    height: 30 * tmpWidth,
  },
  container: {
    paddingBottom: 30 * tmpWidth,
  },
});

export default HashtagResult;
