import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';

export default Thumbnail = ({ img }) => {
    const [imgModal, setImgModal] = useState(false)

    const onClickImg = () => {
        setImgModal(true)
    }

    const onClose = () => {
        setImgModal(false)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onClickImg}>
                <Image style={styles.img} source={{uri: img}}/>
            </TouchableOpacity>
            <Modal
                animationIn="fadeIn"
                animationOut="fadeOut"
                isVisible={imgModal}
                backdropOpacity={1}
                onBackdropPress={onClose}
                style={{alignItems: 'center', margin: 0}}
            >
                <TouchableOpacity 
                    style={styles.modalExit}
                    onPress={onClose}
                >
                    <SvgUri width={40} height={40} source={require('assets/icons/modalexit.svg')} />
                </TouchableOpacity>
                <Image 
                    source={{uri: img}} 
                    style={styles.modalImg} 
                    resizeMode="contain"
                />
            </Modal>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        marginTop: 16 * tmpWidth,
        paddingLeft: 18 * tmpWidth
    },
    img: {
        width: 339 * tmpWidth,
        height: 228 * tmpWidth, 
        borderRadius: 4 * tmpWidth
    },
    modalImg: {
        width: '100%',
        height: '100%'
    },
    modalExit: {
        position: 'absolute',
        top: 50 * tmpWidth,
        left: 10 * tmpWidth,
        zIndex: 98
    }
})