import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Context as BoardContext } from '../../context/BoardContext';
import { Context as UserContext } from '../../context/UserContext';
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../FontNormalize';

const BoardForm = ({ boards }) => {
    const { getCurrentBoard, getSelectedBoard, pushBookmark, deleteBookmark, getGenreBoard } = useContext(BoardContext);
    const { state, getMyBookmark } = useContext(UserContext);
    const [board, setBoard] = useState(boards);
    useEffect(() => {
        setBoard(boards);
    },[boards]);
    return (
        <View>
            {board != null ? board.map(item => {
                return (
                    <View key={item._id}>
                    <TouchableOpacity onPress={async () => {
                        getCurrentBoard({boardId:item._id})
                        await getSelectedBoard({id: item._id})
                        navigate('SelectedBoard', { boardName: item.name, introduction: item.introduction, boardId: item._id })}}
                        style={styles.boardBox}
                    >
                        {item.pick.includes(state.myInfo._id) ?
                        <TouchableOpacity onPress={async () => {
                            item.pick = item.pick.filter(id => id.toString() != state.myInfo._id.toString())
                            await deleteBookmark({id: item._id})
                            getMyBookmark()
                            getGenreBoard()}}>
                            <SvgUri width='40' height='40' source={require('../../assets/icons/staro.svg')}/>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={async () => {
                            item.pick.push(state.myInfo._id)
                            await pushBookmark({id: item._id})
                            getMyBookmark()
                            getGenreBoard()}}>
                            <SvgUri width='40' height='40' source={require('../../assets/icons/star.svg')}/>
                        </TouchableOpacity>}
                        <View style={styles.titleText}>
                            <Text style={{fontSize: 14 * tmpWidth}} numberOfLines={1}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                )
            }) : null }
        </View>
    );
};

BoardForm.defaultProps={
    initialValues: {
      name: '',
      introduction: '',  
    },
};

const styles=StyleSheet.create({
    boardBox: {
        height: 40 * tmpWidth, 
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(229,231,239)',
        marginLeft: 20 * tmpWidth, 
        marginRight: 20 * tmpWidth, 
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        marginLeft: 4 * tmpWidth, 
        width: 280 * tmpWidth
    }
});

export default BoardForm;