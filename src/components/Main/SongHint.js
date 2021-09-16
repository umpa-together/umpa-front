import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as SearchContext } from 'context/SearchContext';
import { useSearch } from '../../providers/search';
import { tmpWidth } from 'components/FontNormalize';

export default SongHint = () => {
    const { state: searchState, searchsong } = useContext(SearchContext);
    const { setIsHint } = useSearch()

    const onClickHint = (hint) => {
        searchsong({ songname: hint })
        setIsHint(false)
    }

    return (
        <FlatList 
            keyboardShouldPersistTaps="handled"
            data={searchState.hint}
            keyExtractor={term => term}
            contentContainerStyle={styles.container}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity
                        onPress={() => onClickHint(item)}
                        style={styles.box}
                    >
                        <View style={styles.hintArea}>
                            <Text style={styles.hint} numberOfLines={1}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }}
        
        />
    )
}

const styles=StyleSheet.create({
    container: {
        paddingTop: 22 * tmpWidth
    },
    box: {
        height: 37 * tmpWidth, 
        paddingLeft: 18 * tmpWidth, 
        flexDirection: 'row',
        alignItems: 'center',
    },
    hintArea: {
        width: 330 * tmpWidth,
    },
    hint: {
        fontSize: 16 * tmpWidth,
        fontWeight: '400'
    }
})