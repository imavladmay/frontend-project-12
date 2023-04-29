import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiRoutes } from '../utils/routes';

const fetchDataApi = createAsyncThunk(
  'data/fetchDataApi',
  async (token) => {
    const response = await axios.get(apiRoutes.channels, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },
);

export default fetchDataApi;
