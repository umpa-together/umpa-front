import createDataContext from './createDataContext';
import serverApi from 'api/serverApi';

const SearchPlaylistReducer = (state, action) => {
    switch(action.type){
        case 'initPlaylist':
            return { ...state, playList: null, playListNum: action.payload };
        case 'searchSongOrArtist':
            return { ...state, playList: action.payload };
        case 'searchHashtag' :
            return { ...state, playList: action.payload };  
        case 'searchAll':
            return { ...state, playList: action.payload.playlists, dj: action.payload.dj }  
        case 'error':
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

const initPlaylist = (dispatch) => async () => {
    try{
        const response = await serverApi.get('/initPlaylist');
        dispatch({ type: 'initPlaylist', payload: response.data.playlistNum });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with initPlaylist' });
    }
};

const SearchSongOrArtist = (dispatch) => async ({ id }) => {
    try {
        const response = await serverApi.get('/searchSongOrArtist/'+id);
        dispatch({ type: 'searchSongOrArtist', payload: response.data});
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with SearchSongOrArtist' });
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

export const { Provider, Context } = createDataContext(
    SearchPlaylistReducer,
    { SearchSongOrArtist, initPlaylist, SearchHashtag, SearchAll },
    { playList: null, playListNum: 0, dj: null, daily: null, errorMessage: '' }
)