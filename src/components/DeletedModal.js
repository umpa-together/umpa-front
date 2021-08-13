import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { tmpWidth } from './FontNormalize';
import { Context as PlaylistContext } from '../context/PlaylistContext';
import { goBack } from '../navigationRef';

const DeletedModal = ({ deletedModal, setDeletedModal, type }) => {
    const { getPlaylists } = useContext(PlaylistContext);
    const [title, setTitle] = useState('');
    useEffect(() => {
        if(type == 'board'){
            setTitle('게시글')
        }else if (type == 'playlist') { 
            setTitle('플레이리스트')
        }
    }, []);
    return (
        <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={deletedModal}
            backdropOpacity={0.4}
            style={{margin: 0, alignItems: 'center'}}
        >
            <View style={styles.deleteContainer}>
                <Text style={styles.deleteText}>존재하지 않는 {title}입니다.</Text>
                <TouchableOpacity onPress={async () => {
                    setDeletedModal(false)
                    goBack()
                    if(type == 'playlist')  await getPlaylists()
                    }}>
                    <Text style={{marginTop: 16 * tmpWidth, fontSize: 16 * tmpWidth}}>확인</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles=StyleSheet.create({
    deleteContainer: {
        width : 305 * tmpWidth,
        height : 94 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        borderRadius: 8 * tmpWidth, 
        alignItems: 'center',
    },
    deleteText: {
        fontSize: 16 * tmpWidth, 
        color: 'rgb(86,86,86)',
        marginTop: 24 * tmpWidth
    }
});

export default DeletedModal;