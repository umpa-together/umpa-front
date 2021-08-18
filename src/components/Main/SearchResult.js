import React, { useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';

export default SearchResult = () => {
    const { state } = useContext(SearchPlaylistContext);

    const optionLists = [{
        title: '서퍼',
        lists: state.dj
    }, {
        title: '플레이리스트',
        lists: state.playlists
    }, {
        title: '데일리',
        lists: state.daily
    }]

    return (
        <>
            <Text>전체보기</Text>
            {optionLists.map(({ title, lists }) => {
                return (
                    <>
                        <View style={styles.header}>
                            <Text>{title}</Text>
                            <TouchableOpacity>
                                <Text>{'>'}</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList 
                            horizontal
                            showsHorizontalScrollIndicator={false}                            
                            data={lists.slice(0, 10)}
                            keyExtractor={item=>item._id}
                            renderItem={({item}) => {
                                const image = item.image || item.profileImage
                                return (
                                    <TouchableOpacity>
                                        <Image source={{uri: image}} style={{width: 150 ,height: 150, marginRight: 20}} />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </>
                )
            })}
        </>
    )
}

const styles=StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flexRow: {
        flexDirection: 'row',
    }
})