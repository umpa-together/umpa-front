import createDataContext from './createDataContext';
import serverApi from '../api/serverApi';
import AsyncStorage from '@react-native-community/async-storage';


const NoticeReducer = (state, action) => {
    switch(action.type){
            case 'get_notice':
                return { ...state, notice: action.payload, currentNoticePage: 1};
            case 'nextNotice':
                  return { ...state, notice: state.notice.concat(action.payload), currentNoticePage: state.currentNoticePage + 1}
            case 'set_token' :
                return {...state , token : action.payload};
            case 'error':
                return { ...state, errorMessage: action.payload };
            default:
                return state;
    }
};

const getnotice = (dispatch) => async () => {
      try {
            const response = await serverApi.get('/notice');
            dispatch({ type: 'get_notice', payload: response.data});
      } catch (err) {
            dispatch({ type: 'error', payload: 'Something went wrong with SearchHashtag' });
      }
};

const nextNotice = (dispatch) => async ({page}) => {
      try {
            const response = await serverApi.get('/nextNotice/' + page);
            if(response.data.length != 0) dispatch({ type: 'nextNotice', payload: response.data});
      } catch (err) {
            dispatch({ type: 'error', payload: 'Something went wrong with nextNotice' });
      }  
}

const deletenotice = (dispatch) => async ({ id }) => {
      try {
            await serverApi.delete('/notice/'+id);
      } catch (err) {
            dispatch({ type: 'error', payload: 'Something went wrong with SearchHashtag' });
      }
};

const setnoticetoken = (dispatch) => async () => {
      try {
            const noticetoken = await AsyncStorage.getItem('noticetoken');
            await serverApi.put('/setnotice/'+noticetoken);
      } catch (err) {
            dispatch({ type: 'error', payload: 'Something went wrong with SearchHashtag' });
      }
};

const deletenoticetoken = (dispatch) => async () => {
      try {
            const response = await serverApi.put('/deletenotice');
      } catch (err) {
            dispatch({ type: 'error', payload: 'Something went wrong with SearchHashtag' });
      }
};


export const { Provider, Context } = createDataContext(
    NoticeReducer,
    { deletenoticetoken, getnotice, deletenotice, setnoticetoken, nextNotice },
    { notice: null, errorMessage: '', currentNoticePage: 0 }
)