/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Context as SearchContext } from 'context/SearchContext';
import { Context as UserContext } from 'context/UserContext';
import LoadingIndicator from 'components/LoadingIndicator';
import SongResult from 'components/Account/SongResult';
import SvgUri from 'react-native-svg-uri';
import { useSearch } from 'providers/search';
import { tmpWidth } from 'components/FontNormalize';

const SearchResult = ({ isEdit, songs, setSong }) => {
  const { state, searchsong } = useContext(SearchContext);
  const { state: userState } = useContext(UserContext);
  const { isHint, setIsHint } = useSearch();

  const onClickHint = (item) => {
    searchsong({ songname: item });
    setIsHint(false);
  };

  return (
    <>
      {isHint && state.hint.length === 0 ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.searchContainer}>
            <View style={styles.guideContainer}>
              <SvgUri
                width={24 * tmpWidth}
                height={24 * tmpWidth}
                source={require('assets/icons/musicnote.svg')}
                style={styles.musicIcon}
              />
              <View style={styles.firstLine}>
                <Text style={styles.first}>{userState.myInfo.name}</Text>
                <Text style={styles.second}> 님의 취향의 곡을 등록해주세요</Text>
              </View>
              {isEdit ? (
                <Text style={styles.edit}>(최소 5곡, 최대 7곡)</Text>
              ) : (
                <Text style={styles.notEdit}>(최소 5곡, 최대 7곡)</Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : isHint && state.hint.length !== 0 ? (
        <View style={styles.searchContainer}>
          <FlatList
            style={styles.hintContainer}
            data={state.hint}
            keyExtractor={(term) => term}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onClickHint(item)}>
                <Text style={styles.hint}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : !isHint && state.songData.length === 0 ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.searchContainer}>
          <SongResult songs={songs} setSong={setSong} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgb(250,250,250)',
  },
  guideContainer: {
    marginTop: 114 * tmpWidth,
    alignItems: 'center',
  },
  firstLine: {
    flexDirection: 'row',
    marginTop: 24 * tmpWidth,
    marginBottom: 18 * tmpWidth,
  },
  first: {
    fontSize: 14 * tmpWidth,
    fontWeight: 'bold',
    color: 'rgb(80,80,80)',
  },
  second: {
    fontSize: 14 * tmpWidth,
    color: 'rgb(118,118,118)',
  },
  edit: {
    fontSize: 12 * tmpWidth,
    color: 'rgb(153,153,153)',
  },
  notEdit: {
    fontSize: 12 * tmpWidth,
    color: 'rgb(238,98,92)',
  },
  musicIcon: {
    width: 24 * tmpWidth,
    height: 24 * tmpWidth,
  },
  hintContainer: {
    marginLeft: 24 * tmpWidth,
    marginTop: 20 * tmpWidth,
    flex: 1,
  },
  hint: {
    fontSize: 16 * tmpWidth,
    marginBottom: 24 * tmpWidth,
  },
});

export default SearchResult;
