import createDataContext from './createDataContext';
import serverApi from '../api/serverApi';

const DJReducer = (state, action) => {
    switch(action.type) {
        case 'recommendDJ':
            return { ...state, recommendDJ: action.payload };
        case 'getSongs':
            return { ...state, songs: action.payload };
        case 'error':
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

const getSongs = (dispatch) => async ({ id }) => {
    try{
        const response = await serverApi.get('/getSongs/'+id);
        dispatch({ type: 'getSongs', payload: response.data });
    }catch(err){
        dispatch({ type: 'error', payload: 'Something went wrong with getSongs' });
    }
};
const setSongs = (dispatch) => async ({ songs }) => {
    try {
        const response = await serverApi.post('/setSongs', {songs: songs});
        dispatch({ type: 'getSongs', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with setSongs' });
    }
};
const editSongs = (dispatch) => async ({songs}) => {
    try {
        const response = await serverApi.post('/editSongs', {songs: songs});
        dispatch({ type: 'getSongs', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with editSongs' });
    }
};

const recommendDJ = (dispatch) => async() => {
    try {
        const response = await serverApi.get('/recommendDJ');
        dispatch({ type: 'recommendDJ', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with recommendDJ' });
    }
};

const tmp = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/tmp');
        console.log(response.data)
        //dispatch({ type: 'recommendDJ', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with recommendDJ' });
    }
}


export const { Provider, Context } = createDataContext(
    DJReducer,
    { getSongs, setSongs, editSongs, recommendDJ, tmp },
    { songs: null, errorMessage: '', recommendDJ: null }
)