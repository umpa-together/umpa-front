import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSearch } from '../../providers/search';

export default SearchOption = () => {
    const { searchOption, setSearchOption, textRef, setText } = useSearch()
    const optionLists = ['곡, 아티스트', '계정', '해시태그']
    const searchLists = ['Song', 'DJ', 'Hashtag']

    const onClickOption = (index) => {
        setSearchOption(searchLists[index])
        textRef.current.clear()
        setText('')
    }

    return (
        <View style={styles.flexRow}>
            {optionLists.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={item}
                        onPress={() => onClickOption(index)}
                        style={searchLists[index] === searchOption ? styles.activeBox : styles.box}
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
        alignItems: 'center'
    },
    box: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#a9c1ff'
    },
    activeBox: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#a9c1ff',
        borderColor: '#a9c1ff'
    },
    text: {
        color: '#a9c1ff'
    },
    activeText: {
        color: 'white'
    }
})