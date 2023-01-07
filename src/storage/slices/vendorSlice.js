import { createSlice } from "@reduxjs/toolkit";


const vendorSlice = createSlice({
    name: 'vendor',
    initialState: { items: [], totalRecord: 0, info: {} },
    reducers: {
        setVendorList: function (state, action) {
            const { payload } = action;
            state.items = payload?.items;
            state.totalRecord = payload?.totalCount;
            state.info = {}
        },
        resetVendorList: function (state) {
            state.items = [];
            state.totalRecord = 0;
            state.info = {}
        },
        setVendoInfo: function (state, action) {
            state.info = action?.payload;
        },
        resetVendorInfo: function (state) {
            state.info = {};
        }
    }
});

// actions
export const { setVendorList, resetVendorList, setVendoInfo, resetVendorInfo } = vendorSlice.actions;

// reducers
export default vendorSlice.reducer;

// selectors
export const selectVendorList = state => state.vendor;
export const selectVendorInfo = state => state.vendor.info;