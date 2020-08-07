export const ACCESS_TOKEN_KEY = 'weibo_app_access_token';
export const USER_ID = 'weibo_app_user_id';

export const APP_KEY = "900763234";
export const APP_SECRET = "7e3a844f94b35f70f0538797f12a7056";

export const REDIRECT_URI = encodeURIComponent("http://baidu.com:3000/login") ;
export const LOGIN_URL = `https://api.weibo.com/oauth2/authorize?client_id=${APP_KEY}&response_type=code&redirect_uri=${REDIRECT_URI}`;

export const getAccessCode = (code) => `/proxy/oauth2/access_token?client_id=${APP_KEY}&client_secret=${APP_SECRET}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}&code=${code}`;

export const COMMENT_PAGESIZE = 5;