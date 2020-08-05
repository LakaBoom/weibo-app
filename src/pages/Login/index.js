import React, { useEffect } from 'react';
import queryString from 'query-string';
import {useDispatch} from 'redux-react-hook';
import {getAccess} from 'actions/auth';

const Login = () =>{
    const dispatch  = useDispatch();
    const { query : {code}} = queryString.parseUrl(window.location.href);
    useEffect(() => {
        dispatch(getAccess({code}))
    }, [dispatch, code])
    return (
        <div></div>
    )
}

export default Login;