import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from './FontNormalize';
import Modal from 'react-native-modal';
import { Context as UserContext } from '../context/UserContext';

const Guide = ({type}) => {
    const { state, postGuide } = useContext(UserContext)
    const [guideModal, setGuideModal] = useState(false)
    const onClose = () => {
        postGuide({type})
    };
    useEffect(() => {
        if(type == 'playlist'){
            setGuideModal(!state.myInfo.playlistGuide)
        }else if(type == 'curation'){
            setGuideModal(!state.myInfo.curationGuide)
        }else if(type == 'board'){
            setGuideModal(!state.myInfo.boardGuide)
        }else if(type == 'create'){
            setGuideModal(!state.myInfo.createGuide)
        }
    }, [])
    return (
        <Modal
            isVisible={guideModal}
            backdropOpacity={1}
            style={{alignItems: 'center'}}
        >
            <TouchableOpacity onPress={() => {
                setGuideModal(false)
                onClose()}}>
            { type == 'playlist' ? 
            <Image style={{flex: 1, resizeMode: 'contain'}} source={require('../assets/icons/playlistGuide.png')}/>:
            type == 'curation' ?
            <Image style={{flex: 1, resizeMode: 'contain'}} source={require('../assets/icons/curationGuide.png')}/> :
            type == 'board' ?
            <Image style={{flex: 1, resizeMode: 'contain'}} source={require('../assets/icons/boardGuide.png')}/> :
            <Image style={{flex: 1, resizeMode: 'contain'}} source={require('../assets/icons/createGuide.png')}/> } 
            </TouchableOpacity>
        </Modal>
    )
}

const styles=StyleSheet.create({
    firstOpt: {
        bottom: 120 * tmpWidth
    },
    secondOpt: {
        bottom: 40 * tmpWidth
    }
})

export default Guide