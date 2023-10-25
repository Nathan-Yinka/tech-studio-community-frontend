import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "../styles/modal.css";
import V1 from "../assets/Vector1.png";
const SubmissionModal = () => {
  const [smShow, setSmShow] = useState(false);

  return (
    <div>
      <div>
        <Button onClick={() => setSmShow(true)} className="">
          Submission modal
        </Button>
        <Modal
          size="md"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Title id="example-modal-sizes-title-sm">
              <div className="text-center background-holder w-auto py-4 ">
                <img src={V1} alt=" A right marked icon " />
              </div>{" "}
            </Modal.Title>
          <Modal.Body>
            <div className="modal-dialog h-25">
              <div className="modal-contents">
                <div className=" m-auto pb-3 working">
                  <div>
                    <div className="w-auto d-flex justify-content-center  flex-column text-center gap-1  Writeup">
                      <h2 className="m-auto p-2">Well done!</h2>
                      <p className="w-75  m-auto">
                        Your job posting has been successfully submitted and is
                        now under review by our team.
                      </p>
                      <button className="  border-0 m-auto mt-3">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
   
  );
};

export default SubmissionModal;
