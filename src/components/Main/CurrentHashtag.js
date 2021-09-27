import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Context as SearchContext } from 'context/SearchContext';
import { tmpWidth } from 'components/FontNormalize';
import { navigate } from 'navigationRef';
import SvgUri from 'react-native-svg-uri';

export default CurrentHashtag = ({ hashtag }) => {
    const { currentHashtag } = useContext(SearchContext);

    const onClickHashtag = (item) => {
        navigate('SelectedHashtag', { data: item })
    }

    const onClickRefresh = () => {
        currentHashtag()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.icon}
                onPress={onClickRefresh}
            >
                <SvgUri source={require('assets/icons/hashtagRefresh.svg')} />
            </TouchableOpacity>
            <FlatList 
                data={hashtag}
                keyExtractor={hashtag=>hashtag._id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.padding}
                renderItem={({item}) => {
                    const hashtag = item.hashtag
                    return (
                        <TouchableOpacity
                            onPress={() => onClickHashtag(item)}
                            style={styles.box}
                        >
                            <Text style={styles.text}>#{hashtag}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        marginTop: 20 * tmpWidth, 
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18 * tmpWidth
    },
    padding: {
        paddingRight: 10 * tmpWidth
    },
    box:{
        borderRadius: 100 * tmpWidth,
        marginRight: 8 * tmpWidth,
        backgroundColor: '#8bc0ff',
    },
    text: {
        color:'#ffffff',
        paddingTop: 7 * tmpWidth,
        paddingBottom: 7 * tmpWidth,
        paddingRight: 10 * tmpWidth,
        paddingLeft: 10 * tmpWidth,
    },
    icon: {
        width: 30 * tmpWidth,
        height: 30 * tmpWidth,
        marginRight: 6 * tmpWidth
    }
})