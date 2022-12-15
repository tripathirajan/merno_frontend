import { createSlice } from "@reduxjs/toolkit";

const masterSlice = createSlice({
    name: 'master',
    initialState: {
        productCategory: { items: [], totalRecord: 0, info: {} },
        brand: { items: [], totalRecord: 0, info: {} },
        packageType: { items: [], totalRecord: 0, info: {} },
        currency: { items: [], totalRecord: 0, info: {} },
        unit: { items: [], totalRecord: 0, info: {} }
    },
    reducers: {
        setProductCategoryList: function (state, action) {
            const { payload } = action;
            state.productCategory.items = payload?.items;
            state.productCategory.totalRecord = payload?.totalCount;
            state.productCategory.info = {}
        },
        resetProductCategoryList: function (state, action) {
            state.productCategory.items = [];
            state.productCategory.totalRecord = 0;
            state.productCategory.info = {}
        },
        setBrandList: function (state, action) {
            const { payload } = action;
            state.brand.items = payload?.items;
            state.brand.totalRecord = payload?.totalCount;
            state.brand.info = {}
        },
        resetBrandList: function (state) {
            state.brand.items = [];
            state.brand.totalRecord = 0;
            state.brand.info = {}
        },
        setPackageTypeList: function (state, action) {
            const { payload } = action;
            state.packageType.items = payload?.items;
            state.packageType.totalRecord = payload?.totalCount;
            state.packageType.info = {}
        },
        resetPackageTypeList: function (state, action) {
            state.packageType.items = [];
            state.packageType.totalRecord = 0;
            state.packageType.info = {}
        },
        setCurrencyList: function (state, action) {
            const { payload } = action;
            state.currency.items = payload?.items;
            state.currency.totalRecord = payload?.totalCount;
            state.currency.info = {}
        },
        resetCurrencyList: function (state, action) {
            state.currency.items = [];
            state.currency.totalRecord = 0;
            state.currency.info = {}
        },
        setUnitList: function (state, action) {
            const { payload } = action;
            state.unit.items = payload?.items;
            state.unit.totalRecord = payload?.totalCount;
            state.unit.info = {}
        },
        resetUnitList: function (state, action) {
            state.unit.items = [];
            state.unit.totalRecord = 0;
            state.unit.info = {}
        }
    }
})

// actions
export const {
    setProductCategoryList,
    resetProductCategoryList,
    setBrandList,
    resetBrandList,
    setCurrencyList,
    setPackageTypeList,
    setUnitList,
    resetCurrencyList,
    resetPackageTypeList,
    resetUnitList
} = masterSlice.actions;

// reducers
export default masterSlice.reducer;

// selectors
export const selectProductCategoryList = state => state.master.productCategory;

export const selectBrandList = state => state.master.brand;

export const selectPackageTypeList = state => state.master.packageType;

export const selectCurrencyList = state => state.master.currency;

export const selectUnitList = state => state.master.unit;