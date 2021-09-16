import React, { useState, useRef, useEffect } from 'react'
import { TextInput, Text, View, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { usePlaylist } from 'providers/playlist';
import { tmpWidth } from 'components/FontNormalize'
import SvgUri from 'react-native-svg-uri';

export default CreateHashtag = () => {
    const { informationRef, image } = usePlaylist()
    const [hashtagLists, setHashtagLists] = useState([])
    const [checkModal, setCheckModal] = useState(false)
    const opacity = useState(new Animated.Value(1))[0];
    const hashtagRef = useRef()
    const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
    const pattern_num = /[0-9]/;
    const pattern_eng = /[a-zA-Z]/;
    const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    const addhashtag = (hashtag) => {
        if (hashtag !== '' && !hashtagLists.includes(hashtag)) {
            setHashtagLists((prev) => [...prev, hashtag])
            informationRef.current.hashtagLists.push(hashtag)
            return true
        }
        return false
    };

    const deleteHashtag = (hashtag) => {
        setHashtagLists((list) => list.filter((item) => item !== hashtag))
    }

    const onChangeHashtag = (text) => {
        hashtagRef.current.value = text
    }

    const onSubmitEditing = () => {
        if(!pattern_spc.test(hashtagRef.current.value) && (pattern_eng.test(hashtagRef.current.value) 
        || pattern_kor.test(hashtagRef.current.value) || pattern_num.test(hashtagRef.current.value))){
            if(addhashtag(hashtagRef.current.value)){
                hashtagRef.current.clear()
                hashtagRef.current.value = ''
            }
        } else {
            setCheckModal(true)
            setTimeout(() => {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true
                }).start()
                setTimeout(() => {
                    setCheckModal(false)
                    opacity.setValue(1);
                }, 1000)
            }, 1000);
        }
    }

    useEffect(() => {
        setHashtagLists(informationRef.current.hashtagLists)
    }, [])

    useEffect(() => {
        setHashtagLists(informationRef.current.hashtagLists)
    }, [image])

    return (
        <>
            <View style={styles.container}>
                <View style={styles.flexRow}>
                    <Text style={styles.hashtag}>#</Text>
                    <TextInput
                        onChangeText={(text) => onChangeHashtag(text)}
                        placeholder="해시태그를 입력해주세요. (최대 9글자)"
                        placeholderTextColor='#c4c4c4'
                        autoCapitalize='none'
                        onSubmitEditing={onSubmitEditing}
                        autoCorrect={false}
                        ref={hashtagRef}
                        maxLength={9}
                    />
                    <TouchableOpacity
                        style={styles.plus}
                        onPress={onSubmitEditing}
                    >
                        <SvgUri width='19' height='19' source={require('assets/icons/playlistPlus.svg')} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={hashtagLists}
                    keyExtractor={hashtag => hashtag}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) =>{
                        return (
                            <View style={[styles.flexRow, styles.margin]}>
                                <View style={styles.hashtagBox}>
                                    <Text style={styles.hashtagText}>{'#'+item}</Text>
                                </View>
                                <TouchableOpacity style={styles.icon} onPress={() => deleteHashtag(item)}>
                                    <SvgUri width='19' height='19' source={require('assets/icons/playlistDelete.svg')}/>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
            { checkModal && 
            <Animated.View style={[
                styles.warningBox,
                { opacity: opacity }
            ]}>
                <Animated.Text style={[
                    styles.warningText, 
                    {opacity: opacity}
                ]}>
                    특수문자는 불가능합니다.
                </Animated.Text>
            </Animated.View> }
        </>
    )
}

const styles=StyleSheet.create({
    container: {
        marginLeft: 18 * tmpWidth,
        marginTop: 16 * tmpWidth,
        marginBottom: 22 * tmpWidth
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    hashtag: {
        fontSize: 16 * tmpWidth,
        fontWeight: '500',
        color: '#8bc0ff',
        marginRight: 4 * tmpWidth
    },
    warningBox: {
        backgroundColor: 'rgba(0,0,0,0.46)', 
        width: 196 * tmpWidth, 
        height: 29 * tmpWidth, 
        borderRadius: 100 * tmpWidth, 
        justifyContent: 'center', 
        alignItems: 'center',
        bottom: 0, 
        left: 89 * tmpWidth,
        position: 'absolute'
    },
    warningText: {
        fontSize: 14 * tmpWidth, 
        color: '#ffffff'
    },
    hashtagBox: {
        paddingLeft: 10 * tmpWidth,
        paddingRight: 10 * tmpWidth,
        paddingTop: 7 * tmpWidth,
        paddingBottom: 7 * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: '#8bc0ff',
        borderRadius: 100 * tmpWidth,
    },
    hashtagText: {
        fontSize: 14 * tmpWidth,
        fontWeight: '400',
        color: '#8bc0ff'
    },
    icon: {
        width: 19 * tmpWidth,
        height: 19 * tmpWidth,
        marginLeft: 4 * tmpWidth,
        marginRight: 6 * tmpWidth
    },
    margin: {
        marginTop: 15 * tmpWidth
    },
    plus: {
        position: 'absolute',
        width: 19 * tmpWidth,
        height: 19 * tmpWidth,
        right: 18 * tmpWidth
    }
})