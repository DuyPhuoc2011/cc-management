import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async ({email, password}, {rejectWithValue}) => {
    try {
        console.log("AUTH_URL: ", process.env.REACT_APP_AUTH_URL);
        const response = await axios.post(process.env.REACT_APP_AUTH_URL + '/login', {email, password}, {timeout: 5000});
        console.log("Axios response: ", response);
        sessionStorage.setItem('token', response.data.token);
        return response.data.token;
    } catch (err) {
        console.log("Error", err);
        return rejectWithValue(err.response.data);
    }
});