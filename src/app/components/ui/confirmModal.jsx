import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

const ConfirmModal = ({ title, showModal, handleClose, confirm, children }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <button variant="secondary" onClick={handleClose}>
          Отмена
        </button>
        <button variant="primary" onClick={confirm}>
          Подвтердить
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

ConfirmModal.propTypes = {
  title: PropTypes.string,
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  confirm: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
