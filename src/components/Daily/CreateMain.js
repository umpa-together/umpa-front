import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { Context as DailyContext } from 'context/DailyContext'
import { useFocusEffect } from '@react-navigation/native';
import CreateTitle from 'components/Daily/CreateTitle';
import CreateHashtag from 'components/Daily/CreateHashtag';
import CreateSongsLists from 'components/Daily/CreateSongsLists';
import CreateThumbnail from 'components/Daily/CreateThumbnail';
import CreateFooter from 'components/Daily/CreateFooter';
import Header from 'components/Daily/Header';

import { useDaily } from 'providers/daily'

export default CreateMain = ({ isEdit, setIsSearch, daily }) => {
    const { state } = useContext(DailyContext);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const { informationRef, setTitle, setImage, image,imagecheck } = useDaily()
    const onKeyboardDidShow =(e) =>{
        setKeyboardHeight(e.endCoordinates.height);
    }

    const onKeyboardDidHide=()=>{
        setKeyboardHeight(0);
    }

    useFocusEffect(
        useCallback(() => {
            Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
            Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
            return () => {
                Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow);
                Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
            }
        }, [])
    )

    useEffect(() => {
        if(isEdit && !imagecheck) {
            informationRef.current.hashtagLists = state.current_daily.hashtag,
            informationRef.current.songs = daily,
            informationRef.current.isEdit = true,
            informationRef.current.title = state.current_daily.textcontent,
            setTitle(state.current_daily.textcontent)
            setImage(state.current_daily.image)
        }
    }, [])

    return (
        <View style={styles.container}>
            <Header 
                title={`데일리${isEdit ? '수정하기' : '만들기'}`} 
                click="업로드"
                isEdit={isEdit}
            />
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollView}
            >
                <View style={{paddingBottom: keyboardHeight, flex:1}}>
                    <CreateSongsLists songs={daily} />
                    <CreateTitle/>
                    <CreateHashtag  isEdit={isEdit} />
                    <CreateThumbnail />
                    <CreateFooter songs={daily} setIsSearch={setIsSearch} />
                </View>

            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    scrollView: {
        flex:1, 
    },
    container: {
        backgroundColor: '#ffffff',
        flex:1,
    }
});