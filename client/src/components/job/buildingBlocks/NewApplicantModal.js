import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextInput from '../../common/TextInput';
import TextareaInput from '../../common/TextareaInput';

const NewApplicantModal = ({
  modal,
  toggleModal,
  submitModal,
  applicantName,
  applicantEmail,
  applicantLinkedin,
  applicantNote,
  onChange,
  errors
}) => {
  return (
    <Modal isOpen={modal} toggle={toggleModal} size="lg" onClosed={toggleModal}>
      <form onSubmit={submitModal}>
        <ModalHeader>New Applicant</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <TextInput
                    name="applicantName"
                    value={applicantName}
                    onChange={onChange}
                    placeholder="Name"
                    label="Name*"
                    error={errors.name}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <TextInput
                    name="applicantEmail"
                    value={applicantEmail}
                    onChange={onChange}
                    placeholder="Email"
                    label="Email*"
                    error={errors.email}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <TextInput
                    name="applicantLinkedin"
                    value={applicantLinkedin}
                    onChange={onChange}
                    placeholder="Linkedin"
                    label="Linkedin"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <TextareaInput
                    name="applicantNote"
                    value={applicantNote}
                    onChange={onChange}
                    placeholder="Note"
                    label="Note"
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

NewApplicantModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  submitModal: PropTypes.func.isRequired,
  applicantName: PropTypes.string.isRequired,
  applicantEmail: PropTypes.string.isRequired,
  applicantNote: PropTypes.string.isRequired,
  applicantLinkedin: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default NewApplicantModal;
