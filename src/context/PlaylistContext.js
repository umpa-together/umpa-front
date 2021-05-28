import createDataContext from './createDataContext';
import serverApi from '../api/serverApi';
import { navigate } from '../navigationRef';

const playlistReducer = (state, action) => {
    switch(action.type) {
        case 'init_playlist':
            return { ...state, current_playlist: null, current_comments:null, current_songs:[] };
        case 'init_recomment':
            return { ...state, current_recomments: null }
        case 'get_playlists':
            return { ...state,  playlists: action.payload };
        case 'get_playlist':
            return { ...state, current_playlist:action.payload[0],  current_comments:action.payload[1], current_songs: action.payload[0].songs };
        case 'deleted_playlist':
            return { ...state, current_playlist: [] };
        case 'get_comment':
            return { ...state, current_comments:action.payload}
        case 'add_comment':
            return { ...state, current_playlist:action.payload[0],  current_comments: action.payload[1], current_songs: action.payload[0].songs }
        case 'get_recomment' :
            return { ...state , current_recomments:action.payload}
        case 'like' :
            return { ...state, current_playlist:action.payload };
        case 'error':
            return { ...state, errorMessage: action.payload };    
        default:
            return state;
    }
};

// Playlist

const initPlaylist = (dispatch) => () => {
    try {
        dispatch({ type: 'init_playlist' });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with initPlaylist' });
    }
}

const initRecomment = (dispatch) => () => {
    try {
        dispatch({ type: 'init_recomment' });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with initRecomment' });
    }
}

const addPlaylist = dispatch => async({ title, textcontent, songs, hashtag, fd } ,  callback) =>{
    try {
        const response = await serverApi.post('/playlist', { title, textcontent, songs, hashtag });
        navigate('Main');
        fd.append('playlistId', response.data);
        await serverApi.post('/imgUpload', fd, { header: {"content-type": "multipart/form-data"}});
    }
    catch(err){
        dispatch({ type: 'error', payload: 'Something went wrong with addPlaylist' });
    }
    if(callback) {
        callback();
    }
};

const deletePlaylist= dispatch => {
    return async ({ id }) => {
        await serverApi.delete('/playlist/'+id);
    };
};

const likesPlaylist = dispatch => {
    return async ({ id }) => {
        try{
            const response =await serverApi.post('/like/'+id);
            dispatch({type:'like', payload:response.data});
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with likes' });
        }
    }
};

const unlikesPlaylist = dispatch => {
    return async ({ id }) => {
        try{
            const response = await serverApi.delete('/like/'+id);
            dispatch({type:'like', payload:response.data})
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with unlikes' });
        }
    }
};

const getPlaylists = dispatch =>{
    return async ()=>{
        try {
            const response = await serverApi.get('/playlists');
            dispatch({type: 'get_playlists', payload: response.data });
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with getPlaylists' });
        }
    };
};

const getPlaylist = dispatch =>{
    return async ({id,postUserId})=>{
        try {
            const response = await serverApi.get('/playlist/'+id+'/'+postUserId);
            if(response.data[0] == null ){
                dispatch({type: 'deleted_playlist'})
            }else{
                dispatch({type: 'get_playlist', payload: response.data});
            }
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with getPlaylist' });
        }
    };
};

// Comment

const addComment = dispatch => {
    return async ({ id, text, noticieduser, noticieduseremail, noticetype, thirdid }) => {
        try{
            const response = await serverApi.post('/comment/'+id, { text, noticieduser, noticieduseremail, noticetype, thirdid });
            dispatch({ type:'add_comment', payload:response.data })
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with addComment' });
        }
    }
};

const deleteComment = dispatch => {
    return async ({ id, commentid }) => {
        try {
            const response = await serverApi.delete('/comment/'+id+'/'+commentid);
            dispatch({ type:'get_playlist', payload:response.data })
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with deleteComment' });
        }
    }
};

const addreComment = dispatch => {
    return async ({ id, commentid, text }) => {
        try{
            const response = await serverApi.post('/recomment/'+id+'/'+commentid, { text });
            dispatch({ type:'get_recomment', payload:response.data })
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with addreComment' });
        }
    }
};

const deletereComment = dispatch => {
    return async ({ commentid }) => {
        try{
            const response = await serverApi.delete('/recomment/'+commentid);
            dispatch({ type:'get_recomment', payload:response.data })
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with deletereComment' });
        }
    }
};

const getreComment = dispatch => {
    return async ({ commentid }) => {
        try{
            const response = await serverApi.get('/recomment/'+commentid);
            dispatch({ type:'get_recomment', payload:response.data })
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with getreComment' });
        }
    }
};

const likescomment = dispatch => {
    return async ({ playlistid, id }) => {
        try{
            const response =await serverApi.post('/likecomment/'+playlistid+'/'+id);
            dispatch({ type:'get_comment', payload:response.data });
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with likescomment' });
        }
    }
};

const unlikescomment = dispatch => {
    return async ({ playlistid, id }) => {
        try{
            const response = await serverApi.delete('/likecomment/'+playlistid+'/'+id);
            dispatch({ type:'get_comment', payload:response.data })
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with unlikescomment' });
        }
    }
};

const likesrecomment = dispatch => {
    return async ({ commentid, id }) => {
        try{
            const response =await serverApi.post('/likerecomment/'+commentid+'/'+id);
            dispatch({ type:'get_recomment', payload:response.data });
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with likesrecomment' });
        }
    }
};

const unlikesrecomment = dispatch => {
    return async ({ commentid, id }) => {
        try{
            const response = await serverApi.delete('/likerecomment/'+commentid+'/'+id);
            dispatch({ type:'get_recomment', payload:response.data })
        }catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with unlikesrecomment' });
        }
    }
};

export const { Provider, Context } = createDataContext(
    playlistReducer,
    { initPlaylist, addPlaylist, deletePlaylist, likesPlaylist, unlikesPlaylist, getPlaylists, getPlaylist,
        addComment, deleteComment, addreComment,deletereComment, getreComment, likescomment, unlikescomment, likesrecomment, unlikesrecomment, initRecomment },
    { playlists: null, current_playlist: null, current_comments:null, current_songs: [], current_recomments:null, userplaylists:null, errorMessage: '' }
)
