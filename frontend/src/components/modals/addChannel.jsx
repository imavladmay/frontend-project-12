import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { closeModal } from '../../store/entities/modalsSlice';
import { addChannelSchema } from '../../utils/validation';
import { useWebSocket } from '../../providers/WebSocketProvider';

const ModalAddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addChannelApi } = useWebSocket();
  const inputRef = useRef(null);

  const { channels } = useSelector((state) => state.channels);
  const { modals } = useSelector((state) => state.modals);
  const channelList = channels.map((el) => el.name);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: addChannelSchema(channelList, t('modals.uniqueName'), t('modals.lengthParams'), t('modals.required')),
    validateOnChange: false,
    onSubmit: (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const { name } = values;
        addChannelApi({ name });
        formik.resetForm();
        dispatch(closeModal());
      } catch (error) {
        setSubmitting(false);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    dispatch(closeModal());
  };

  return (
    <Modal show={modals.isShown} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            id="name"
            name="name"
            className="mb-2"
            onChange={formik.handleChange}
            value={formik.values.name}
            isInvalid={formik.errors.name}
            ref={inputRef}
          />
          <Form.Label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</Form.Label>
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button onClick={handleClose} className="me-2" variant="secondary">
              {t('modals.cancel')}
            </Button>
            <Button type="submit" variant="primary">
              {t('modals.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
