import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        pageLoading: false,
        alert: {},
        toast: {
            open: false,
            vertical: 'top',
            horizontal: 'center',
            message: '',
            type: 'default',
            displayTimeout: 4000
        }
    },
    reducers: {
        setPageLoadingON: function (state) {
            state.pageLoading = true;
        },
        setPageLoadingOFF: function (state) {
            state.pageLoading = false;
        },
        showToast: (state, { payload }) => {
            const { vertical, horizontal, message, type } = payload;
            state.toast.open = true;
            state.toast.vertical = vertical || 'top';
            state.toast.horizontal = horizontal || 'right';
            state.toast.message = message || '';
            state.toast.type = type || 'default';
        },
        hideToast: (state) => {
            state.toast.open = false;
            state.toast.vertical = 'top';
            state.toast.horizontal = 'right';
            state.toast.message = '';
            state.toast.type = 'default';
        }
    }
});

// actions
export const { setPageLoadingOFF, setPageLoadingON, showToast, hideToast } = uiSlice.actions;

// reducer
export default uiSlice.reducer;


// selectors

export const selectPageLoading = state => state.ui.pageLoading;
export const selectAlert = state => state.ui.alert;
export const selectToast = state => state.ui.toast;