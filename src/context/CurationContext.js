import createDataContext from './createDataContext';
import serverApi from '../api/serverApi';

const curationReducer = (state, action) => {
    switch(action.type) {
        case 'get_curation':
            return { ...state,  currentCuration: action.payload[0], currentCurationpost:action.payload[1] };
        case 'get_curationposts':
            return { ...state, maincurationposts:action.payload };
        case 'init_curationposts':
            return { ...state, curationposts:action.payload };
        case 'get_mycuration':
            return { ...state, mycurationpost:action.payload };
        case 'post_curation':
            return { ...state,  currentCuration: action.payload[0], currentCurationpost:  action.payload[1] };
        case 'edit_curation':
            return { ...state,  mycurationpost:action.payload[0], currentCurationpost:  action.payload[1] };            
        case 'like_curationpost':
            return { ...state,  currentCuration: action.payload[0], currentCurationpost:action.payload[1] };

        default:
            return state;
    }
};

const postCuration = dispatch => {
    return async ({ isSong, object, hidden, textcontent, id, }) => {
        try {
            const response = await serverApi.post('/curationpost/'+id, { isSong, object, hidden ,textcontent, });
            dispatch({ type: 'post_curation', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with postCuration' });
        }
    }
};

const editCuration = dispatch => {
    return async ({  hidden, textcontent, id }) => {
        try {
            const response = await serverApi.put('/curationpost/'+id, { hidden ,textcontent });
            dispatch({ type: 'edit_curation', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with postCuration' });
        }
    }
};
const deleteCuration = dispatch => {
    return async ({id}) => {
        try {
            const response = await serverApi.delete('/curationpost/'+id);
            dispatch({ type: 'get_curation', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with deleteCuration' });
        }
    }
};

const likecurationpost = dispatch => {
    return async ({id, songoralbumid}) => {
        try {
            const response = await serverApi.post('/curationpostlike/'+id+'/'+songoralbumid);
            dispatch({ type: 'like_curationpost', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with likecurationpost' });
        }
    }
};

const unlikecurationpost = dispatch => {
    return async ({id, songoralbumid}) => {
        try {
            const response = await serverApi.delete('/curationpostlike/'+id+'/'+songoralbumid);
            dispatch({ type: 'like_curationpost', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with unlikecurationpost' });
        }
    }
};

const initcurationposts = dispatch => {
    return async () => {
        try {
            dispatch({ type: 'init_curationposts', payload: null });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with initcurationposts' });
        }
    }
};

const getCuration = dispatch => {
    return async ({isSong,object,id}) => {
        try {
            const response = await serverApi.post('/curation/'+id, {isSong,object});
            dispatch({ type: 'get_curation', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with getCuration' });
        }
    }
};

const getCurationposts = dispatch => {
    return async () => {
        try {
            const response = await serverApi.get('/curationposts');
            dispatch({ type: 'get_curationposts', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with getCurationposts' });
        }
    }
};

const getmyCuration = dispatch => {
    return async ({ id }) => {
        try {
            const response = await serverApi.get('/mycurationpost/'+id);
            dispatch({ type: 'get_mycuration', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with getmyCuration' });
        }
    }
};

export const { Provider, Context } = createDataContext(
    curationReducer,
    { postCuration, editCuration ,deleteCuration, likecurationpost,unlikecurationpost, 
        initcurationposts, getCuration, getCurationposts, getmyCuration },
    { currentCuration:{}, currentCurationpost:[], mycurationpost:{}, curationposts: [], errorMessage: ''}
)