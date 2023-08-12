// API
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const DEFAULT_TIMEOUT = process.env.REACT_APP_DEFAULT_TIMEOUT;

// default image
export const IMAGE_NOT_AVAILABLE = process.env.REACT_APP_IMAGE_NOT_AVAILABLE;
export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_MAP_API_KEY;
// layout sizes
export const HEADER_MOBILE = 64;
export const HEADER_DESKTOP = 64;
export const DRAWER_WIDTH = 250;

// alert severity
export const ALERT_TYPE_ERROR = "error";
export const ALERT_TYPE_SUCCESS = "success";
export const ALERT_TYPE_INFO = "info";
export const ALERT_TYPE_WARNING = "warning";

// string constants
export const DATETIME_FORMAT = 'MM/DD/YYYY HH:mm A';
export const ERR_NETWORK = "ERR_NETWORK";
// image action
export const IMAGE_ACTION_NONE = 'none';
export const IMAGE_ACTION_UPDATE = 'change';
export const IMAGE_ACTION_RESET = 'reset';

// http status code
export const HTTP_STATUS_CODE_SUCCESS = 200;
export const HTTP_STATUS_CODE_PARAMETER_MISSING = 422;
export const HTTP_STATUS_CODE_CREATED = 201;
export const HTTP_STATUS_CODE_NOT_FOUND = 404;
export const HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR = 500;
export const HTTP_CODE_UNAUTHORIZED = 401;

//------Combos ------
export const COMBO_TYPE_VENDOR = 'vendor';
export const COMBO_TYPE_BRAND = 'brand';

// -------- API End points --------

// auth
export const LOGIN_URL = '/auth/login';
export const FORGOT_PASSWORD = '/auth/sendPassResetLink';
export const CHANGE_PASSWORD = 'auth/changePassword';
export const LOGOUT_URL = 'auth/logout';
export const REFRESH_URL = '/auth/refresh';

// product
export const PRODUCT_LIST = '/product/list';
export const PRODUCT_ADD = '/product/add';
export const PRODUCT_INFO = '/product/info';
export const PRODUCT_UPDATE = '/product/update';
export const PRODUCT_DELETE = '/product/delete';

// cart
export const CART_LIST = '/cart/list';
export const CART_ADD = '/cart/add';

// product category
export const MASTER_PRODUCT_CATEGORY_ADD = "/master/addProductCategory";
export const MASTER_PRODUCT_CATEGORY_LIST = "/master/getAllProductCategory";
export const MASTER_PRODUCT_CATEGORY_INFO = "/master/getProductCategoryInfo";
export const MASTER_PRODUCT_CATEGORY_UPDATE = "/master/updateProductCategory";

// brand
export const MASTER_BRAND_ADD = "/master/addBrand";
export const MASTER_BRAND_LIST = "/master/getAllBrand";
export const MASTER_BRAND_INFO = "/master/getBrandInfo";
export const MASTER_BRAND_UPDATE = "/master/updateBrand";

//packageType
export const MASTER_PACKAGE_TYPE_ADD = "/master/addPackageType";
export const MASTER_PACKAGE_TYPE_LIST = "/master/getAllPackageType";
export const MASTER_PACKAGE_TYPE_INFO = "/master/getPackageTypeInfo";
export const MASTER_PACKAGE_TYPE_UPDATE = "/master/updatePackageType";

// currency
export const MASTER_CURRENCY_ADD = "/master/addCurrency";
export const MASTER_CURRENCY_LIST = "/master/getAllCurrency";
export const MASTER_CURRENCY_INFO = "/master/getCurrencyInfo";
export const MASTER_CURRENCY_UPDATE = "/master/updateCurrency";

// unit
export const MASTER_UNIT_ADD = "/master/addUnit";
export const MASTER_UNIT_LIST = "/master/getAllUnit";
export const MASTER_UNIT_INFO = "/master/getUnitInfo";
export const MASTER_UNIT_UPDATE = "/master/updateUnit";

// vendor
export const VENDOR_ADD = "/vendor/add";
export const VENDOR_LIST = "/vendor/list";
export const VENDOR_INFO = "/vendor/info";

// combos
export const COMBO_LIST = '/combo';

// user profile

export const USER_PROFILE_UPDATE = '/user/updateInfo';
export const USER_PROFILE_INFO = '/user/info';
export const USER_PROFILE_RESET_PASSWORD = '/user/resetPassword';

// user management
export const USER_MGT_LIST = '/user/list';
export const USER_MGT_ADD = '/user/add';
export const USER_MGT_INFO = '/user/view';
