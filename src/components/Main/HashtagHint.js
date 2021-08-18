import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as SearchContext } from 'context/SearchContext';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';
import { useSearch } from '../../providers/search';
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';

export default HashtagHint = () => {
    const { state: searchState } = useContext(SearchContext);
    const { SearchHashtagAll } = useContext(SearchPlaylistContext);
    const { setIsHint } = useSearch()

    const onClickHint = (hashtag) => {
        SearchHashtagAll({ term: hashtag  })
        setIsHint(false)
    }

    return (
        <FlatList 
            keyboardShouldPersistTaps="handled"
            data={searchState.hashtagHint}
            keyExtractor={term => term._id}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity
                        onPress={() => onClickHint(item.hashtag)}
                        style={styles.box}
                    >
                        <View style={styles.hintArea}>
                            <Text style={styles.hint} numberOfLines={1}>{'# ' + item.hashtag}</Text>
                        </View>
                        <SvgUri width={32 * tmpWidth} height={32 * tmpWidth} source={require('assets/icons/leftup.svg')} />
                    </TouchableOpacity>
                )
            }}
        
        />
    )
}

const styles=StyleSheet.create({
    box: {
        height: 32 * tmpWidth, 
        paddingLeft: 24 * tmpWidth, 
        marginTop: 21.5 * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center',
    },
    hintArea: {
        width:304 * tmpWidth
    },
    hint: {
        fontSize:16 * tmpWidth
    }
})