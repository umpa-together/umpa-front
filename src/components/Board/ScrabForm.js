import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Context as UserContext } from 'context/UserContext';
import { Context as BoardContext } from 'context/BoardContext';
import { tmpWidth } from 'components/FontNormalize';

const ScrabForm = ({ contentId }) => {
    const { state } = useContext(UserContext);
    const { state: boardState, scrabContent, deleteScrabContent } = useContext(BoardContext);
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {boardState.currentContent.scrabs.includes(state.myInfo._id) ? 
            <TouchableOpacity onPress={async () => await deleteScrabContent({ id: contentId })}>
                <SvgUri width='24' height='24' source={require('assets/icons/boardScrab.svg')} style={{marginRight: 2 * tmpWidth}}/>
            </TouchableOpacity> : 
            <TouchableOpacity onPress={async () => await scrabContent({ id: contentId })}>
                <SvgUri width='24' height='24' source={require('assets/icons/boardUnScrab.svg')} style={{marginRight: 2 * tmpWidth}}/>
            </TouchableOpacity> }
            <Text style={styles.footerText}>스크랩 {boardState.currentContent.scrabs.length}</Text>
        </View>
    )
};

const styles=StyleSheet.create({
    footerText: {
        fontSize: 12 * tmpWidth, 
        marginRight: 12 * tmpWidth
    },
});

export default ScrabForm;