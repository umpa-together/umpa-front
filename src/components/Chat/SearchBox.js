import React from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { useChat } from 'providers/chat';

const SearchBox = ({ setSearch }) => {
  const { setText, textRef } = useChat();

  const onChangeText = (text) => {
    textRef.current.value = text;
    setText(text);
    if (text) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  };

  return (
    <View style={styles.inputbox}>
      <View style={styles.flexRow}>
        <Image source={require('assets/icons/mainSearch.png')} style={styles.icon} />
        <TextInput
          ref={textRef}
          onChangeText={(text) => onChangeText(text)}
          placeholder="검색"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          placeholderTextColor="#8bc0ff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputbox: {
    width: 339 * tmpWidth,
    height: 40 * tmpWidth,
    backgroundColor: '#ffffff',
    borderRadius: 10 * tmpWidth,
    borderWidth: 1.5 * tmpWidth,
    borderColor: '#8bc0ff',
    justifyContent: 'center',
    marginLeft: 18 * tmpWidth,
    marginTop: 4 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    color: 'rgba(139,192,255,0.5)',
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
  },
  icon: {
    width: 34 * tmpWidth,
    height: 34 * tmpWidth,
  },
  textInput: {
    width: 250 * tmpWidth,
  },
});

export default SearchBox;
