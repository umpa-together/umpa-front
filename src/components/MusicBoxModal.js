import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { tmpWidth } from 'components/FontNormalize';
import { Context as UserContext } from 'context/UserContext';
import SvgUri from 'react-native-svg-uri';
import { navigate } from 'navigationRef';

const MusicBoxModal = ({ musicBoxModal, setMusicBoxModal }) => {
    const { getLikePlaylists } = useContext(UserContext);
    const onClose = () =>{
        setMusicBoxModal(false);
    };
    const onClickSong = () => {
        setMusicBoxModal(false)
        navigate('MusicBox', {title: '담은 곡'})
    }
    const onClickPlaylist = () => {
        setMusicBoxModal(false)
        getLikePlaylists()
        navigate('MusicBox', {title: '좋아요한 플레이리스트'})
    }
    return (
        <Modal
            isVisible={musicBoxModal}
            backdropOpacity={0.4}
            onBackdropPress={onClose}
            style={{margin: 0}}
        >
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>보관함</Text>
                </View>
                <TouchableOpacity  style={styles.exitIcon} onPress={onClose}>
                    <SvgUri width='100%' height='100%' source={require('assets/icons/modalexit.svg')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer} onPress={onClickSong}>
                    <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('assets/icons/musicBoxSong.svg')}/>
                    <Text style={styles.itemText}>담은 곡</Text>
                    <View style={styles.nextIcon}>
                        <SvgUri width={30 * tmpWidth} height={30 * tmpWidth} source={require('assets/icons/musicBoxNext.svg')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer} onPress={onClickPlaylist}>
                    <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('assets/icons/musicBoxPlaylist.svg')}/>
                    <Text style={styles.itemText}>좋아요한 플레이리스트</Text>
                    <View style={styles.nextIcon}>
                        <SvgUri width={30 * tmpWidth} height={30 * tmpWidth} source={require('assets/icons/musicBoxNext.svg')}/>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
};

const styles=StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width : '100%',
        height : 240 * tmpWidth,
        backgroundColor: 'rgb(250,250,250)',
        borderRadius: 12 * tmpWidth, 
    },
    titleContainer: {
        borderBottomWidth: 0.7 * tmpWidth, 
        borderBottomColor: 'rgb(229,231,239)',
        marginLeft: 38 * tmpWidth, 
        marginRight: 38 * tmpWidth, 
        height: 56.3 * tmpWidth
    },
    titleText: {
        textAlign: 'center', 
        fontSize: 16 * tmpWidth, 
        color: 'rgb(118,118,118)',
        marginTop: 20 * tmpWidth
    },
    exitIcon: {
        position :"absolute", 
        width:30 * tmpWidth, 
        height:30 * tmpWidth, 
        top: 14 * tmpWidth,
        right:10 * tmpWidth,
    },
    itemContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingLeft: 20 * tmpWidth, 
        marginTop: 28 * tmpWidth
    },
    itemText: {
        marginLeft: 10 * tmpWidth, 
        fontSize: 16 * tmpWidth, 
        color: 'rgb(80,80,80)'
    },
    nextIcon: {
        position: 'absolute', 
        right: 8 * tmpWidth
    }
});

export default MusicBoxModal;