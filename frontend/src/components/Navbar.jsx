import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { routes } from '../utils/routes';
import { logOut } from '../store/entities/authSlice';

const MyNavbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('userData');

  const handleLogOut = () => {
    dispatch(logOut());
    navigate(routes.signIn);
  };

  return (
    <Navbar className="shadow-sm" expand="lg" variant="light" bg="white">
      <Container>
        <Navbar.Brand as={Link} to={routes.chat}>{t('hexlet')}</Navbar.Brand>
        { token && (
        <Button variant="primary" onClick={handleLogOut}>
            {t('logOut')}
        </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
