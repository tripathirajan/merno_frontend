
import {
    HTTP_CODE_UNAUTHORIZED,
    HTTP_STATUS_CODE_CREATED,
    HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_CODE_PARAMETER_MISSING,
    HTTP_STATUS_CODE_SUCCESS,
    VENDOR_ADD,
    VENDOR_INFO,
    VENDOR_LIST
} from "../../constants";
import httpClient from "../../httpClient";
import { setVendorList, setVendoInfo } from "../slices/vendorSlice";


export const addVendor = ({
    name,
    email,
    address,
    contactNo,
    contactPersonName,
    contactPersonMobile,
    contactPersonEmail,
    isActive,
    lat,
    lng, image }) => async (dispatch) => {
        const result = { success: false, message: 'Please enter the values.' }
        if (!name || !email || !address || !contactNo || !contactPersonName || !contactPersonEmail || !contactPersonMobile) {
            return result;
        }
        const headers = {};
        let params = {
            name,
            email,
            address,
            contactNo,
            contactPersonName,
            contactPersonMobile,
            contactPersonEmail,
            isActive,
            lat,
            lng
        };

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

        const { status } = await httpClient.post(VENDOR_ADD, params, { headers });
        switch (status) {
            case HTTP_STATUS_CODE_CREATED:
                result.success = true;
                result.message = "Vendor added";
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
            default:
                break;
        }
        return result;
    }

export const getVendorList = (filters = {}) => async (dispatch) => {
    const result = { success: false, message: 'No records' }

    const { status, data } = await httpClient.get(VENDOR_LIST);
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
            dispatch(setVendorList(data));
            result.message = "Success";
            result.success = true;
            break;
        default:
            break;
    }
    return result;
}

export const getVendorInfo = (id) => async (dispatch) => {
    const result = { success: false, message: 'No records' }

    const { status, data } = await httpClient.get(`${VENDOR_INFO}?vendorId=${id}`);
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
            dispatch(setVendoInfo(data?.result));
            result.message = "Success";
            result.success = true;
            break;
        default:
            break;
    }
    return result;
}