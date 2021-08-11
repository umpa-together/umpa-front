import React from 'react'
import { View, StyleSheet } from 'react-native'
import Header from '../../components/Header';
import LikePlaylists from '../../components/Account/LikePlaylists';
import AddedSongLists from '../../components/Account/AddedSongLists';

const MusicBoxScreen = ({ route }) => {
    const { title } = route.params

    return (
        <View style={styles.container}>
            <Header title={title}/>
            {title == '좋아요한 플레이리스트' ? 
            <LikePlaylists /> : <AddedSongLists /> }
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'rgb(255,255,255)'
    }
})

export default MusicBoxScreen