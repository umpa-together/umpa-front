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

export const { Provider, Context } = createDataContext(
    SearchPlaylistReducer,
    { SearchSongOrArtist, initPlaylist, SearchHashtag },
    { playList: null, playListNum: 0, errorMessage: '' }
)