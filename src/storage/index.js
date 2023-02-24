import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlices';
import masterReducer from './slices/masterSlice';
import vendorReducer from './slices/vendorSlice';
import comboReducer from './slices/comboSlice';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';

const isDev = process.env.NODE_ENV !== 'production';
const disableReduxLogger = process.env.REACT_DISABLE_REDUX_LOGGER;

const getReduxMiddleware = (getDefaultMiddleware) => {
    if (disableReduxLogger || !isDev) {
        return getDefaultMiddleware();
    }
    return getDefaultMiddleware().concat(reduxLogger);
}
const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        master: masterReducer,
        vendor: vendorReducer,
        combos: comboReducer,
        product: productReducer,
        user: userReducer
    },
    middleware: getReduxMiddleware,
    devTools: isDev
});

export default store;