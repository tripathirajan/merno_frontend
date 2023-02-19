import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlices';
import masterReducer from './slices/masterSlice';
import vendorReducer from './slices/vendorSlice';
import comboReducer from './slices/comboSlice';
import productReducer from './slices/productSlice';

const isDev = process.env.NODE_ENV !== 'production';

const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        master: masterReducer,
        vendor: vendorReducer,
        combos: comboReducer,
        product: productReducer
    },
    middleware: getDefaultMiddleware => isDev ? getDefaultMiddleware() : getDefaultMiddleware(),
    devTools: isDev
});

export default store;