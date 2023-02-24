import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUserInfo: (state, { payload }) => {
            state = payload;
        },
        resetUserInfo: (state) => {
            state = null;
        }
    }
});


export const { setUserInfo } = userReducer.actions;

export default userReducer.reducer;

// selectors

export const selectUserProfile = state => state?.user || null;