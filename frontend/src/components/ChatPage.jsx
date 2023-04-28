import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import fetchData from '../slices/fetchData';
import { useWebSocket } from '../providers/WebSocketProvider';

const chatSchema = yup.object().shape({
  body: yup.string().required(),
});

const ChatPage = () => {
  const { t } = useTranslation();

  const { addMessageApi } = useWebSocket();

  const { token, username } = JSON.parse(localStorage.getItem('userData'));
  const dispatch = useDispatch();

  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);
  const currentChannelName = channels.length !== 0 ? channels.find((ch) => ch.id === currentChannelId).name : '';
  const messagesInCurrentChannel = messages.filter((el) => el.channelId === currentChannelId)
    .length;

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: chatSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const { body } = values;

      if (body) {
        const newMessage = {
          body,
          channelId: currentChannelId,
          username,
        };

        try {
          addMessageApi(newMessage);
          formik.resetForm();
        } catch (error) {
          setSubmitting(false);
          console.log('error.addMessage');
        }
      }
    },
  });

  useEffect(() => {
    dispatch(fetchData(token));
  }, [dispatch, token]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('channels')}</b>
            <Button variant="" className="p-0 text-primary btn btn-group-vertical">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">{t('addChannel')}</span>
            </Button>
          </div>
          <ul
            id="channels-box"
            className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          >
            {channels.map((ch) => (
              <li className="nav-item w-100" key={ch.id}>
                <Button
                  variant={ch.id === currentChannelId ? 'secondary' : 'light'}
                  className="w-100 rounded-0 text-start btn"
                >
                  <span className="me-1">#</span>
                  {ch.name}
                </Button>
              </li>
            ))}
          </ul>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>{`# ${currentChannelName}`}</b>
              </p>
              <span className="text-muted">{t('messagesCounter.messages', { count: messagesInCurrentChannel })}</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {messagesInCurrentChannel !== 0 ? messages.map((el) => (
                <div className="text-break mb-2" key={el.id}>
                  <b>{el.username}</b>
                  {`: ${el.body}`}
                </div>
              )) : ''}
            </div>
            <div className="mt-auto px-5 py-3">
              <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
                <Form.Group className="input-group has-validation">
                  <Form.Control
                    name="body"
                    aria-label={t('newMessage')}
                    placeholder={t('placeholders.enterMessage')}
                    className="border-0 p-0 ps-2"
                    onChange={formik.handleChange}
                    value={formik.values.body}
                  />
                  <Button
                    type="submit"
                    className="btn btn-group-vertical border-0"
                    variant=""
                    disabled={!formik.values.body}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path
                        fill="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                      />
                    </svg>
                    <span className="visually-hidden">{t('send')}</span>
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
