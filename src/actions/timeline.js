import * as api from '../api/timeline';
import { GET_HOME_TIMELINE } from '../constants/actions';

export function getHomeTimeLine(payload={}){
    return async (dispatch)=>{
        const result = await api.getHomeTimeLine(payload);
        dispatch({
            type:GET_HOME_TIMELINE,
            payload:result
        })
    }
}