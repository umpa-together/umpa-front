import createDataContext from './createDataContext';
import serverApi from '../api/serverApi';

const chatReducer = (state, action) => {
    switch(action.type) {
        case 'post_Chat':
            return { ...state, chatroom: action.payload };  
        case 'block_Chat' : 
            return {...state, chatroom:action.payload};
        case 'receive_Msg':
            return { ...state, chatroom: action.payload };      
        case 'get_list' : 
            return {...state, chatlist: action.payload}
           
        default:
            return state;
    }
};

const postChat = (dispatch) => async ({participate}) => {
    try {
        const response = await serverApi.post('/chat', {participate});
        dispatch({ type: 'post_Chat', payload:response.data });

    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with report' });
    }
}

const gotoChat = (dispatch) => async ({chatid}) => {
    try {
        const response = await serverApi.get('/gotochat/'+chatid);
        dispatch({ type: 'post_Chat', payload:response.data });

    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with report' });
    }
}

const receiveMsg = (dispatch) => async ({chat}) =>{
    try{
        dispatch({ type: 'receive_Msg', payload:chat });

    } catch(err) {
        dispatch({ type: 'error', payload: 'Something went wrong with report' });

    }

}
const getlist = (dispatch) => async () =>{
    try{
        const response = await serverApi.get('/chatlist');

        dispatch({ type: 'get_list', payload:response.data });

    } catch(err) {
        dispatch({ type: 'error', payload: 'Something went wrong with report' });

    }

}

const blockchat = (dispatch) => async ({chatid}) => {
    try {
        const response = await serverApi.post('/blockchat', {chatid});
        dispatch({ type: 'block_Chat', payload:response.data });

    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with report' });
    }
}


const unblockchat = (dispatch) => async ({chatid}) => {
    try {
        const response = await serverApi.post('/unblockchat', {chatid});
        console.log(response.data);
        dispatch({ type: 'block_Chat', payload:response.data });

    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with report' });
    }
}




export const { Provider, Context } = createDataContext(
    chatReducer,
    { postChat,gotoChat,getlist, unblockchat,receiveMsg,blockchat },
    {  chatroom:null, chatlist: []}
);