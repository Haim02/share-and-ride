import { publicRequest, userRequest } from '../../requestMethods';
import { requestsAction } from '../slice/request'

export const getMyRequests = async (dispatch) => { 
        dispatch(requestsAction.getrequestsStart());
        try {
             const response = await publicRequest.get(`/api/message/requests`);
             console.log(response)
          dispatch(requestsAction.getrequestsSuccess(response.data.message));
        } catch (error) {
          dispatch(requestsAction.getrequestsFailure(error.response));
        }
      };      
