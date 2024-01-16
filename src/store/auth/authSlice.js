import { createSlice } from '@reduxjs/toolkit';
import { login } from './authAction';

const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';

const initialState = {
    token: token,
    isLoading: false,
    isSuccess: false,
    error: null
};

const authSlice = createSlice({
    name: 'Auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.token = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = action.error.message;
        });
    },
});

export default authSlice.reducer;