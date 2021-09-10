import React, { useState, useRef } from 'react'
import { TextInput, Text, View, FlatList } from 'react-native'

export default CreateHashtag = ({ informationRef, validity }) => {
    const [hashtagLists, setHashtagLists] = useState([])
    const hashtagRef = useRef()
    const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
    const pattern_num = /[0-9]/;
    const pattern_eng = /[a-zA-Z]/;
    const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    const addhashtag = (hashtag) => {
        if (hashtagLists.length < 3 && hashtag !== '' && !hashtagLists.includes(hashtag)) {
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
        if(text.length <= 9)    hashtagRef.current.value = text
    }

    const onSubmitEditing = () => {
        if(!pattern_spc.test(hashtagRef.current.value) && (pattern_eng.test(hashtagRef.current.value) 
        || pattern_kor.test(hashtagRef.current.value) || pattern_num.test(hashtagRef.current.value))){
            if(addhashtag(hashtagRef.current.value)){
                hashtagRef.current.clear()
                hashtagRef.current.value = ''
            }
            //setHashtagValidty(true)
        }else{
            //setHashtagValidty(false)
        }
    }

    return (
        <>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'rgb(169,193,255)', marginRight: 4 }}>#</Text>
            <TextInput
                onChangeText={(text) => onChangeHashtag(text)}
                placeholder="해시태그를 입력해주세요.(최대 3개, 9글자)"
                placeholderTextColor='rgb(196,196,196)'
                autoCapitalize='none'
                onSubmitEditing={onSubmitEditing}
                autoCorrect={false}
                ref={hashtagRef}
                maxLength={9}
            />
            { !validity.hashtag &&
            <View style={{flexDirection:'row', marginTop: 4 * tmpWidth, marginLeft: 65 * tmpWidth,}}>
                <SvgUri width='14' height='14' source={require('../../assets/icons/warning.svg')}/>
                <Text style={styles.warningText}>특수문자는 불가능합니다.</Text>
            </View> }
        </View>
        <View>
            <FlatList
                data={hashtagLists}
                keyExtractor={hashtag => hashtag}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) =>{
                    return (
                        <View style={styles.tmpHash}>
                            <View style={styles.hashtagView}>
                                <Text style={styles.hashtagBox}>{'#'+item}</Text>
                            </View>
                            <TouchableOpacity style={styles.hashtagplus} onPress={() => deletehashtag({data:item})}>
                                <Text style={{fontSize: 15 * tmpWidth, color: 'rgb(182,201,250)'}}>X</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
        </>
    )
}