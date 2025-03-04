import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    email: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
        },
        clearToken: (state) => {
            state.token = null;
            state.email = null;
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
