import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import signInImg from '../assets/signIn.jpg';
import routes from '../routes/routes';
import { useAuth } from '../providers/AuthProvider';

const signInSchema = (message) => yup.object().shape({
  username: yup.string().trim().required(message),
  password: yup.string().trim().required(message),
});

const SignInPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signInSchema(t('errors.required')),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const response = await axios.post('/api/v1/login', { username: values.username, password: values.password });
        localStorage.setItem('userData', JSON.stringify(response.data));
        setAuthFailed(false);
        auth.logIn();
        navigate(routes.mainPage());
      } catch (error) {
        setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          navigate(routes.signInPage());
          return;
        }
        console.log('Boom!');
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col
                xs={12}
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Image
                  src={signInImg}
                  className="rounded-circle"
                  alt={t('enter')}
                />
              </Col>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">{t('enter')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('placeholders.nickname')}
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                  />
                  <Form.Label htmlFor="username">
                    {t('placeholders.nickname')}
                  </Form.Label>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder={t('placeholders.password')}
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                  />
                  <Form.Label htmlFor="password">
                    {t('placeholders.password')}
                  </Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t('invalidData')}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  {t('enter')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;