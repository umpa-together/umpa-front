import React, { useCallback, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as BoardContext } from 'context/BoardContext';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import { useFocusEffect } from '@react-navigation/native';

const MyContentForm = ({ Contents }) => {
    const { getCurrentContent, initCurrentContent } = useContext(BoardContext);

    useFocusEffect(
        useCallback(() => {
            initCurrentContent()
        }, [])
    )

    return (
        <View style={{marginTop: 12 * tmpWidth}}>
             <FlatList 
                data={Contents}
                keyExtractor={(content) => content._id}
                renderItem={({item}) => {
                    if(!item.isDeleted){
                        return (
                            <TouchableOpacity style={styles.contentBox} onPress={() => {
                                getCurrentContent({id: item._id })
                                navigate('SelectedContent', { boardName: item.boardId.name })
                            }}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{width: 280 * tmpWidth}}>
                                        <Text style={styles.titleText}>{item.title}</Text>
                                    </View>
                                    <Text style={{color: 'rgb(148,153,163)'}}>{item.time.substr(5,6)}</Text>
                                </View>
                                <Text style={styles.contentText}>{item.content}</Text>
                                <View style={styles.footer}>
                                    <Text>{item.boardId.name}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.likeText}>좋아요 {item.likes.length}</Text>
                                        <Text style={styles.commentText}>댓글 {item.comments.length}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
        </View>
    );
};

const styles=StyleSheet.create({
    contentBox: {
        paddingTop: 12 * tmpWidth,
        paddingBottom: 12 * tmpWidth,
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(229, 231, 239)',
        paddingLeft: 20 * tmpWidth,
        paddingRight: 20 * tmpWidth,
    },
    titleText: {
        fontSize: 14 * tmpWidth,
    },
    contentText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(93,93,93)', 
        marginTop: 12 * tmpWidth
    },
    footer: {
        marginTop: 12 * tmpWidth, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    likeText: {
        color: 'rgb(79,79,79)'
    },
    commentText: {
        color: 'rgb(79,79,79)', 
        marginLeft: 8 * tmpWidth
    }
});

export default MyContentForm;