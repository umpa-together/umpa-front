import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as UserContext } from '../../context/UserContext'
import Header from '../../components/Header';
import FollowSearch from '../../components/Account/FollowSearch';
import FollowOption from '../../components/Account/FollowOption';
import LoadingIndicator from '../../components/LoadingIndicator';
import FollowLists from '../../components/Account/FollowLists';

const FollowPage = ({ route }) => {
    const { state } = useContext(UserContext);
    const { name, type: typefix } = route.params
    const [type, setType] = useState();
    const [result, setResult] = useState();
    const [user, setUser] = useState(null);

    useEffect(()=>{
        setType(typefix);
    }, [typefix]);

    useEffect(() => {
        if(type == 'following'){
            if(user != null)  setResult(user.following)
        }else{
            if(user != null)  setResult(user.follower)
        }
    },[type, user]);

    useEffect(() => {
        if(name === state.myInfo.name){
            setUser(state.myInfo)
        } else {
            setUser(state.otherUser)
        }
    },[name, state.myInfo]);

    return (
        <View style={styles.container}>
            { user === null ? <LoadingIndicator /> :
            <View style={styles.flexContainer}>
                <Header title={name} />
                <FollowSearch type={type} setResult={setResult} user={user} />
                <FollowOption type={type} setType={setType} user={user} />
                <View style={styles.flexContainer}>
                    <FollowLists result={result} />
                </View>
            </View> }
        </View>
    );
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(254,254,254)', 
        flex: 1
    },
    flexContainer: {
        flex: 1
    }
});

export default FollowPage;