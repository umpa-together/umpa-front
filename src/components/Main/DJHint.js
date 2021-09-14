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
            contentContainerStyle={styles.container}
            renderItem={({item})=> {
                return (
                    <TouchableOpacity 
                        style={styles.box}
                        onPress={() => onClickDJ(item._id)}
                    >
                        <ProfileImage img={item.profileImage} imgStyle={styles.profileImage} />
                        <View style={styles.infoBox}>
                            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

const styles=StyleSheet.create({
    container: {
        paddingTop: 10 * tmpWidth
    },
    box: {
        paddingLeft: 18 * tmpWidth, 
        height: 54 * tmpWidth, 
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 46 * tmpWidth,
        height: 46 * tmpWidth,
        borderRadius: 46 * tmpWidth,
    },
    infoBox: {
        paddingLeft: 11 * tmpWidth, 
    },
    name: {
        fontSize: 16 * tmpWidth,
        fontWeight: '400'
    },
})