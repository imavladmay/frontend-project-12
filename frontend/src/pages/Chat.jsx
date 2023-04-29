import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import fetchDataApi from '../api/fetchData';
import Channels from '../components/Channels';
import Messages from '../components/Messages';

const ChatPage = () => {
  const { token } = JSON.parse(localStorage.getItem('userData'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataApi(token));
  }, [dispatch, token]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default ChatPage;
