import { HTTP_CODE_UNAUTHORIZED, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR, HTTP_STATUS_CODE_PARAMETER_MISSING, HTTP_STATUS_CODE_SUCCESS, MASTER_BRAND_ADD, MASTER_BRAND_LIST, MASTER_BRAND_UPDATE, MASTER_CURRENCY_ADD, MASTER_CURRENCY_LIST, MASTER_CURRENCY_UPDATE, MASTER_PACKAGE_TYPE_ADD, MASTER_PACKAGE_TYPE_LIST, MASTER_PACKAGE_TYPE_UPDATE, MASTER_PRODUCT_CATEGORY_ADD, MASTER_PRODUCT_CATEGORY_LIST, MASTER_PRODUCT_CATEGORY_UPDATE, MASTER_UNIT_ADD, MASTER_UNIT_LIST, MASTER_UNIT_UPDATE } from "../../constants";
import httpClient from "../../httpClient";
import { setBrandList, setCurrencyList, setPackageTypeList, setProductCategoryList, setUnitList } from "../slices/masterSlice";

// TODO: Move duplicate code at common place and use

// product category

/**
 * @description add new product category
 * @param {Object} param0
 * @returns
 */
export const addProductCategory = ({ name, description, isActive }) => async (dispatch) => {
    const result = { success: false, message: 'Please enter the values.' }
    if (!name || !description) {
        return result;
    }
    const { status } = await httpClient.post(MASTER_PRODUCT_CATEGORY_ADD, { name, description, isActive });
    switch (status) {
        case HTTP_STATUS_CODE_CREATED:
            result.success = true;
            result.message = "Product category added";
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

/**
 * @description update product category
 * @param {Object} param0
 * @returns
 */
export const updateProductCategory = ({ id, name, description, isActive }) => async (dispatch) => {
    const result = { success: false, message: 'Please enter the values.' }
    if (!name || !description) {
        return result;
    }
    const { status } = await httpClient.put(MASTER_PRODUCT_CATEGORY_UPDATE, { id, name, description, isActive });
    switch (status) {
        case HTTP_STATUS_CODE_SUCCESS:
            result.success = true;
            result.message = "Product category updated";
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

/**
 * @description get product category list
 * @param {Object} filters
 * @returns
 */
export const getProductCategoryList = (filters = {}) => async (dispatch) => {
    const result = { success: false, message: 'No records' }

    const { status, data } = await httpClient.get(MASTER_PRODUCT_CATEGORY_LIST);
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
            dispatch(setProductCategoryList(data));
            result.message = "Success";
            result.success = true;
            break;
        default:
            break;
    }
    return result;
}

// brand actions

/**
 * @description get brand list
 * @param {Object} filter
 * @returns
 */
export const getBrandList = (filter = {}) => async (dispatch) => {
    const result = { success: false, message: 'No records' };
    const { status, data } = await httpClient.get(MASTER_BRAND_LIST);
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
            dispatch(setBrandList(data));
            result.message = "Success";
            result.success = true;
            break;
        default:
            break;
    }
    return result;
}

/**
 * @description add new brand
 * @param {Object} param0
 * @returns
 */
export const addBrand = ({ name, description, isActive }) => async (dispatch) => {
    const result = { success: false, message: 'Please enter the values.' }
    if (!name || !description) {
        return result;
    }
    const { status } = await httpClient.post(MASTER_BRAND_ADD, { name, description, isActive });
    switch (status) {
        case HTTP_STATUS_CODE_CREATED:
            result.success = true;
            result.message = "Brand added";
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

/**
 * @description update brand info
 * @param {Object} param0
 * @returns
 */
export const updateBrand = ({ id, name, description, isActive }) => async (dispatch) => {
    const result = { success: false, message: 'Please enter the values.' }
    if (!name || !description) {
        return result;
    }
    const { status } = await httpClient.put(MASTER_BRAND_UPDATE, { id, name, description, isActive });
    switch (status) {
        case HTTP_STATUS_CODE_SUCCESS:
            result.success = true;
            result.message = "Brand updated";
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

// package type

/**
 * @description get package type list
 * @param {Object} filter
 * @returns
 */
export const getPackageTypeList = (filter = {}) => async (dispatch) => {
    const result = { success: false, message: 'No records' };
    const { status, data } = await httpClient.get(MASTER_PACKAGE_TYPE_LIST);
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
            dispatch(setPackageTypeList(data));
            result.message = "Success";
            result.success = true;
            break;
        default:
            break;
    }
    return result;
}

/**
 * @description add new package type
 * @param {Object} param0
 * @returns
 */
export const addPackageType = ({ name, description, isActive }) => async (dispatch) => {
    const result = { success: false, message: 'Please enter the values.' }
    if (!name || !description) {
        return result;
    }
    const { status } = await httpClient.post(MASTER_PACKAGE_TYPE_ADD, { name, description, isActive });
    switch (status) {
        case HTTP_STATUS_CODE_CREATED:
            result.success = true;
            result.message = "Package-Type added";
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

/**
 * @description update package type info
 * @param {Object} param0
 * @returns
 */
export const updatePackageType = ({ id, name, description, isActive }) => async (dispatch) => {
    const result = { success: false, message: 'Please enter the values.' }
    if (!name || !description) {
        return result;
    }
    const { status } = await httpClient.put(MASTER_PACKAGE_TYPE_UPDATE, { id, name, description, isActive });
    switch (status) {
        case HTTP_STATUS_CODE_SUCCESS:
            result.success = true;
            result.message = "Package-Type updated";
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

// currency

/**
 * @description get currency list
 * @param {Object} filter
 * @returns
 */
export const getCurrencyList = (filter = {}) => async (dispatch) => {
    const result = { success: false, message: 'No records' };
    const { status, data } = await httpClient.get(MASTER_CURRENCY_LIST);
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
            dispatch(setCurrencyList(data));
            result.message = "Success";
            result.success = true;
            break;
        default:
            break;
    }
    return result;
}

/**
 * @description add new currency
 * @param {Object} param0
 * @returns
 */
export const addCurrency = ({ name, description, isActive }) => async (dispatch) => {
    const result = { success: false, message: 'Please enter the values.' }
    if (!name || !description) {
        return result;
    }
    const { status } = await httpClient.post(MASTER_CURRENCY_ADD, { name, description, isActive });
    switch (status) {
        case HTTP_STATUS_CODE_CREATED:
            result.success = true;
            result.message = "Currency added";
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

/**
 * @description update currency info
 * @param {Object} param0
 * @returns
 */
export const updateCurrency = ({ id, name, description, isActive }) => async (dispatch) => {
    const result = { success: false, message: 'Please enter the values.' }
    if (!name || !description) {
        return result;
    }
    const { status } = await httpClient.put(MASTER_CURRENCY_UPDATE, { id, name, description, isActive });
    switch (status) {
        case HTTP_STATUS_CODE_SUCCESS:
            result.success = true;
            result.message = "Currency updated";
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

// units


/**
 * @description get unit list
 * @param {Object} filter
 * @returns
 */
export const getUnitList = (filter = {}) => async (dispatch) => {
    const result = { success: false, message: 'No records' };
    const { status, data } = await httpClient.get(MASTER_UNIT_LIST);
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
            dispatch(setUnitList(data));
            result.message = "Success";
            result.success = true;
            break;
        default:
            break;
    }
    return result;
}

/**
 * @description add new unit
 * @param {Object} param0
 * @returns
 */
export const addUnit = ({ name, description, isActive }) => async (dispatch) => {
    const result = { success: false, message: 'Please enter the values.' }
    if (!name || !description) {
        return result;
    }
    const { status } = await httpClient.post(MASTER_UNIT_ADD, { name, description, isActive });
    switch (status) {
        case HTTP_STATUS_CODE_CREATED:
            result.success = true;
            result.message = "Unit added";
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

/**
 * @description update unit info
 * @param {Object} param0
 * @returns
 */
export const updateUnit = ({ id, name, description, isActive }) => async (dispatch) => {
    const result = { success: false, message: 'Please enter the values.' }
    if (!name || !description) {
        return result;
    }
    const { status } = await httpClient.put(MASTER_UNIT_UPDATE, { id, name, description, isActive });
    switch (status) {
        case HTTP_STATUS_CODE_SUCCESS:
            result.success = true;
            result.message = "Unit updated";
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