import React from 'react'
import { View, ActivityIndicator } from 'react-native'

export default LoadingIndicator = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
        </View>
   )
}