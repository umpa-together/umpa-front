import createDataContext from './createDataContext';
import serverApi from '../api/serverApi';

const curationReducer = (state, action) => {
    switch(action.type) {
        case 'get_curation':
            return { ...state, currentCuration: action.payload[0], currentCurationpost:action.payload[1] };
        case 'get_curationposts':
            return { ...state, maincurationposts:action.payload, currentCurationPage: 1, notNext: false };
        case 'nextCurationPosts':
            return { ...state, maincurationposts: state.maincurationposts.concat(action.payload), currentCurationPage: state.currentCurationPage + 1 }
        case 'notNext':
            return { ...state, notNext: true };
        case 'getAllCurationPost':
            return { ...state, allCurationPost: action.payload, currentAllCurationPage: 1, notAllCurationNext: false}
        case 'nextAllCurationPost':
            return { ...state, allCurationPost: state.allCurationPost.concat(action.payload), currentAllCurationPage: state.currentCurationPage + 1 }
        case 'notAllCurationNext':
            return { ...state, notAllCurationNext: true };
        case 'init_curationposts':
            return { ...state, curationposts:action.payload };
        case 'get_mycuration':
            return { ...state, mycurationpost:action.payload };
        case 'post_curation':
            return { ...state, currentCuration: action.payload[0], currentCurationpost:  action.payload[1] };
        case 'edit_curation':
            return { ...state, mycurationpost:action.payload[0], currentCurationpost:  action.payload[1] };            
        case 'like_curationpost':
            return { ...state, currentCuration: action.payload[0], currentCurationpost:action.payload[1] };
        case 'add_comment':
            return { ...state, comments: action.payload[1] };  
        case 'get_comment' :
            return { ...state, comments: action.payload};          

        default:
            return state;
    }
};

const postCuration = dispatch => {
    return async ({ isSong, object, hidden, textcontent, id,anonymous }) => {
        try {
            const response = await serverApi.post('/curationpost/'+id, { isSong, object, hidden ,textcontent,anonymous });
            dispatch({ type: 'post_curation', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with postCuration' });
        }
    }
};

const editCuration = dispatch => {
    return async ({  hidden, textcontent, id,anonymous }) => {
        try {
            const response = await serverApi.put('/curationpost/'+id, { hidden ,textcontent ,anonymous});
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

const nextCurationposts = (dispatch) => async ({ page }) => {
    try {
        const response = await serverApi.get('/curationposts/'+page);
        if(response.data.length != 0){
            dispatch({ type: 'nextCurationPosts', payload: response.data });
        }else{
            dispatch({ type: 'notNext'});
        }
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with nextCurationposts' });
    }
}

const getAllCurationPost = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/allCurationPost');
        dispatch({ type: 'getAllCurationPost', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getAllCurationPost' });

    }
}

const nextAllCurationPost = (dispatch) => async ({ page }) => {
    try {
        const response = await serverApi.get('/allCurationPost/'+page);
        if(response.data.length != 0){
            dispatch({ type: 'nextAllCurationPost', payload: response.data });
        }else{
            dispatch({ type: 'notAllCurationNext'});
        }
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with nextAllCurationPost' });
    }
}

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

const addComment = dispatch => {
    return async ({ id, text }) => {
        try {
            const response = await serverApi.post('/curationcomment/'+id,{text});
            dispatch({ type: 'add_comment', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with getmyCuration' });
        }
    }
};

const deleteComment = dispatch => {
    return async ({ id, commentid}) => {
        try {
            const response = await serverApi.delete('/curationcomment/'+id+'/'+commentid);
            dispatch({ type: 'add_comment', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with getmyCuration' });
        }
    }
};


const getComment = dispatch => {
    return async ({id}) => {
        try {
            const response = await serverApi.get('/curationcomment/'+id);
            dispatch({ type: 'get_comment', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with getmyCuration' });
        }
    }
};


export const { Provider, Context } = createDataContext(
    curationReducer,
    { postCuration, getComment ,addComment, deleteComment, editCuration ,deleteCuration, likecurationpost,unlikecurationpost, 
        initcurationposts, getCuration, getCurationposts, nextCurationposts, getmyCuration, getAllCurationPost, nextAllCurationPost },
    { currentCuration:{}, currentCurationPage: 1, notNext: false, allCurationPost: null, currentAllCurationPage: 1, notAllCurationNext: false, 
        currentCurationpost:[], mycurationpost:{}, curationposts: [], errorMessage: '', comments:[] }
)