import {useEffect, useContext} from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';
import { navigate } from '../navigationRef';
const HelloScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);
    const { state, getMyInfo } = useContext(UserContext);

    useEffect(()=>{
        tryLocalSignin();
        getMyInfo();
    }, []);
    useEffect(() => {
        if(state.myInfo != null)    navigate('Loading')
    }, [state.myInfo]);

    return null;
};

export default HelloScreen;