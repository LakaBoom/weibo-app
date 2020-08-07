import * as api from '../api/comments';
import { message } from 'antd';
import { GET_COMMENTS, RESET_COMMENTS, ADD_COMMENT, REMOVE_COMMENT } from '../constants/actions';

export function createComment(params = {}, isFirst) {
    return async (dispatch) => {
        try {
            const result = await api.createComment(params);
            if (result) {
                message.success('Successfully comment!');
                if (!isFirst) {
                    dispatch({
                        type: ADD_COMMENT,
                        payload: result
                    })
                } else {
                    window.location.href = "/";
                }
            }
        } catch (e) {
            message.error(e.message || 'Failed');
        }
    }
}

export function getComments(params = {}) {
    return async (dispatch) => {
        const { comments = [], total_number = 0 } = await api.getComments(params);
        dispatch({
            type: GET_COMMENTS,
            payload: { comments, params, total: total_number },
        })
    }
}

export function resetComments() {
    return async (dispatch) => {
        dispatch({
            type: RESET_COMMENTS
        })
    }
}

export function deleteComment(params={}){
    return async (dispatch) =>{
        const {id} = await api.deleteComment(params);
        if(id){
            message.success('Successfully deleted!');
            dispatch({
                type:REMOVE_COMMENT,
                payload:id
            })
        }
    }
}