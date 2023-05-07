import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { closeModal } from '../../store/entities/modalsSlice';
import { useWebSocket } from '../../providers/WebSocketProvider';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removeChannelApi } = useWebSocket();

  const { modals } = useSelector((state) => state.modals);

  const handleRemove = () => {
    removeChannelApi({ id: modals.target });
    dispatch(closeModal());
    toast.success(t('channels.removed'));
  };

  return (
    <Modal show={modals.isShown} centered>
      <Modal.Header closeButton onHide={() => dispatch(closeModal())}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => dispatch(closeModal())} className="me-2" variant="secondary">
            {t('modals.cancel')}
          </Button>
          <Button onClick={handleRemove} type="submit" variant="danger">
            {t('modals.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
