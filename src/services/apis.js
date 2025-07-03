const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
    SENDOTP_API: BASE_URL + '/auth/sendOTP',
    SIGNUP_API: BASE_URL + "/auth/signUp",
    LOGIN_API: BASE_URL + "/auth/login",
    AUTH0_LOGIN: BASE_URL + "/auth/auth0_login"
}

export const filepoints = {
    UPLOAD_FILE: BASE_URL + "/auth/file-upload",
    GET_USER_FILES: BASE_URL + "/auth/getUserFiles"
}

export const urlendpoints = {
    SHORTEN_URL: BASE_URL + "/url/shorten",
    GET_FILE_BY_URL: BASE_URL + "/url/:shortId"
}