import React, { useState } from 'react'
import { TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native'
import { SongImageBack } from 'components/SongImage'
import { tmpWidth } from 'components/FontNormalize'
import SongStory from 'components/SongStory'

export default MusicArchive = ({ archive }) => {
    const [archiveModal, setArchiveModal] = useState(false)
    const [story, setStory] = useState(null)
    const onClickArchive = (songs) => {
        setArchiveModal(true)
        setStory(songs)
    }

    return (
        <>
            <FlatList 
                data={archive}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={community => community._id._id}
                renderItem={({item}) => {
                    const { songs, _id: board } = item
                    const backgroundImg = songs[0].attributes.artwork.url
                    return (
                        <TouchableOpacity 
                            style={styles.archiveBox}
                            onPress={() => onClickArchive(songs)}
                        >
                            <SongImageBack url={backgroundImg} width={120} height={150} border={8} opac={0.8} />
                            <Text style={styles.name} numberOfLines={1}>{board.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            {archiveModal && <SongStory setArchiveModal={setArchiveModal} songs={story} />}
        </>
    )
}

const styles=StyleSheet.create({
    archiveBox: {
        width: 120 * tmpWidth,
        height: 150 * tmpWidth,
        borderRadius: 8 * tmpWidth,
        marginRight: 8 * tmpWidth,
    },
    name: {
        position: 'absolute',
        bottom: 5 * tmpWidth,
        left: 5 * tmpWidth
    }
})