import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TextTicker from 'react-native-text-ticker'
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from 'components/FontNormalize';

export default MoveText = ({ container, text, isMove, isExplicit, textStyles }) => {
    return (
        <View style={container}>
            <View style={styles.flexRow}>
                {isExplicit && <SvgUri width="12" height="12" source={require('assets/icons/19.svg')} style={styles.explicit}/> }
                {isMove ? 
                <TextTicker
                  duration={7000}
                  bounce={false}
                  marqueeDelay={1000}
                  style={textStyles}
                >
                    {text}
                </TextTicker> : 
                <Text style={textStyles} numberOfLines={1} >
                    {text}
                </Text>}
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    flexRow: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    explicit: {
        marginRight: 5 * tmpWidth
    }
})