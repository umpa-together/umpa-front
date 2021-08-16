import React, { useContext } from 'react'
import { Text, Image, StyleSheet, View,ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import {Context as UserContext} from '../../context/UserContext';

import ProfileImage from '../ProfileImage'
import { tmpWidth } from '../FontNormalize';
import SvgUri from 'react-native-svg-uri';
import { useStory } from '../../providers/story';

export default Story = ({ story }) => {
    const { state: userState } = useContext(UserContext);
    const { onClickStory } = useStory()

    return (
        <View style={styles.story}>
            <FlatList
                data={story}
                keyExtractor={user=>user.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft: 27 * tmpWidth}}
                renderItem={({item, index})=>{
                    return (
                        <View style={{height:115 * tmpWidth,marginRight:24 * tmpWidth,width:64 * tmpWidth}}>
                            <View style={{alignItems: 'center'}}>
                            {item.profileImage == undefined ?
                                <TouchableOpacity onPress={() =>onClickStory({item, index})}>
                                    {item.song.view.includes(userState.myInfo._id) ?
                                    <View style={styles.storynopicread}>
                                       <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                    </View>  :
                                    <ImageBackground style={{justifyContent:'center',alignItems:'center',width:tmpWidth*64, height:tmpWidth*64}} source={require('../../assets/icons/storylive.png')}>
                                        <View style={styles.storynopicread}>
                                           <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                        </View> 
                                    </ImageBackground> }
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => onClickStory({item, index})}>
                                    {item.song.view.includes(userState.myInfo._id) ? <Image source={{uri: item.profileImage}} style={styles.storypicread}/> :
                                    <ImageBackground style={{justifyContent:'center',alignItems:'center',width:tmpWidth*64, height:tmpWidth*64}} source={require('../../assets/icons/storylive.png')}>
                                        <Image source={{uri: item.profileImage}} style={styles.storypic} />
                                    </ImageBackground>
                                    }
                                </TouchableOpacity>
                            }
                                <Text numberOfLines ={1} style={{marginTop:6}}>{item.name}</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    story:{
        backgroundColor:"rgb(254,254,254)",
        width:375 * tmpWidth,
        paddingTop:7 * tmpWidth,
        height:100 * tmpWidth,
    },
    storynopicread:{
        width:56* tmpWidth,
        height:56 * tmpWidth,
        borderRadius:60 * tmpWidth,
    },
    storynopic:{
        width:56 * tmpWidth,
        height:56 * tmpWidth,
        borderRadius:60 * tmpWidth,
    },
    storypicread:{
        width:56 * tmpWidth,
        height:56 * tmpWidth,
        borderRadius:60 * tmpWidth,
        opacity:0.7 * tmpWidth,
    },
    storypic:{
        width:56 * tmpWidth,
        height:56* tmpWidth,
        borderRadius:60 * tmpWidth,
    },
})