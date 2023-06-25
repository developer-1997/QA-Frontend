import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  Container,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap"

const ConfirmationModal = ({
  modal_backdrop,
  setmodal_backdrop,
  modalTitle,
  modalAction,
}) => {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Modal
        isOpen={modal_backdrop}
        // toggle={() => {
        //   tog_backdrop()
        // }}
        backdrop={"static"}
        id="staticBackdrop"
      >
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">
            Confirmation
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setmodal_backdrop(false)
            }}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <p>{modalTitle}</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              setmodal_backdrop(false)
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              modalAction()
              setLoading(true)
            }}
            disabled={loading}
          >
            {loading ? (
              <Spinner className="ms-3 me-3" color="light" size="sm" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </Modal>
    </>
  )
}

export default ConfirmationModal
