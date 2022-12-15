import httpClient, { httpClientPublic } from "../../httpClient";
import { setLogedinUserInfo, clearLogedinUserInfo } from "../slices/authSlice";
import { CHANGE_PASSWORD, FORGOT_PASSWORD, HTTP_CODE_UNAUTHORIZED, HTTP_STATUS_CODE_SUCCESS, LOGIN_URL, LOGOUT_URL, REFRESH_URL } from "../../constants";


export const login = ({ username, password }) => async (dispatch) => {
    const result = { success: false, message: '' };
    if (!username || !password) {
        return;
    }
    const { status, data } = await httpClientPublic.post(LOGIN_URL, { username, password });
    if (status !== HTTP_STATUS_CODE_SUCCESS) {
        result.message = "Incorrect username or password."
        return result;
    }
    dispatch(setLogedinUserInfo(data));
    result.success = true;
    result.message = 'Success';
    return result;
}

export const refreshToken = () => async (dispatch) => {
    // REFRESH_URL
    const { status, data } = await httpClient.get(REFRESH_URL);
    if (status !== HTTP_STATUS_CODE_SUCCESS) {
        return { status, data };
    }
    if (status === HTTP_CODE_UNAUTHORIZED) {
        return dispatch(clearLogedinUserInfo());
    }
    return dispatch(setLogedinUserInfo(data));
}

export const sendResetLink = (username) => async (dispatch) => {
    if (!username) {
        return;
    }

    await httpClient.post(FORGOT_PASSWORD, { username })
}

export const changePassword = ({ token, newPassword }) => async (dispatch) => {
    if (!token || !newPassword) {
        return;
    }
    const result = await httpClient.post(CHANGE_PASSWORD, { token, newPassword });
    console.log(result);
    return result;
}

export const logoutUser = () => async (dispatch) => {
    const { status } = await httpClient.post(LOGOUT_URL);
    if (status >= 300) {
        return false;
    }
    dispatch(clearLogedinUserInfo());

    return true;
}