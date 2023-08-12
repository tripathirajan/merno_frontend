import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: 'user',
    initialState: {
        info: {},
        items: [],
        totalRecord: 0
    },
    reducers: {
        setUserInfo: (state, { payload }) => {
            state.info = payload;
        },
        resetUserInfo: (state) => {
            state.info = null;
        },
        setUserList: (state, action) => {
            const { payload } = action;
            state.items = payload?.items || [];
            state.totalRecord = payload?.totalRecord || 0;
            state.info = {};
        },
        resetUserList: function (state, _action) {
            state.items = [];
            state.totalRecord = 0;
        }
    }
});


export const { setUserInfo, setUserList, resetUserList } = userReducer.actions;

export default userReducer.reducer;

// selectors

export const selectUserProfile = state => state?.user?.info || null;
export const selectUserList = state => state?.user;