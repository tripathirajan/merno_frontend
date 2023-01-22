import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        items: [],
        totalRecord: 0,
        info: {}
    },
    reducers: {
        setProductList: (state, action) => {
            const { payload } = action;
            state.items = payload?.items || [];
            state.totalRecord = payload?.totalRecord || 0;
            state.info = {};
        },
        resetProductList: function (state, _action) {
            state.items = [];
            state.totalRecord = 0;
        }
    }
});

// actions
export const { setProductList, resetProductList } = productSlice.actions;

// reducer
export default productSlice.reducer;

// selectors
export const selectProductList = state => state.product;
export const selectProductInfo = state => state?.product?.info || {};