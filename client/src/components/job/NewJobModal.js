import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextInput from '../common/TextInput';

const NewJobModal = ({
  modal,
  toggleModal,
  submitModal,
  title,
  onChange,
  errors
}) => {
  return (
    <Modal isOpen={modal} toggle={toggleModal} size="lg" onClosed={toggleModal}>
      <form onSubmit={submitModal}>
        <ModalHeader>Add Blog</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <TextInput
                    name="title"
                    value={title}
                    onChange={onChange}
                    placeholder="title"
                    label="title"
                    error={errors.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary mainButton" type="submit">
            Submit
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={toggleModal}
          >
            Cancel
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

NewJobModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  submitModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default NewJobModal;
