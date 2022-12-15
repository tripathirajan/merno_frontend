import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import authReducer from './slices/authSlice';
// import productReducer from './slices/productSlice';
// import cartReducer from './slices/cartSlice';
import uiReducer from './slices/uiSlices';
import masterReducer from './slices/masterSlice';

const isDev = process.env.NODE_ENV !== 'production';

const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        master: masterReducer
        // product: productReducer,
        // cart: cartReducer
    },
    middleware: getDefaultMiddleware => isDev ? getDefaultMiddleware().concat(reduxLogger) : getDefaultMiddleware(),
    devTools: isDev
});

export default store;