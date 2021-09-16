import React, { useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';
import { useSearch } from '../../providers/search';
import { tmpWidth } from 'components/FontNormalize';

export default SearchOption = () => {
    const { initPlaylist } = useContext(SearchPlaylistContext)
    const { searchOption, setSearchOption, textRef, setText, setIsHint } = useSearch()
    const optionLists = ['계정', '곡, 아티스트', '해시태그']
    const searchLists = ['DJ', 'Song', 'Hashtag']

    const onClickOption = (index) => {
        setSearchOption(searchLists[index])
        textRef.current.clear()
        setText('')
        setIsHint(true)
        initPlaylist()
    }

    return (
        <View style={styles.flexRow}>
            {optionLists.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={Math.random()}
                        onPress={() => onClickOption(index)}
                        style={searchLists[index] === searchOption ? [styles.box, styles.active] : styles.box}
                    >
                        <Text style={searchLists[index] === searchOption ? styles.activeText : styles.text}>{item}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles=StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18 * tmpWidth,
        marginTop: 16 * tmpWidth
    },
    box: {
        paddingLeft: 19 * tmpWidth,
        paddingRight: 19 * tmpWidth,
        paddingTop: 7 * tmpWidth,
        paddingBottom: 7 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        borderColor: '#8bc0ff',
        borderWidth: 1 * tmpWidth,
        marginRight: 10 * tmpWidth
    },
    active: {
        backgroundColor: '#8bc0ff',
    },
    text: {
        color: '#8bc0ff'
    },
    activeText: {
        color: 'white'
    }
})