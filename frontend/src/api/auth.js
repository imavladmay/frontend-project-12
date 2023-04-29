import axios from 'axios';

import { apiRoutes } from '../utils/routes';

const authApi = async (values) => {
  const response = await axios
    .post(apiRoutes.login, { username: values.username, password: values.password });

  return response.data;
};

export default authApi;
