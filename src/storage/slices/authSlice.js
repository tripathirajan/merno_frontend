import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { fullName: '', username: '', accessToken: '', email: '', id: '', role: [], isAuthenticated: false },
    reducers: {
        setLogedinUserInfo: (state, { payload }) => {
            const { fullName, username, accessToken, email, id, role = [] } = payload;
            state.fullName = fullName;
            state.username = username;
            state.accessToken = accessToken;
            state.email = email;
            state.id = id;
            state.role = role;
            state.isAuthenticated = accessToken !== ''
        },
        clearLogedinUserInfo: (state, action) => {
            state.fullName = '';
            state.username = '';
            state.accessToken = '';
            state.email = '';
            state.id = '';
            state.role = '';
            state.isAuthenticated = false;
        },
        updateAccessToken: (state, { payload }) => {
            state.accessToken = payload?.accessToken;
        }
    }
});

// actions
export const { setLogedinUserInfo, clearLogedinUserInfo, updateAccessToken } = authSlice.actions;

// reducer
export default authSlice.reducer;

// selectors
export const selectUserInfo = state => state?.auth;
export const selectAccessToken = state => state?.auth?.accessToken;
export const selectUserRole = state => state?.auth?.role;
export const selectIsAuthenticated = state => state?.auth?.isAuthenticated;