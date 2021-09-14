import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as SearchContext } from 'context/SearchContext';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';
import { useSearch } from '../../providers/search';
import { tmpWidth } from 'components/FontNormalize';

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
            contentContainerStyle={styles.container}
            renderItem={({item}) => {
                const { hashtag, playlistId: playlist, dailyId: daily } = item
                return (
                    <TouchableOpacity
                        onPress={() => onClickHint(hashtag)}
                        style={styles.box}
                    >
                        <View style={styles.hintArea}>
                            <Text style={styles.hint} numberOfLines={1}>{'# ' + hashtag}</Text>
                        </View>
                        <Text style={styles.length}>{playlist.length + daily.length}개 게시물</Text>
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
        paddingRight: 18 * tmpWidth,
        justifyContent: 'space-between'
    },
    hintArea: {
        width: 270 * tmpWidth,
    },
    hint: {
        fontSize: 16 * tmpWidth,
        fontWeight: '400'
    },
    length: {
        fontSize: 12 * tmpWidth,
        fontWeight: '300',
        color: '#505050'
    }
})