import createDataContext from './createDataContext';
import serverApi from 'api/serverApi';

const SearchPlaylistReducer = (state, action) => {
    switch(action.type){
        case 'initPlaylist':
            return { ...state, playList: null, dj: null, daily: null, hashtag: null };
        case 'searchHashtag' :
            return { ...state, hashtag: action.payload };  
        case 'searchAll':
            return { ...state, playList: action.payload.playlists, dj: action.payload.dj, daily: action.payload.daily }  
        case 'searchHashtagAll':
            return { ...state, playList: action.payload.playlists, daily: action.payload.daily }
        case 'error':
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

const initPlaylist = (dispatch) => async () => {
    try{
        dispatch({ type: 'initPlaylist', payload: response.data.playlistNum });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with initPlaylist' });
    }
};

const SearchHashtag = (dispatch) => async ({ object }) => {
    try {
        const response = await serverApi.get('/searchHashtag/'+object);
        dispatch({ type: 'searchHashtag', payload: response.data});
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with SearchHashtag' });
    }
};

const SearchAll = (dispatch) => async ({ id }) => {
    try {
        const response = await serverApi.get('/searchAll/'+id);
        dispatch({ type: 'searchAll', payload: response.data});
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with SearchAll' });
    }
}

const SearchHashtagAll = (dispatch) => async ({ term }) => {
    try {
        const response = await serverApi.get('/searchHashtagAll/'+term);
        dispatch({ type: 'searchHashtagAll', payload: response.data});
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with SearchHashtagAll' });
    }
}

export const { Provider, Context } = createDataContext(
    SearchPlaylistReducer,
    { initPlaylist, SearchHashtag, SearchAll, SearchHashtagAll },
    { playList: null, dj: null, daily: null, hashtag: null, errorMessage: '' }
)