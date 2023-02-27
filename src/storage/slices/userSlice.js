import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: 'user',
    initialState: { info: {} },
    reducers: {
        setUserInfo: (state, { payload }) => {
            state.info = payload;
        },
        resetUserInfo: (state) => {
            state.info = null;
        }
    }
});


export const { setUserInfo } = userReducer.actions;

export default userReducer.reducer;

// selectors

export const selectUserProfile = state => state?.user?.info || null;