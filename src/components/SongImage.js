import React from 'react'
import { Image, ImageBackground } from 'react-native'
import { tmpWidth } from 'components/FontNormalize'

const SongImage = ({ size, border, url, opac = 1.0 }) => {
    url = url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return <Image style = {{ height: size * tmpWidth, width: size * tmpWidth, borderRadius: border * tmpWidth, opacity: opac}} source ={{url:url}}/>
}

const SongImageBack = ({ url, opac, width, height, border }) => {
    url = url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return  <ImageBackground style = {{ opacity : opac, height: height * tmpWidth, width: width * tmpWidth, borderRadius: border * tmpWidth }} resizeMode ="stretch" source ={{url:url}}/>
};

export { SongImage, SongImageBack }