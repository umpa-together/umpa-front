import React,{useContext} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Context as WeeklyContext } from '../../context/WeeklyContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as DJContext } from '../../context/DJContext';
import { navigate, push } from '../../navigationRef';
import { tmpWidth, tmpHeight } from '../FontNormalize';
import SvgUri from 'react-native-svg-uri';

const MainDJForm = () => {
    const { state} = useContext(WeeklyContext);
    const {state: userState,getOtheruser} = useContext(UserContext);
    const { getSongs } = useContext(DJContext);

    return (
        <View>
            <Text style={styles.headertext}>위클리 DJ</Text>
            <View style={{width: 375 * tmpWidth, height:525 * tmpHeight}}>
                <FlatList
                    keyboardShouldPersistTaps="handled"
                    data={state.weeklyDJ}
                    keyExtractor={dj=>dj._id}
                    contentContainerStyle={{paddingBottom: 24 * tmpWidth}}
                    renderItem={({item, index})=> {
                        return (
                            <View style={{width: 344 * tmpWidth, height:75 * tmpWidth, }}>
                                <TouchableOpacity style={{flexDirection: 'row', }} onPress={async () => {
                                    if(item._id == userState.myInfo._id){
                                        navigate('Account');
                                    }else{
                                        await Promise.all([getOtheruser({id:item._id}),
                                        getSongs({id:item._id})]);
                                        push('OtherAccount', {otherUserId:item._id});
                                    }
                                }}>
                                {item.profileImage == undefined ?
                                <View style={styles.noprofile}>
                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                </View>
                                :
                                <Image source={{uri: item.profileImage}} style={styles.profile}/> }
                                <View style={{marginLeft: 24 * tmpWidth}}>
                                    <Text style={{fontSize:16 * tmpWidth, marginTop:17.7 * tmpWidth}}>{index+1+'  '+item.name}</Text>
                                        <View style={{flexDirection:'row',marginTop:7.3 * tmpWidth, alignItems:'flex-end'}}>
                                            <View style={styles.box}>
                                                <Text style={{fontSize:11 * tmpWidth, color:'rgba(148,153,163,1)'}}>대표곡</Text>
                                            </View>
                                            <View style={{width:200 * tmpWidth}}>
                                                <Text style={{marginLeft:6 * tmpWidth,fontSize:14 * tmpWidth, color:'rgba(148,153,163,1)', fontWeight:'bold'}} numberOfLines={1}>
                                                    {item.songs[0].attributes.name}
                                                </Text>
                                            </View>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    headertext:{
        marginTop: 8 * tmpWidth,
        marginLeft: 24 * tmpWidth,
        marginBottom: 18 * tmpWidth,
        fontSize: 16 * tmpWidth
    },
    noprofile:{
        marginLeft:24* tmpWidth,
        marginTop:14 * tmpWidth,
        width:55 * tmpWidth,
        height:55 * tmpWidth,
        borderRadius:56 * tmpWidth,
        backgroundColor:'#eee'
    },
    profile:{
        marginLeft:24 * tmpWidth,
        marginTop:14 * tmpWidth,
        width:55 * tmpWidth,
        height:55 * tmpWidth,
        borderRadius:56 * tmpWidth

    },
    box:{
        justifyContent:'center',
        alignItems:'center',
        width:39 * tmpWidth,
        borderWidth:0.8 * tmpWidth,
        borderColor:'rgba(148,153,163,0.5)',
        height:16 * tmpWidth,
        borderRadius:30 * tmpWidth
    },
    hashtagbox:{
        borderWidth: 1 * tmpWidth,
        borderColor:'rgb(154,188,255)',
        borderRadius:8 * tmpWidth,
        color:'rgb(80,80,80)' ,
        paddingTop: 7 * tmpWidth,
        paddingBottom:7 * tmpWidth,
        paddingRight: 10 * tmpWidth,
        paddingLeft: 10 * tmpWidth,
        marginRight:8 * tmpWidth,
        marginBottom:12 * tmpWidth
    },
});

export default MainDJForm;