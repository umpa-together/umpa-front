import React from 'react'
import { View, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';

export default ProfileImage = ({ img, imgStyle }) => {
    return (
        <>
            { img == undefined ?
            <View style={imgStyle}>
                <SvgUri width='100%' height='100%' source={require('../assets/icons/noprofile.svg')} />
            </View> : <Image style={imgStyle} source={{uri: img}}/> }
        </>
    )
}