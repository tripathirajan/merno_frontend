import {
    HTTP_STATUS_CODE_CREATED,
    HTTP_CODE_UNAUTHORIZED,
    HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_CODE_PARAMETER_MISSING,
    PRODUCT_ADD
} from "../../constants";
import httpClient from "../../httpClient";

/**
 * @description - add new product
 * @param {Object} param0 
 * @returns 
 */
export const addNewProduct = ({
    productName,
    description,
    sku,
    upc,
    vendor,
    brand,
    productCategory,
    packageType,
    stock,
    unit,
    currency,
    salePrice,
    regularPrice,
    isActive,
    image
}) => async (dispatch) => {
    const result = { success: false, message: 'Please enter the values.' }
    if (!productName ||
        !description ||
        !sku || !upc ||
        !vendor || !brand ||
        !packageType ||
        !productCategory ||
        (stock <= 0) || !unit || !currency ||
        (salePrice <= 0) || (regularPrice <= 0)) {
        return result;
    }
    const headers = {};
    let params = {
        productName,
        description,
        sku,
        upc,
        vendor,
        brand,
        productCategory,
        packageType,
        stock,
        unit,
        currency,
        salePrice,
        regularPrice,
        isActive
    };

    if (image) {
        const formData = new FormData();
        debugger
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

    const { status } = await httpClient.post(PRODUCT_ADD, params, headers);
    switch (status) {
        case HTTP_STATUS_CODE_CREATED:
            result.success = true;
            result.message = "Product added";
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