import * as api from '../api/account';
import {message} from 'antd';
import { ACCESS_TOKEN_KEY } from '../constants';

export function getAccess(params = {}){
    return async ()=>{
        try{
            const {access_token}  = await api.getAccess(params);
            localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
        } catch(e){
            message.error('Login Error');
        }
        window.location.href = "/";
    }
}