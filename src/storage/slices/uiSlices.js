import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: { pageLoading: false, alert: {}, toast: {} },
    reducers: {
        setPageLoadingON: function (state) {
            state.pageLoading = true;
        },
        setPageLoadingOFF: function (state) {
            state.pageLoading = false;
        }
    }
});

// actions
export const { setPageLoadingOFF, setPageLoadingON } = uiSlice.actions;

// reducer
export default uiSlice.reducer;


// selectors

export const selectPageLoading = state => state.ui.pageLoading;
export const selectAlert = state => state.ui.alert;
export const selectToast = state => state.ui.toast;