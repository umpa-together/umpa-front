import React from 'react'
import { TouchableOpacity, View, Text,FlatList,StyleSheet, Image } from 'react-native'
import { useDaily } from 'providers/daily';
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';

export default CreateThumbnail = () => {
    const {  onClickDeleteThumbnail, informationRef,image } = useDaily()
    return (
        <>
            {image[0]!=undefined ||image[0]!=null ?
             <View style={styles.container}>
            <FlatList
                data={image}
                keyExtractor={!informationRef.current.isEdit ? id=>id.uri : uri => uri}
                horizontal={true}
                pagingEnabled

                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) =>{
                    return (
                            <View>
                            <Image source={{uri: informationRef.current.isEdit ?item : item.uri }} style={styles.img}/>
                                {!informationRef.current.isEdit &&
                                    <TouchableOpacity
                                        style={styles.icon}
                                        onPress={()=>onClickDeleteThumbnail(item)}
                                    >
                                        <SvgUri width='19' height='19' source={require('assets/icons/addedSongDelete.svg')} />
                                    </TouchableOpacity> }
                                    <Text>dd</Text>
                            </View>
                        )
                            }}
                        />
                                                
            </View> 
            : null

}
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