
import httpClient from "../../httpClient";
import {
    HTTP_CODE_UNAUTHORIZED,
    HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_CODE_SUCCESS,
    COMBO_LIST
} from "../../constants";
import { setComboList } from "../slices/comboSlice";

export const getCombos = (combos = []) => async (dispatch) => {
    const result = { success: false, message: 'No records' }

    if (!combos) return;
    const { status, data } = await httpClient.get(`${COMBO_LIST}?combos=${JSON.stringify(combos)}`);

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
            dispatch(setComboList(data?.items || []));
            result.message = "Success";
            result.success = true;
            break;
        default:
            break;
    }
    return result;
}