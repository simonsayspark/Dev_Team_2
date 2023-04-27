import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { addAppeal } from "../../api/transactionApi";
import { useLocation } from "react-router-dom";
import { ViewListTransaction } from "./viewListTransaction";
//Dont allow for empty submits (change required)
//Find a way to default to empty, for category

export const AppealTransaction = () => {
  const currentUser = useContext(UserContext);
  const location = useLocation();

  const [appeal_description, setAppeal_description] = useState("");



  const navigate = useNavigate();

  const ApTransaction = () => {
    addAppeal(location.state.transaction.claim_number, "Appeal", appeal_description);
    navigate('/viewTransactions');
  };

  return (
    <>
      <Container className="mt-3">
        <div className="card">
          <div className="card-header py-3">
            <h1 className="display-5">Appeal Transaction</h1>
          </div>
          <div className="card-body">
            <Form>
              <div className="row mb-3">

              </div>
              <div className="row mb-3">

              </div>
              <div className="row mb-3">

              </div>
              <div className="row mb-3">
                <Form.Group controlId="claim_description">
                  <Form.Label>Reason for appeal</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Describe reasoning for appeal"

                    onChange={(delta) => {
                      setAppeal_description(delta.target.value);
                    }}
                  />
                </Form.Group>
              </div>
            </Form>

            <Button
              type="button"
              onClick={() => {
                ApTransaction();
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};
