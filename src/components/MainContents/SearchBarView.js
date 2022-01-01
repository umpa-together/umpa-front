import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { navigate } from 'lib/utils/navigation';

export default function SearchBarView() {
  const onClickBar = () => {
    navigate('SearchDetail');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onClickBar}>
      <Text>검색으로 </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});
