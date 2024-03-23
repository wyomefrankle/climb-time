import React from "react";
import { Link } from 'react-router-dom';

export default function Modal({ launchBtnText, modalTitle, handleCreateAccount }) {
  return (
    <div className="m-3">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick = {handleCreateAccount}
      >
        {launchBtnText}
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {modalTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <Link to="/login">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Log In
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}