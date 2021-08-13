import createDataContext from './createDataContext';
import serverApi from '../api/serverApi';

const userReducer = (state, action) => {
    switch(action.type) {
        case 'initUser':
            return { ...state, myContents: null};
        case 'initOtherUser':
            return { ...state, otherUser: null };
        case 'getMyInfo':
            return { ...state, myInfo: action.payload, myPlayList: action.payload.myPlaylists.reverse() };
        case 'get_otheruser':
            return { ...state, otherUser:action.payload};
        case 'getMyBookmark':
            return { ...state, boardBookmark: action.payload };
        case 'getMyContent':
            return { ...state, myContents: action.payload };
        case 'getMyScrab':
            return { ...state, myContents: action.payload };
        case 'getMyBoardSongs':
            return { ...state, myBoardSongs: action.payload };
        case 'getLikePlaylists':
            return { ...state, likePlaylists: action.payload };
        case 'getMyStory' :
            return { ...state, myStory: action.payload[0], storyViewer: action.payload[1]}
        case 'get_follower':
            return { ...state, follower:action.payload};
        case 'get_following':
            return { ...state, following:action.payload};
        case 'myPlaylist':
            return { ...state, myPlayList: action.payload.reverse() };
        case 'myStory':
            return { ...state, myStory: action.payload };
        case 'otherStory':
            return { ...state, otherStory: action.payload };
        case 'storyCalendar':
            return { ...state, storyCalendar: action.payload };
        case 'error':
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};


const initUser = (dispatch) => () => {
    try{
        dispatch({ type: 'initUser' });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with initUser' });
    }
};

const initOtherUser = (dispatch) => () => {
    try{
        dispatch({ type: 'initOtherUser' });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with initOtherUser' });
    }
}

const postGuide = (dispatch) => async ({type}) => {
    try {
        const response = await serverApi.post('/guide', {type});
        dispatch({ type: 'getMyInfo', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with postGuide' });
    }
}




const getMyInfo = (dispatch) => async () => {
    try{
        const response = await serverApi.get('/getMyInfo');
        dispatch({ type: 'getMyInfo', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getMyInfo' });
    }
};

const getOtheruser = (dispatch) => async ({id}) => {
    try {
        const response = await serverApi.get('/otheruser/'+id);
        dispatch({ type: 'get_otheruser' , payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getOtheruser' });
    }
};

const editProfile = (dispatch) => async ({name, introduction}) => {
    try {
        const response = await serverApi.post('/editProfile', {name, introduction});
        dispatch({ type: 'getMyInfo', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with editProfile' });
    }
}

const editProfileImage = (dispatch) => async ({fd}) => {
    try {
        const response = await serverApi.post('/editProfileImage', fd, { header: {"content-type": "multipart/form-data"}});
        dispatch({ type: 'getMyInfo', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with setProfileImage' });
    }
};

const follow = dispatch => {
    return async ({ id }) => {
        try{
            const response =await serverApi.post('/follow/'+id);
            dispatch({type:'get_otheruser', payload:response.data});
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with follow' });
        }
    }
};

const unfollow = dispatch => {
    return async ({ id }) => {
        try{
            const response = await serverApi.delete('/follow/'+id);
            dispatch({type:'get_otheruser', payload:response.data})
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with unfollow' });
        }
    }
};

const getFollower = dispatch => {
    return async ({ follower }) => {
        try{
            const response = await serverApi.post('/follower', { follower });
            dispatch({type:'get_follower', payload:response.data})
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with getFollower' });
        }
    }
};

const getFollowing = dispatch => {
    return async ({ following }) => {
        try{
            const response = await serverApi.post('/following', { following });
            dispatch({type:'get_following', payload:response.data})
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with getFollowing' });
        }
    }
};

const getMyBookmark = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/getMyBookmark');
        dispatch({ type: 'getMyBookmark' , payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getMyBookmark' });
    }
};

const getMyContent = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/getMyContent');
        dispatch({ type: 'getMyContent', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getMyContent' });
    }
};

const getMyComment = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/getMyComment');
        dispatch({ type: 'getMyContent', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getMyComment' });
    }
};

const getMyScrab = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/getMyScrab');
        dispatch({ type: 'getMyContent', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getMyScrab' });
    }
};

const getMyBoardSongs = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/getMyBoardSongs');
        dispatch({ type: 'getMyBoardSongs', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getMyBoardSongs' });
    }
};

const getLikePlaylists = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/getLikePlaylists');
        dispatch({ type: 'getLikePlaylists', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getLikePlaylists' });
    }
}

const addSonginPlaylists = (dispatch) => async ({ song }) => {
    try {
        const response = await serverApi.post('/addSonginPlaylists', {song});
        dispatch({ type: 'myPlaylist', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with addSonginPlaylists' });
    }
}

const deleteSonginPlaylists = (dispatch) => async({ time }) => {
    try {
        const response = await serverApi.get('/deleteSonginPlaylists/'+time);
        dispatch({ type: 'myPlaylist', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with addSonginPlaylists' });
    }
}

const postStory = (dispatch) => async ({song}) => {
    try {
        const response = await serverApi.post('/Story', {song});
        dispatch({ type: 'myStory', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with postStory' });
    }
}

const deleteStory = (dispatch) => async() => {
    try {
        const response = await serverApi.delete('/Story');
        dispatch({ type: 'myStory', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with postStory' });
    }
}

const getMyStory = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/MyStory');
        dispatch({ type: 'getMyStory', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getMyStory' });
    }
}

const getOtherStory = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/OtherStory');
        dispatch({ type: 'otherStory', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getOtherStory' });
    }
}

const storyView = (dispatch) => async ({id}) => {
    try {
        await serverApi.get('/StoryView/'+id);
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with storyView' });
    }
}

const storyCalendar = (dispatch) => async ({id}) => {
    try {
        const response = await serverApi.get('/storyCalendar/'+id);
        dispatch({ type: 'storyCalendar', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with storyCalendar' });
    }
}

export const { Provider, Context } = createDataContext(
    userReducer,
    { initUser, initOtherUser, postGuide, getMyInfo, getOtheruser, editProfile, editProfileImage, 
        follow, unfollow, getFollower ,getFollowing,
        getMyBookmark, getMyContent, getMyComment, getMyScrab, getMyBoardSongs, getLikePlaylists,
        addSonginPlaylists, deleteSonginPlaylists, postStory, deleteStory, getMyStory, getOtherStory, storyView, storyCalendar },
    { myInfo: null, myPlayList: null, likePlaylists: null, otherUser:null, boardBookmark: null, 
        myContents: null, myBoardSongs: null, follower:null , following: null, myStory: null, otherStory: null, storyViewer: [], storyCalendar: null }
)