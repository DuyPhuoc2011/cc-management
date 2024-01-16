import { configureStore } from '@reduxjs/toolkit';
import projectSlice from '../store/project/projectSlice';
import authSlice from '../store/auth/authSlice';

const store = configureStore({
    reducer: {
        project: projectSlice,
        auth: authSlice
    }
});

export default store;
