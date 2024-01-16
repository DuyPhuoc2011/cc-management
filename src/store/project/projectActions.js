import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getProjects = createAsyncThunk('project/getPorjects', async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL + '/projects');
    return response.data;
});