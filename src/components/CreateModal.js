import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { goBack } from '../navigationRef'

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

          </View>
        </View>
    )
}
