import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { navigate } from 'navigationRef';
import { launchImageLibrary } from 'react-native-image-picker';

export default CreateFooter = ({ informationRef, setImage }) => {
    const onClickAddSongs = () => {
        navigate('SearchSong', { data: informationRef.current.songs, isEdit: informationRef.current.isEdit })
    }
    const onClickImage = () => {
        launchImageLibrary({maxWidth: 500, maxHeight: 500}, (response) => {
            if(response.didCancel) {
                return;
            }
            informationRef.current.imgUrl = response.uri
            informationRef.current.imgName = response.fileName
            informationRef.current.imgType = response.type
            setImage(response.uri)
            console.log(response, 'here')
        });
    }
    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity 
                onPress={onClickAddSongs}
                style={{borderWidth: 1, borderRadius: 10, width: 80, height: 80}}
            >
                <Text>곡</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={onClickImage}
                style={{borderWidth: 1, borderRadius: 10, width: 80, height: 80}}
            >
                <Text>사진</Text>
            </TouchableOpacity>
        </View>
    )
}