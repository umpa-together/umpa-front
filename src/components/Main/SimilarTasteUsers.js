import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { navigate } from 'navigationRef';
export default SimilarTasteUsers = () => {

    const onClickAll = async () => {
        navigate('AllContents', {type: '유저'})
    }

    return (
        <View>
            <TouchableOpacity onPress={onClickAll}>
                <Text style={styles.subheader}>dj 둘러보기 {'>'}</Text>
            </TouchableOpacity>        
        </View>
    )   
}

const styles=StyleSheet.create({

})