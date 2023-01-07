import { createSlice } from "@reduxjs/toolkit";

const comboSlice = createSlice({
    name: 'combos',
    initialState: { items: {} },
    reducers: {
        setComboList: function (state, action) {
            const { payload } = action;
            state.items = payload;
        },
        resetComboList: function (state) {
            state.items = {};
        }
    }
});

// actions
export const { setComboList, resetComboList } = comboSlice.actions;

// reducer
export default comboSlice.reducer;

// selectors

export const selectCombos = state => state.combos.items;