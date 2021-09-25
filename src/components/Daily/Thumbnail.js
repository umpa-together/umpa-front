import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity,FlatList ,Text} from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { goBack } from 'navigationRef'
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';

export default Thumbnail = ({ img }) => {
    const [imgModal, setImgModal] = useState(false)
    const [imgzoom, setImgzoom] =useState('')
    const onClickImg = (item) => {
        setImgzoom(item);
        setImgModal(true)
    }

    const onClose = () => {
        setImgModal(false)
    }

    return (
        <View style={styles.container}>
            {  img[0] == undefined || img[0] == null  ? 
            <View style={{height:tmpWidth*60}}>
            <TouchableOpacity style={styles.back} onPress={goBack}>
                <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('assets/icons/playlistBack.svg')}/>
            </TouchableOpacity>         
            </View>  
            :
            <View>
            <TouchableOpacity style={styles.back} onPress={goBack}>
                <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('assets/icons/playlistBack.svg')}/>
            </TouchableOpacity>
            <View>
            <FlatList
                data={img}
                keyExtractor={hashtag => hashtag}
                horizontal={true}
                pagingEnabled

                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) =>{
                    return (
                        <View style={{width:375*tmpWidth}} >
                        <TouchableOpacity onPress={()=>onClickImg(item)}>
                            <Image style={styles.img} source={{uri: item }}/>
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
                                source={{uri: imgzoom }} 
                                style={styles.modalImg} 
                                resizeMode="contain"
                            />
                        </Modal>
                        </View>
                    )
                }}
            />
                </View>
            </View>
            }
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
    },
    img: {
        width: '100%',
        height: 339 * tmpWidth,
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
    },
    back: {
        zIndex:10,
        top:35*tmpWidth,
        position: 'absolute',
        left: 5 * tmpWidth, 
    }
})