import React from 'react'
import { View, Pressable, StyleSheet,Text,TouchableOpacity } from 'react-native'
import { goBack, navigate } from 'navigationRef'
import { Touchable } from 'react-native'

export default CreateModal = () => {
    return (
        <View style={{ flex: 1 }}>
          <Pressable
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
            ]}
            onPress={goBack}
          />
          <View style={{width: '100%', height: '30%', position: 'absolute', bottom: 0, backgroundColor: 'red'}}>
            <TouchableOpacity onPress = {async()=>{  await goBack(); navigate('Create', {'data': []})}}>
              <Text>플리 만들기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {async()=>{ await goBack();  navigate('CreateDaily', {'data': []})}}>
              <Text>데일리 만들기</Text>
            </TouchableOpacity >
          </View>
        </View>
    )
}
