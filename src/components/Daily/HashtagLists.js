import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';
import { tmpWidth } from 'components/FontNormalize';

export default HashtagLists = ({ hashtag, setHashtag }) => {
    const { SearchHashtag } = useContext(SearchPlaylistContext);

    return (
        <View style={styles.container}>
            {hashtag.map(item => {
                return (
                    <TouchableOpacity 
                        style={styles.hashtagView} 
                        key={item} 
                        onPress={async() => {
                            setHashtag(item)
                            SearchHashtag({ object: item })
                        }}
                    >
                        <Text style={styles.hashtagBox}>{'#' + item}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flexDirection: 'row', 
        paddingLeft: 18 * tmpWidth, 
        marginTop: 16 * tmpWidth,
        flexWrap: 'wrap'
    },
    hashtagView: {
        borderWidth: 1 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        borderColor: '#8bc0ff',
        marginRight: 7.8 * tmpWidth,
    },
    hashtagBox: {
        fontSize: 12 * tmpWidth,
        color: '#8bc0ff',
        paddingLeft: 10 * tmpWidth,
        paddingRight: 10 * tmpWidth,
        paddingTop: 5 * tmpWidth,
        paddingBottom: 5 * tmpWidth,
    }
})