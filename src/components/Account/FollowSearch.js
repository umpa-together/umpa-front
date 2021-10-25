import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from 'components/FontNormalize';

const FollowSearch = ({ type, setResult, user }) => {
  const [text, setText] = useState('');

  const filterItem = ({ data }) => {
    if (type === 'following') {
      if (user != null) setResult(user.following.filter((item) => item.name.includes(data)));
    } else if (user != null) setResult(user.follower.filter((item) => item.name.includes(data)));
  };

  const onChangeText = (input) => {
    setText(input);
    filterItem({ data: input });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <View style={styles.rowContainer}>
          <SvgUri
            width="100%"
            height="100%"
            source={require('assets/icons/search.svg')}
            style={styles.icon}
          />
          <TextInput
            style={styles.textArea}
            value={text}
            onChangeText={(input) => onChangeText(input)}
            placeholder={type === 'following' ? '팔로잉 검색' : '팔로워 검색'}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="rgba(153,153,153,0.5)"
          />
        </View>
        <TouchableOpacity style={styles.icon}>
          <SvgUri source={require('assets/icons/resultDelete.svg')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  searchBox: {
    width: 339 * tmpWidth,
    height: 36 * tmpWidth,
    borderRadius: 10 * tmpWidth,
    backgroundColor: 'rgba(153,153,153,0.09)',
    marginTop: 16 * tmpWidth,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12 * tmpWidth,
    paddingRight: 12 * tmpWidth,
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  textArea: {
    marginLeft: 10 * tmpWidth,
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
  },
  icon: {
    width: 25 * tmpWidth,
    height: 25 * tmpWidth,
  },
});

export default FollowSearch;
