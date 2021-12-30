import React, { useContext } from 'react';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { Context as AppleMusicContext } from 'context/AppleMusic';
import { useSearch } from 'providers/search';
import LoadingIndicator from 'components/LoadingIndicator';

export default function HintLists() {
  const { state } = useContext(AppleMusicContext);
  const { onSearchKeyword } = useSearch();

  return (
    <>
      {state.hint ? (
        <FlatList
          data={state.hint}
          keyExtractor={(hint) => hint}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => onSearchKeyword(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}
