import axios from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, HTTP_CODE_UNAUTHORIZED, REFRESH_URL } from '../constants';
import store from '../storage';
import { logoutUser, refreshToken } from '../storage/actions/authAction';
import { setPageLoadingOFF, setPageLoadingON } from '../storage/slices/uiSlices';

const dispatch = store.dispatch;

// for public requests
export const httpClientPublic = axios.create({
    baseURL: API_BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    withCredentials: true,
    credentials: 'include'
});

httpClientPublic.interceptors.response.use((response) => {
    return response;
}, (err) => {
    return err;
})

// http client for authorized request
const httpClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    withCredentials: true,
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

httpClient.interceptors.request.use(function (config) {
    dispatch(setPageLoadingON());
    // modifying request
    const accessToken = store.getState()?.auth?.accessToken;
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config
}, function (error) {
    dispatch(setPageLoadingOFF());
    // request error
    console.error("Request Error: ", error);
}
);

httpClient.interceptors.response.use(response => {
    dispatch(setPageLoadingOFF());
    return response;
}, async function (error) {
    dispatch(setPageLoadingOFF());
    // response error handling globally
    const prevRequest = error?.config;
    if (error?.response?.status === HTTP_CODE_UNAUTHORIZED && prevRequest?.url !== REFRESH_URL) {
        await dispatch(refreshToken());
        const accessToken = store.getState()?.auth?.accessToken;
        prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return await httpClient[prevRequest.method](prevRequest?.url, prevRequest.headers);
    }
    return { status: error?.response?.status, data: error?.response?.data }
});

export default httpClient;