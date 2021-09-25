import React, { useState } from 'react'
import { View,Text, StyleSheet, } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';

export default TextContent = ({ daily }) => {

    return (
        <View style={styles.container}>
            <Text style={{lineHeight:26*tmpWidth, fontSize:14*tmpWidth}}>{daily.textcontent}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        paddingLeft:18*tmpWidth,
        paddingRight:18*tmpWidth,
        maxHeight: 182*tmpWidth,
    },

})