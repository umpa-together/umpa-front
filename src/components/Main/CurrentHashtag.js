import React, { useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { navigate } from 'navigationRef';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';

export default CurrentHashtag = ({ hashtag }) => {
    const { SearchHashtag } = useContext(SearchPlaylistContext);

    const onClickHashtag = (item) => {
        navigate('SelectedHashtag', {data: item, text: item.hashtag, searchOption: 'Hashtag'})
        SearchHashtag({ object: item.hashtag })
    }

    return (
        <FlatList 
            data={hashtag}
            keyExtractor={hashtag=>hashtag._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
                const hashtag = item.hashtag
                return (
                    <TouchableOpacity
                        onPress={() => onClickHashtag(item)}
                    >
                        <Text style={styles.hashtagbox}>#{hashtag}</Text>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

const styles=StyleSheet.create({
    hashtagbox:{
        borderWidth: 1 * tmpWidth,
        borderColor:'rgb(169,193,255)',
        borderRadius:16 * tmpWidth,
        color:'rgb(169,193,255)',
        paddingTop: 7 * tmpWidth,
        paddingBottom:7 * tmpWidth,
        paddingRight: 10 * tmpWidth,
        paddingLeft: 10 * tmpWidth,
        marginRight:8 * tmpWidth,
        marginBottom:12 * tmpWidth
    },
})