import { HTTP_CODE_UNAUTHORIZED, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR, HTTP_STATUS_CODE_PARAMETER_MISSING, HTTP_STATUS_CODE_SUCCESS, USER_MGT_ADD, USER_MGT_INFO, USER_MGT_LIST, USER_PROFILE_INFO, USER_PROFILE_RESET_PASSWORD, USER_PROFILE_UPDATE } from "../../constants";
import httpClient from "../../httpClient";
import { updateProfileField } from "../slices/authSlice";
import { setUserInfo, setUserList } from "../slices/userSlice";


export const updateUserProfile = ({ fullName, email, image, imageAction }) => async (dispatch) => {
    if (!fullName || !email) return false;
    const headers = {};
    let params = {
        fullName,
        email,
        imageAction
    };

    // image upload
    if (image) {
        const formData = new FormData();
        formData.append(
            "image",
            image,
            image?.name
        );
        const formParams = Object.keys(params);
        for (const param of formParams) {
            formData.append(param, params[param]);
        }
        params = formData;
        headers["Content-Type"] = "multipart/form-data";
    }
    const { status, data: { data: payload } } = await httpClient.put(USER_PROFILE_UPDATE, params, { headers });
    const result = { success: false, message: 'Please enter the values.' };
    switch (status) {
        case HTTP_STATUS_CODE_SUCCESS:
            result.success = true;
            result.message = "Profile updated";
            dispatch(setUserInfo(payload));
            dispatch(updateProfileField([{ name: 'fullName', value: payload?.fullName }, { name: 'image', value: payload?.image }]));
            break;
        case HTTP_CODE_UNAUTHORIZED:
            result.message = "You have to re-login, session has expired.";
            result.success = false;
            break;
        case HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR:
            result.message = "Something went wrong. Please try again later.";
            result.success = false;
            break;
        default:
            break;
    }
    return result;
}

export const getUserProfile = () => async (dispatch) => {
    const { status, data: { data: payload } } = await httpClient.get(USER_PROFILE_INFO);
    const result = { success: false, message: 'Please enter the values.' };

    switch (status) {
        case HTTP_STATUS_CODE_SUCCESS:
            result.success = true;
            result.message = "Successs";
            dispatch(setUserInfo(payload));
            break;
        case HTTP_CODE_UNAUTHORIZED:
            result.message = "You have to re-login, session has expired.";
            result.success = false;
            break;
        case HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR:
            result.message = "Something went wrong. Please try again later.";
            result.success = false;
            break;
        default:
            break;
    }
    return result;
}

export const resetPassword = ({ currentPassword, newPassword, confirmNewPassword }) => async (dispatch) => {
    const result = { success: false, message: 'Please enter the values.' };
    if (!currentPassword || !newPassword) {
        return result;
    }
    if (currentPassword === newPassword) {
        result.message = "New password can't be same current password.";
        return result;
    }
    if (newPassword !== confirmNewPassword) {
        result.message = "Password does not match.";
        return result;
    }
    const { status, data } = await httpClient.patch(USER_PROFILE_RESET_PASSWORD, { currentPassword, newPassword, confirmNewPassword });
    switch (status) {
        case HTTP_STATUS_CODE_SUCCESS:
            result.success = true;
            result.message = "Successs";
            break;
        case HTTP_STATUS_CODE_PARAMETER_MISSING:
            result.message = data?.message || "Unable to update password";
            result.success = false;
            break;
        case HTTP_CODE_UNAUTHORIZED:
            result.message = "You have to re-login, session has expired.";
            result.success = false;
            break;
        case HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR:
            result.message = "Something went wrong. Please try again later.";
            result.success = false;
            break;
        default:
            break;
    }
    return result;
}

export const getUserList = (filters = {}) => async (dispatch) => {
    const result = { success: false, message: 'No records' }

    const { status, data } = await httpClient.get(USER_MGT_LIST);
    switch (status) {
        case HTTP_CODE_UNAUTHORIZED:
            result.message = "You have to re-login, session has expired.";
            result.success = false;
            break;
        case HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR:
            result.message = "Something went wrong. Please try again later.";
            result.success = false;
            break;
        case HTTP_STATUS_CODE_SUCCESS:
            dispatch(setUserList(data));
            result.message = "Success";
            result.success = true;
            break;
        default:
            break;
    }
    return result;
}

export const addNewUser = (data) => async (dispatch) => {
    const { fullName, username, email, password, isActive, role } = data;
    const result = { success: false, message: 'Unable to create user. Please try again.' }
    if (!fullName || !username || !password || !isActive || !role || !email) {
        return result;
    }
    const { status, data: { message } } = await httpClient.post(USER_MGT_ADD, { fullName, username, password, email, roles: [role], isActive });
    switch (status) {
        case HTTP_STATUS_CODE_CREATED:
            result.success = true;
            result.message = "User added successfully!";
            break;
        case HTTP_CODE_UNAUTHORIZED:
            result.message = "You have to re-login, session has expired.";
            result.success = false;
            break;
        case HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR:
            result.message = "Something went wrong. Please try again later.";
            result.success = false;
            break;
        case HTTP_STATUS_CODE_PARAMETER_MISSING:
            result.message = message;
            result.success = false;
            break;
        default:
            break;
    }
    return result;
}

export const getUserDetails = (id) => async (dispatch) => {
    const result = { success: false, message: 'No records' }
    if (!id) return result;

    const { status, data } = await httpClient.get(`${USER_MGT_INFO}?userId=${id}`);
    switch (status) {
        case HTTP_CODE_UNAUTHORIZED:
            result.message = "You have to re-login, session has expired.";
            result.success = false;
            break;
        case HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR:
            result.message = "Something went wrong. Please try again later.";
            result.success = false;
            break;
        case HTTP_STATUS_CODE_SUCCESS:
            dispatch(setUserInfo(data?.data));
            result.message = "Success";
            result.success = true;
            break;
        default:
            break;
    }
    return result;
}