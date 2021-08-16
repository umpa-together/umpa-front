import React, { useContext } from 'react'
import { Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import {Context as UserContext} from '../../context/UserContext';
import { useStory } from '../../providers/story'
import { tmpWidth } from '../FontNormalize';
import { SongImage } from '../SongImage'

import Modal from 'react-native-modal';
import { useTrackPlayer } from '../../providers/trackPlayer';

import HarmfulModal from '../HarmfulModal';
import SvgUri from 'react-native-svg-uri';

export default StoryModal = () => {
    const { state: userState } = useContext(UserContext);
    const { storyModal, onClose, onClickProfile, currentStory, onClickStory } = useStory()
    const { addtracksong, stoptracksong, isPlayingId } = useTrackPlayer()
    const { story: selectedStory, index: selectedIdx } = currentStory

    const onClickPrevStory = () => {
        onClickStory({ item: userState.otherStory[selectedIdx-1], index: selectedIdx-1 })
    }
    
    const onClickNextStory = () => {
        onClickStory({ item: userState.otherStory[selectedIdx+1], index: selectedIdx+1 })
    }

    return (
        <Modal
            animationIn='fadeInLeft'
            animationOut='fadeOutRight'
            isVisible={storyModal}
            onBackdropPress={onClose}
            backdropOpacity={0.5}
            style={{alignItems: 'center'}}
        >
            {selectedStory &&
            <View style={styles.modalBox}>
                <View style={{flex: 1, margin: 16 * tmpWidth}}>
                    <TouchableOpacity 
                        style={{flexDirection: 'row', alignItems: 'center'}} 
                        onPress={onClickProfile}
                    >
                        { selectedStory.profileImage == undefined ?
                        <View style={styles.profile}>
                           <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                        </View> :
                        <Image style={styles.profile} source={{uri: selectedStory.profileImage}}/> }
                        <Text style={{marginLeft: 12 * tmpWidth}}>{selectedStory.name}</Text>
                    </TouchableOpacity>
                    <View style={styles.modalContainer}>
                        <View style={styles.nextContainer}>
                            {selectedIdx != 0 ?
                            <TouchableOpacity style={styles.nextIcon} onPress={onClickPrevStory}>
                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/modalLeft.svg')}/>
                            </TouchableOpacity> : <View style={styles.nextIcon}/>}
                            <TouchableOpacity onPress={() => {
                                if(isPlayingId == selectedStory.song["song"].id){
                                    stoptracksong()
                                }else{
                                    addtracksong({data: selectedStory.song["song"]})
                                }
                            }}>
                                <SongImage url={selectedStory.song["song"].attributes.artwork.url} size={152} border={152}/>
                                { isPlayingId != selectedStory.song["song"].id ? 
                                <SvgUri width='48' height='48' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 52 * tmpWidth, top: 52 * tmpWidth}}/> :
                                <SvgUri width='48' height='48' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 52 * tmpWidth, top: 52 * tmpWidth}}/> }
                            </TouchableOpacity>
                            <HarmfulModal />
                            {selectedIdx != userState.otherStory.length-1 ?
                            <TouchableOpacity style={styles.nextIcon} onPress={onClickNextStory}>
                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/modalRight.svg')}/>
                            </TouchableOpacity>: <View style={styles.nextIcon}/>}
                        </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.textContainer}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                {selectedStory.song["song"].attributes.contentRating == "explicit" ? 
                                <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                : null }
                                <Text numberOfLines={1} style={styles.modalTitleText}>{selectedStory.song["song"].attributes.name}</Text>
                            </View>
                            <Text numberOfLines={1} style={styles.modalArtistText}>{selectedStory.song["song"].attributes.artistName}</Text>
                        </View>
                    </View>
                </View>
            </View> }
        </Modal>
    )
}

const styles=StyleSheet.create({

    profile: {
        width: 32 * tmpWidth,
        height: 32 * tmpWidth,
        borderRadius: 32 * tmpWidth,
    },
    modalBox: {
        width : 305 * tmpWidth,
        height : 311 * tmpWidth,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 10 * tmpWidth,
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowRadius: 30 * tmpWidth,
        shadowOpacity: 0.3,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15 * tmpWidth
    },
    nextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 152 * tmpWidth,
    },
    nextIcon: {
        width: 36 * tmpWidth,
        height: 52 * tmpWidth
    },
    textContainer: {
        marginTop: 16 * tmpWidth,
        alignItems: 'center',
        width: 190 * tmpWidth,
    },
    modalArtistText: {
        fontSize: 14 * tmpWidth,
        color: 'rgb(133,133,133)',
        marginTop: 8 * tmpWidth,
        marginBottom: 10 * tmpWidth,
    },
    modalTitleText: {
        fontSize: 16 * tmpWidth
    },
    likeIcon: {
        width: 40 * tmpWidth,
        height: 40 * tmpWidth
    }
})