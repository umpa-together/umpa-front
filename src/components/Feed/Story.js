import React, { useContext, useState } from 'react'
import { Text, StyleSheet, View,ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Context as UserContext } from 'context/UserContext';

import ProfileImage from 'components/ProfileImage'
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import { useStory } from 'providers/story';
import NewStory from 'components/Account/NewStory';
import SearchProvider from 'providers/search'

export default Story = ({ story }) => {
    const { state: userState } = useContext(UserContext);
    const [newStory, setNewStory] = useState(false);
    const { onClickStory, onClickMyStory } = useStory()

    const onClickNewStory = () => {
        setNewStory(true)
    }

    return (
        <>
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft: 18 * tmpWidth}}
            >
                <View style={styles.nameArea}>
                    { userState.myStory ? 
                    <TouchableOpacity
                        onPress={onClickMyStory}
                        style={styles.story}
                    >
                        { userState.myStory.view.includes(userState.myInfo._id) ? 
                        <ProfileImage img={userState.myInfo.profileImage} imgStyle={styles.profileImg}/> :
                        <ImageBackground style={styles.story} source={require('assets/icons/profileStory.png')}>
                            <ProfileImage img={userState.myInfo.profileImage} imgStyle={styles.profileImg}/>
                        </ImageBackground> }
                    </TouchableOpacity> : 
                    <TouchableOpacity
                        style={styles.story}
                        onPress={onClickNewStory}
                    >
                        <ProfileImage img={userState.myInfo.profileImage} imgStyle={styles.profileImg}/>
                        <SvgUri width={21} height={21} source={require('assets/icons/feedStoryPlus.svg')} style={styles.plus} />
                    </TouchableOpacity> }
                    <Text numberOfLines ={1} style={styles.name}>{userState.myInfo.name}</Text>
                </View>
                { story && story.map((item, index) => {
                    const { song, profileImage, name } = item
                    return (
                        <View style={styles.nameArea}>
                            <TouchableOpacity
                                style={styles.story}
                                onPress={() => onClickStory({ item, index })}
                            >
                                { song.view.includes(userState.myInfo._id) ? 
                                <ProfileImage img={profileImage} imgStyle={styles.profileImg}/> : 
                                <ImageBackground style={styles.story} source={require('assets/icons/profileStory.png')}>
                                    <ProfileImage img={profileImage} imgStyle={styles.profileImg}/>
                                </ImageBackground> }
                            </TouchableOpacity>
                            <Text numberOfLines ={1} style={styles.name}>{name}</Text>
                        </View>
                    )
                })}
            </ScrollView>
            {/*
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
            */}
        </View>
                    <SearchProvider>
                    <NewStory newStory={newStory} setNewStory={setNewStory} />
                </SearchProvider>
                </>
    )
}

const styles=StyleSheet.create({
    container: {
        paddingBottom: 10 * tmpWidth,
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: '#dcdcdc'
    },
    story: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60 * tmpWidth,
        height: 60 * tmpWidth,
    },
    profileImg: {
        width: 56 * tmpWidth ,
        height: 56 * tmpWidth ,
        borderRadius: 56 * tmpWidth,
    },
    plus: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    name: {
        fontSize: 11 * tmpWidth,
        fontWeight: '400',
        marginTop: 8 * tmpWidth,
        textAlign: 'center'
    },
    nameArea: {
        width: 60 * tmpWidth,
        marginRight: 16 * tmpWidth
    }
})