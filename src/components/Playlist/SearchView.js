import React from 'react'
import { View, StyleSheet } from 'react-native'
import { usePlaylist } from 'providers/playlist'
import MyArchiveLists from './MyArchiveLists'
import SongHint from './SongHint'
import SongResult from './SongResult'
import { useSearch } from 'providers/search';

export default SearchView = () => {
    const { isArchive } = usePlaylist()
    const { isHint } = useSearch()

    return (
        <View style={styles.container}>
            { isArchive ? <MyArchiveLists /> : 
            <>
                { isHint ? <SongHint /> : <SongResult /> }
            </> }
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1.5
    }
})