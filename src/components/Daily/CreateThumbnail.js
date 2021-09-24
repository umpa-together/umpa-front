import React from 'react'
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native'
import { useDaily } from 'providers/daily';
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';

export default CreateThumbnail = () => {
    const { image, onClickDeleteThumbnail, informationRef } = useDaily()

    return (
        <>
            {image && 
            <View style={styles.container}>
                <Image source={{uri: image.uri || image}} style={styles.img}/>
                {!informationRef.current.isEdit &&
                <TouchableOpacity
                    style={styles.icon}
                    onPress={onClickDeleteThumbnail}
                >
                    <SvgUri width='19' height='19' source={require('assets/icons/addedSongDelete.svg')} />
                </TouchableOpacity> }
            </View> }
        </>
    )
}

const styles=StyleSheet.create({
    container: {
        width: 339 * tmpWidth,
        height: 221 * tmpWidth,
        marginLeft: 18 * tmpWidth,
        marginTop: 20 * tmpWidth,
    },
    img: {
        width: 339 * tmpWidth,
        height: 221 * tmpWidth,
        borderRadius: 4 * tmpWidth,
        borderWidth: 0.5 * tmpWidth,
        borderColor: '#c4c4c4',
    },
    icon: {
        width: 40 * tmpWidth,
        height: 40 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
    }
})