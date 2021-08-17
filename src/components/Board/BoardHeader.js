import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Context as UserContext } from 'context/UserContext';
import { Context as BoardContext } from 'context/BoardContext';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';

const BoardHeader = ({ name }) => {
    const { state, getMyBookmark } = useContext(UserContext);
    const { state: boardState, pushBookmark, deleteBookmark, getGenreBoard} = useContext(BoardContext);
    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigate('CreateContent')}>
                <SvgUri width='40' height='40' source={require('assets/icons/contentCreate.svg')} style={styles.rightMargin}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigate('MusicArchive', {name: name})}}>
                <SvgUri width='40' height='40' source={require('assets/icons/musicArchive.svg')} style={styles.rightMargin}/>
            </TouchableOpacity>
            {boardState.boards != null && boardState.boards.pick.includes(state.myInfo._id) ? 
            <TouchableOpacity onPress={async () => {
                await deleteBookmark({id: boardState.boards._id});
                getMyBookmark() 
                getGenreBoard()
            }}>
                <SvgUri width='40' height='40' source={require('assets/icons/staro.svg')} style={styles.rightMargin}/>
            </TouchableOpacity> :
            <TouchableOpacity onPress={async () => {
                await pushBookmark({id: boardState.boards._id});
                getMyBookmark() 
                getGenreBoard()
            }}>
                <SvgUri width='40' height='40' source={require('assets/icons/star.svg')} style={styles.rightMargin}/>
            </TouchableOpacity> }
        </View>
    );
};

const styles=StyleSheet.create({
    rightMargin: {
        marginRight: 4 * tmpWidth
    }
});

export default BoardHeader;