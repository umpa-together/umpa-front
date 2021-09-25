import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as DailyContext } from 'context/DailyContext';
import { Context as FeedContext } from 'context/FeedContext';
import { tmpWidth } from 'components/FontNormalize';

export default Footer = ({ hashtag, likes, comments, id, type }) => {
    const { state } = useContext(UserContext);
    const { likesPlaylist, unlikesPlaylist } = useContext(PlaylistContext);
    const { likesDaily, unlikesDaily } = useContext(DailyContext);
    const { getFeeds } = useContext(FeedContext)
    const [isLike, setIsLike] = useState(likes.includes(state.myInfo._id))
    
    const onClickLikes = () => {
        if(likes.includes(state.myInfo._id)) {
            if(type === 'playlist') {
                unlikesPlaylist({ id });
            } else {
                unlikesDaily({ id })
            }     
        } else {
            if(type === 'playlist') {
                likesPlaylist({ id }); 
            } else {
                likesDaily({ id })
            }
        }
        getFeeds()
        setIsLike(!isLike)
    }

    return (
        <View style={[styles.container, hashtag.length !== 0 && styles.isHashtag]}>
            <View style={styles.spaceBetween}>
                <View>
                    <View style={[styles.flexRow, styles.wrap]}>
                        {hashtag.map((item) => {
                            return (
                                <View style={styles.box}>
                                    <Text style={styles.hashtag}>#{item}</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View style={[styles.flexRow, hashtag.length === 0 && styles.isHashtag]}>
                        <Image style={styles.icon} source={require('assets/icons/feedLikes.png')} />
                        <Text style={styles.indicator}>{likes.length}</Text>
                        <Image style={styles.icon} source={require('assets/icons/feedComments.png')} />
                        <Text style={styles.indicator}>{comments.length}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={onClickLikes}
                >
                    <Image 
                        style={styles.heart} 
                        source={isLike ?
                            require('assets/icons/feedHearto.png') : 
                            require('assets/icons/feedHeart.png')} 
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        paddingLeft: 18 * tmpWidth,
        paddingRight: 18 * tmpWidth,
    },
    isHashtag: {
        marginTop: 14 * tmpWidth
    },
    box: {
        borderRadius: 100 * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: '#8bc0ff',
        marginRight: 8 * tmpWidth
    },
    hashtag: {
        paddingLeft: 11 * tmpWidth,
        paddingRight: 11 * tmpWidth,
        paddingTop: 4 * tmpWidth,
        paddingBottom: 4 * tmpWidth,
        color: '#8bc0ff',
        fontWeight: '400',
        fontSize: 14 * tmpWidth,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    wrap: {
        flexWrap: 'wrap'
    },
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        width: 40 * tmpWidth,
        height: 40 * tmpWidth,
        marginTop: 4 * tmpWidth
    },
    indicator: {
        fontWeight: '400',
        fontSize: 12 * tmpWidth,
        marginLeft: -5 * tmpWidth
    },
    heart: {
        width: 50 * tmpWidth,
        height: 50 * tmpWidth,
    }
})