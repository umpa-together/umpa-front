import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { tmpWidth } from './FontNormalize';
import { useModal } from '../providers/modal';

const HarmfulModal = () => {
    const { harmfulModal, onCloseModal } = useModal()

    return (
        <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={harmfulModal}
            backdropOpacity={0.4}
            onBackdropPress={onCloseModal}
            style={{margin: 0, alignItems: 'center'}}
        >
            <View style={styles.harmfulContainer}>
                <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(86,86,86)', marginTop: 24 * tmpWidth}}>유해성 컨텐츠는 현재 감상할 수 없습니다.</Text>
                <TouchableOpacity onPress={onCloseModal}>
                    <Text style={{fontSize: 16 * tmpWidth, marginTop: 16 * tmpWidth}}>확인</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
};

const styles=StyleSheet.create({
    harmfulContainer: {
        width : 305 * tmpWidth,
        height : 94 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        borderRadius: 8 * tmpWidth, 
        alignItems: 'center',
    },
});

export default HarmfulModal;