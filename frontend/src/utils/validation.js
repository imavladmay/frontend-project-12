import * as yup from 'yup';

export const signInSchema = (message) => yup.object().shape({
  username: yup.string().trim().required(message),
  password: yup.string().trim().required(message),
});

export const chatSchema = yup.object().shape({
  body: yup.string().trim().required(),
});
