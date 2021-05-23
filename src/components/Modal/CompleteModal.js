import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Modal } from 'react-native';

const CompleteModal = ({ modalText, modalVisible, setModalVisible }) => {
    useEffect(() => {
        setTimeout(() => setModalVisible(false), 1500);
    }, []);
    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={styles.modalBackground}>
                <View style={styles.box}>
                    <Text style={{fontSize: 15}}>{modalText}</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles=StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
        width: "100%",
        height: "100%",
        alignItems: 'center'
    },
    box: {
        width : '50%',
        height : '5%',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor:"#ffffff",
        borderRadius: 10,
    },
});

export default CompleteModal;