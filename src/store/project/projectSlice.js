import { createSlice } from '@reduxjs/toolkit';
import { getProjects } from './projectActions';

const projectSlice = createSlice({
    name: 'Projects',
    initialState: {
        data: [],
        isLoading: false,
        isSuccess: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProjects.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        });
        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getProjects.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = action.error.message;
        });
    },
});

export default projectSlice.reducer;

