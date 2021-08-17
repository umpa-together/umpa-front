import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { tmpWidth } from 'components/FontNormalize';
import { Context as UserContext } from 'context/UserContext';

const AddPlaylistModal = ({ addPlaylistModal, setAddPlaylistModal, song }) => {
    const { addSonginPlaylists } = useContext(UserContext)
    const onClose = () =>{
        setAddPlaylistModal(false);
    };
    const onClick = () => {
        addSonginPlaylists({song})
        setAddPlaylistModal(false)
    }
    return (
        <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={addPlaylistModal}
            backdropOpacity={0.4}
            onBackdropPress={onClose}
            style={{margin: 0, alignItems: 'center'}}
        >
            <View style={styles.container}>
                <Text style={{fontSize: 14 * tmpWidth, marginTop: 32 * tmpWidth}}>담은곡에 추가하시겠습니까?</Text>
                <View style={{flexDirection: 'row', marginTop: 26 * tmpWidth}}>
                    <TouchableOpacity style={styles.cancelBox} onPress={() => onClose()}>
                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(133,133,133)'}}>취소하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBox} onPress={() => onClick()}>
                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(86,86,86)'}}>추가하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

const DeletePlaylistModal = ({ deletePlaylistModal, setDeletePlaylistModal, time }) => {
    const { deleteSonginPlaylists } = useContext(UserContext)
    const onClose = () =>{
        setDeletePlaylistModal(false);
    };
    const onClick = () => {
        deleteSonginPlaylists({time})
        setDeletePlaylistModal(false)
    }
    return (
        <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={deletePlaylistModal}
            backdropOpacity={0.4}
            onBackdropPress={onClose}
            style={{margin: 0, alignItems: 'center'}}
        >
            <View style={styles.container}>
                <Text style={{fontSize: 14 * tmpWidth, marginTop: 32 * tmpWidth}}>담은곡에서 삭제하시겠습니까?</Text>
                <View style={{flexDirection: 'row', marginTop: 26 * tmpWidth}}>
                    <TouchableOpacity style={styles.cancelBox} onPress={() => onClose()}>
                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(133,133,133)'}}>취소하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBox} onPress={() => onClick()}>
                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(86,86,86)'}}>삭제하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles=StyleSheet.create({
    container: {
        width : 285 * tmpWidth,
        height : 131 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        borderRadius: 4 * tmpWidth, 
        alignItems: 'center'
    },
    cancelBox: {
        width: 105 * tmpWidth,
        height: 34 * tmpWidth,
        borderRadius: 8 * tmpWidth,
        backgroundColor: 'rgb(245,245,245)',
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(245,245,245)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5.5 * tmpWidth
    },
    actionBox: {
        width: 105 * tmpWidth,
        height: 34 * tmpWidth,
        borderRadius: 8 * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(169,193,255)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5.5 * tmpWidth
    }
});

export { AddPlaylistModal, DeletePlaylistModal };