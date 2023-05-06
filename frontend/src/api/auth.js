import axios from 'axios';

import { apiRoutes } from '../utils/routes';

export const signInApi = async (values) => {
  const response = await axios
    .post(apiRoutes.signIn, { username: values.username, password: values.password });

  return response.data;
};

export const signUpApi = async (values) => {
  const response = await axios
    .post(apiRoutes.signUp, { username: values.username, password: values.password });

  return response.data;
};
