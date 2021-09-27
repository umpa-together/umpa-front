import createDataContext from './createDataContext';
import serverApi from 'api/serverApi';

const searchReducer = (state, action) => {
    switch(action.type) {
        case 'searchsong':
            return { ...state, songData: action.payload[0], songNext: action.payload[1] };
        case 'searchartist':
            return { ...state, artistData: action.payload[0], artistNext: action.payload[1].next };
        case 'searchalbum':
            return { ...state, albumData: action.payload[0], albumNext: action.payload[1].next };
        case 'songNext':
            return { ...state, songData: [...state.songData, action.payload] };
        case 'artistNext':
            return { ...state, artistData: [...state.artistData, action.payload] };
        case 'setSongNext':
            return { ...state, songNext: action.payload };
        case 'setArtistNext':
            return { ...state, artistNext: action.payload };
        case 'error':
            return { ...state, errorMessage: action.payload };
        case 'searchinit' :
            return { ...state, users: [], hint: [], songData: [] };
        case 'initHint':
            return { ...state, hint: [], hashtagHint: [], djHint: [], songData: [] };
        case 'searchHint':
            return { ...state, hint: action.payload };
        case 'hashtagHint':
            return { ...state, hashtagHint: action.payload };
        case 'djHint':
            return { ...state, djHint: action.payload };
        case 'currentHashtag':
            return { ...state, currentHashtag: action.payload };
        default:
            return state;
    }
};

const initHint = (dispatch) => async() => {
    try {
        dispatch({ type: 'initHint' });
    } catch (err){
        dispatch({ type: 'error', payload: 'Something went wrong with initHint' });
    }
}
const searchsong = (dispatch) => async ({ songname }) => {
    try {
        const response = await serverApi.get('/search/'+songname );
        dispatch({ type: 'searchsong', payload: response.data });
    } catch (err){
        dispatch({ type: 'error', payload: 'Something went wrong with searchsong' });
    }
};

const searchartist= (dispatch) => async ({ artistname }) => {
    try {
        const response = await serverApi.get('/searchartist/'+artistname );
        dispatch({ type: 'searchartist', payload: response.data });
    } catch (err){
        dispatch({ type: 'error', payload: 'Something went wrong with searchsong' });
    }
};

const searchalbum= (dispatch) => async ({ albumname }) => {
    try {
        const response = await serverApi.get('/searchalbum/'+albumname );
        dispatch({ type: 'searchalbum', payload: response.data });
    } catch (err){
        dispatch({ type: 'error', payload: 'Something went wrong with searchsong' });
    }
};

const songNext = (dispatch) => async({ next }) => {
    try {
        const response = await serverApi.get('/searchNext/'+next);
        for(let key in response.data[0]){
            dispatch({ type: 'songNext', payload: response.data[0][key] });
        }
        dispatch({ type: 'setSongNext', payload: response.data[1]});
    } catch (err){
        dispatch({ type: 'error', payload: 'Something went wrong with songNext' });
    }
}

const artistNext = (dispatch) => async({ next }) => {
    try {
        const response = await serverApi.get('/searchNext/'+next);
        for(let key in response.data[0]){
            dispatch({ type: 'artistNext', payload: response.data[0][key] });
        }
        dispatch({ type: 'setArtistNext', payload: response.data[1]});
    } catch (err){
        dispatch({ type: 'error', payload: 'Something went wrong with artistNext' });
    }
}

const searchHint = (dispatch) => async({ term }) => {
    try {
        const response = await serverApi.get('/searchHint/'+term);
        dispatch({ type: 'searchHint', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with searchHint' });
    }
}

const searchinit = (dispatch) => async () => {
    try {
        dispatch({ type: 'searchinit' });
    } catch (err){
        dispatch({ type: 'error', payload: 'Something went wrong with searchinit' });
    }
};

const hashtagHint = (dispatch) => async({ term }) => {
    try {
        const response = await serverApi.get('/hashtagHint/'+term);
        dispatch({ type: 'hashtagHint', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with hashtagHint' });
    }
};

const djHint = (dispatch) => async({ term }) => {
    try {
        const response = await serverApi.get('/djHint/'+term);
        dispatch({ type: 'djHint', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with djHint' });
    }
}

const currentHashtag = (dispatch) => async() => {
    try {
        const response = await serverApi.get('/currentHashtag');
        dispatch({ type: 'currentHashtag', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with currentHashtag' });
    }
}

export const { Provider, Context } = createDataContext(
    searchReducer,
    { initHint, searchsong, searchalbum,searchinit, songNext, artistNext, searchartist, searchHint, hashtagHint, djHint, currentHashtag },
    { songData: [], songNext: [], artistData: [], artistNext: [], albumData: [], albumNext: [], users: [], errorMessage: '', hint: [], hashtagHint: [], djHint: [], currentHashtag: null  }
)