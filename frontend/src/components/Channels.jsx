import React from 'react';
import {
  Col,
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { openModal } from '../store/entities/modalsSlice';
import { switchChannel } from '../store/entities/channelsSlice';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { channels, currentChannelId } = useSelector((state) => state.channels);

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button
          variant=""
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => dispatch(openModal({ type: 'add', target: null }))}
        >
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
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((ch) => (
          <li className="nav-item w-100" key={ch.id}>
            {ch.removable ? (
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                  onClick={() => dispatch(switchChannel(ch.id))}
                  variant={ch.id === currentChannelId ? 'secondary' : 'light'}
                  className="w-100 rounded-0 text-start text-truncate"
                >
                  <span className="me-1">#</span>
                  {ch.name}
                </Button>
                <Dropdown.Toggle
                  split
                  className="flex-grow-0"
                  variant={ch.id === currentChannelId ? 'secondary' : 'light'}
                >
                  <span className="visually-hidden">{t('modals.channelControl')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => dispatch(openModal({ type: 'remove', target: ch.id }))}
                  >
                    {t('modals.remove')}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(openModal({ type: 'rename', target: ch.id }))}
                  >
                    {t('modals.rename')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                onClick={() => dispatch(switchChannel(ch.id))}
                variant={ch.id === currentChannelId ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start"
              >
                <span className="me-1">#</span>
                {ch.name}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default Channels;
