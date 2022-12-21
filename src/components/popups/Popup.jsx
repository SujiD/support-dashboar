import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

function PopUp({
  showPopup,
  setShowPopup,
  title,
  body,
  size,
  proceedBtnName,
  handleClose,
  closeBtnName,
  handleProceed,
  loading,
}) {
  return (
    <Modal show={showPopup} centered size={size}>
      <Modal.Body>
        <div className="p-5">
          <p className="heading mb-4">{title}</p>
          <p className="mb-5 mt-3 text">{body}</p>
          <div className="d-flex flex-row mt-4">
            <Button
              className="main-btn me-3"
              onClick={() => {
                if (handleClose) handleClose();
                setShowPopup(false);
              }}
            >
              {closeBtnName}
            </Button>
            {proceedBtnName && (
              <Button
                className="main-btn"
                type="button"
                onClick={handleProceed}
                disabled={loading}
              >
                <span>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    className={`loading-spinner ${!loading && "d-none"}`}
                  />
                  <span
                    style={{ color: `${loading ? "transparent" : "white"}` }}
                  >
                    {proceedBtnName}
                  </span>
                </span>
              </Button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PopUp;
