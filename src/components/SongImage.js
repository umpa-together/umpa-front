import React from 'react'
import { Image } from 'react-native'
import { tmpWidth } from './FontNormalize'

const SongImage = ({ url }) => {
    url = url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return <Image style = {{ height:'100%', width:'100%', borderRadius: 100 * tmpWidth }} source ={{url:url}}/>
}

const SongImageBack = ({ url, opac }) => {
    url = url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return  <ImageBackground style = {{ opacity : opac, height:'100%', width:'100%' }} resizeMode ="stretch" source ={{url:url}}/>
};

export { SongImage, SongImageBack }