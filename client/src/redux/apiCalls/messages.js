import { publicRequest, userRequest } from '../../requestMethods';
import { messagesAction } from '../slice/messages'

export const getUserMessages = async (dispatch) => { 
        dispatch(messagesAction.getMessagesStart());
        try {
             const response = await publicRequest.get(`/api/message/messages`);
          dispatch(messagesAction.getMessagesSuccess(response.data.message));
        } catch (error) {
          dispatch(messagesAction.getMessagesFailure(error.response));
        }
      };      

export const createMessage = async (dispatch, message) => {
        dispatch(messagesAction.createMessagesStart());
        try {
          const response = await userRequest.post('/api/message/createMessage', message);
          dispatch(messagesAction.createMessagesSuccess(response.data.message));
          alert('הודעה נשלחה בהצלחה')
        } catch (error) {
          console.log(error.message);
          dispatch(messagesAction.createMessagesFailure());
        }
      }; 
      
export const updateMessage = async (dispatch, id, messageStatus) => {
        dispatch(messagesAction.updateMessagesStart());
        try {
          const response = await userRequest.patch(`/api/message/${id}`, messageStatus);
          console.log('res',response.data.message)
          dispatch(messagesAction.updateMessagesSuccess({ id: id, message: response.data.message}));
        } catch (error) {
            console.log('err',error)
          dispatch(messagesAction.updateMessagesFailure());
        }
      };   
    