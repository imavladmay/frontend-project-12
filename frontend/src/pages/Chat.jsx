import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import fetchDataApi from '../api/fetchData';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import getModal from '../components/modals/index';

const ChatPage = () => {
  const { token } = JSON.parse(localStorage.getItem('userData'));
  const { modals } = useSelector((state) => state.modals);

  const dispatch = useDispatch();

  const renderModal = () => {
    if (modals.type === '') {
      return null;
    }
    const Modal = getModal(modals.type);
    return <Modal />;
  };

  useEffect(() => {
    dispatch(fetchDataApi(token));
  }, [dispatch, token]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
      {renderModal()}
    </Container>
  );
};

export default ChatPage;
