import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal';
import { SongImageBack } from './SongImage'
import { useTrackPlayer } from 'providers/trackPlayer';
import HarmfulModal from './HarmfulModal';

export default SongStory = ({ songs, setArchiveModal }) => {
    const [currentSong, setCurrentSong] = useState(songs[0])
    const { addtracksong, stoptracksong } = useTrackPlayer()
    const [index, setIndex] = useState(0)
    const [harmfulModal, setHarmfulModal] = useState(false);

    const onClose = () => {
        setArchiveModal(false)
        stoptracksong()
    }

    const onClickPrevious = () => {
        if(index === 0) return
        setCurrentSong(songs[index-1])
        setIndex((prev) => prev-1)
        addtracksong({ data: songs[index-1] })
    }

    const onClickNext = () => {
        if(index === songs.length - 1)  return
        setCurrentSong(songs[index+1])
        setIndex((prev) => prev+1)
        addtracksong({ data: songs[index+1] })
    }

    useEffect(() => {
        addtracksong({ data: currentSong })
    }, [])

    return (
        <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={true}
            onBackdropPress={onClose}
            backdropOpacity={0.4}
            style={{margin: 0, zIndex: 97}}
        >
            <TouchableOpacity onPress={onClose} style={{zIndex: 98}}>
                <Text style={styles.exit}>나가기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClickPrevious} style={{zIndex: 98}}>
                <Text style={styles.before}>이전</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClickNext} style={{zIndex: 98}}>
                <Text style={styles.next}>다음</Text>
            </TouchableOpacity>
            <SongImageBack url={currentSong.attributes.artwork.url} width={375} height={812} opac={1} border={0} />
            { harmfulModal && <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> }
        </Modal>
    )
}

const styles=StyleSheet.create({
    container: {
        width: '100%',
        height: 875,
        backgroundColor: 'black'
    },
    exit: {
        position: 'absolute',
        top: 100,
        color: 'white',
    },
    before: {
        position: 'absolute',
        top: 100,
        left: 150,
        color: 'white',
    }, 
    next: {
        position: 'absolute',
        top: 100,
        color: 'white',
        left: 300,
    }
})