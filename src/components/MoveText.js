import React from 'react'
import { View, Text } from 'react-native'
import TextTicker from 'react-native-text-ticker'
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from './FontNormalize';

export default MoveText = ({ width, text, isMove, isExplicit, textStyles }) => {
    return (
        <View style={{ width: width }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {isExplicit && <SvgUri width="12" height="12" source={require('../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth, marginBottom: 8 * tmpWidth}}/> }
                {isMove ? 
                <TextTicker
                  duration={5000}
                  bounce={false}
                  marqueeDelay={1000}
                  style={textStyles}
                >
                    {text}
                </TextTicker> : 
                <Text style={textStyles} >
                    {text}
                </Text>}
            </View>
        </View>
    )
}