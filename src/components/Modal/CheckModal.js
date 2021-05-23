import React from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const CheckModal = ({ modalText, modalVisible, setModalVisible, func, args }) => {
    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={styles.modalBackground}>
                <View style={styles.box}>
                    <Text style={{marginTop: '15%'}}>{modalText}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => {
                            func(args)
                            setModalVisible(false)}}>
                            <View style={styles.modal}>
                                <View style={styles.checkBox}>
                                    <Text style={{color: '#ffffff'}}>확인</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <View style={styles.modal}>
                                <View style={styles.checkBox}>
                                    <Text style={{color: '#ffffff'}}>취소</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
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
    modal: {
        alignItems: 'center',
        marginTop: '5%'
    },
    box: {
        width : '50%',
        height : '12%',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor:"#ffffff",
        borderRadius: 10,
    },
    checkBox: {
        width : '80%',
        height : '70%',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor:"#d42d2f",
        flexDirection: 'row',
        borderRadius: 20,
        marginTop: '5%',
    }
});

export default CheckModal;