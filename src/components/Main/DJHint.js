import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { Context as SearchContext } from 'context/SearchContext';
import { Context as DJContext } from 'context/DJContext';
import { tmpWidth } from 'components/FontNormalize';
import { navigate, push } from 'navigationRef';
import ProfileImage from '../ProfileImage'

export default DJHint = () => {
    const { state: searchState } = useContext(SearchContext);
    const {state: userState, getOtheruser} = useContext(UserContext);
    const { getSongs } = useContext(DJContext);

    const onClickDJ = async (id) => {
        if(id == userState.myInfo._id){
            navigate('Account');
        }else{
            await Promise.all([
                getOtheruser({ id }),
                getSongs({ id })
            ]);
            push('OtherAccount', { otherUserId:id });
        }
    }
    return (
        <FlatList
            keyboardShouldPersistTaps="handled"
            data={searchState.djHint}
            keyExtractor={dj=>dj._id}
            renderItem={({item})=> {
                const songs = item.songs[0].attributes.name
                const artist = item.songs[0].attributes.artistName
                return (
                    <TouchableOpacity 
                        style={styles.box}
                        onPress={() => onClickDJ(item._id)}
                    >
                        <ProfileImage img={item.profileImage} imgStyle={styles.profileImage} />
                        <View style={styles.infoBox}>
                            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                            <View style={styles.songBox}>
                                <View style={styles.representbox}>
                                    <Text style={styles.text}>대표곡</Text>
                                </View>
                                <View style={styles.songArea}>
                                    <Text numberOfLines={1} style={styles.song}>{songs}</Text>
                                </View>
                                <View style={styles.artistArea}>
                                    <Text numberOfLines={1} style={styles.artist}>{artist}</Text>
                                </View>
                           </View>
                        </View>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

const styles=StyleSheet.create({
    box: {
        paddingLeft: 30 * tmpWidth, 
        marginTop: 20 * tmpWidth, 
        height: 70 * tmpWidth, 
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImage: {
        width: 56 * tmpWidth,
        height: 56 * tmpWidth,
        borderRadius: 50 * tmpWidth,
    },
    infoBox: {
        paddingLeft: 24 * tmpWidth, 
    },
    name: {
        fontSize: 16 * tmpWidth,
        marginTop: 10 * tmpWidth
    },
    songBox: {
        marginTop: 12 * tmpWidth, 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    text: {
        color: 'rgb(148,153,163)',
        fontSize: 11 * tmpWidth
    },
    representbox:{
        height: 16 * tmpWidth,
        borderWidth: 0.8 * tmpWidth,
        borderColor: 'rgba(148,153,163,0.5)',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    songArea: {
        width: 140 * tmpWidth, 
        marginRight: 10 * tmpWidth, 
    },
    song: {
        marginLeft: 6 * tmpWidth, 
        fontSize:14 * tmpWidth,
        color:'rgb(148,153,163)'
    },
    artistArea: {
        width: 60 * tmpWidth
    },
    artist: {
        fontSize: 11 * tmpWidth, 
        color:'rgb(148,153,163)'
    }
})