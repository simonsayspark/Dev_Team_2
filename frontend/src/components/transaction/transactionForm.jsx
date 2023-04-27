import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { addTransaction } from "../../api/transactionApi";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const TransactionForm = () => {
  const currentUser = useContext(UserContext);

  const [employee_id] = useState(currentUser.employee_id);
  const [company_id] = useState(currentUser.company_id);
  const [order_date, setOrder_date] = useState(null);
  const [amount_requested, setAmount_requested] = useState("");
  const [category, setCategory] = useState("");
  const [claim_description, setClaim_description] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (order_date && amount_requested && category && claim_description) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [order_date, amount_requested, category, claim_description]);

  const submitTransaction = () => {
    const n_transaction = {
      employee_id: employee_id,
      company_id: company_id,
      order_date: order_date,
      amount_requested: amount_requested,
      category: category,
      claim_description: claim_description,
    };
    addTransaction(n_transaction);
    navigate('/home');
  };

  return (
    <>
      <Container className="mt-3 mb-3">
        <Button id="small-header" className="fs-5 btn btn-secondary"
          onClick={() => {
            navigate("/home");
          }}>
          Back to Home
        </Button>
      </Container>
      
      <Container className="mt-3 mb-3">
        <div className="card ">
          <div className="card-header py-3 submitButton">
            <h1 className="fs-2 text-white p-0 my-2" id="header">Submit a Transaction</h1>
          </div>
          <div className="card-body">
            <Form>
              <Row className="mb-3">
                <Col xs={5} sm={5} md={4} lg={3} xl={3} xxl={2} >
                  <Form.Group className="" controlId="order_date">
                    <Form.Label id="header">Date</Form.Label>
                    <Form.Control

                      type="date"
                      value={order_date}
                      className="w-100"


                      onChange={(delta) => {
                        setOrder_date(delta.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5} sm={5} md={4} lg={3} xl={3} xxl={2}>
                  <Form.Group className="" controlId="amount_requested">
                    <Form.Label id="header">Amount Requested</Form.Label>
                    <Form.Control
                      type="number"
                      min="0.00"
                      step="0.01"
                      placeholder="Enter amount spent"
                      value={amount_requested}
                      onChange={(delta) => {
                        setAmount_requested(delta.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            
              <Row className="mb-3">
                <Col xs={5} sm={5} md={4} lg={3} xl={3} xxl={2}>
                  <Form.Group controlId="category">
                    <Form.Label id="header">Category</Form.Label>
                    <Form.Select
                      type="category"
                      placeholder="Select category"
                      value={category}
                      onChange={(delta) => {
                        setCategory(delta.target.value);
                      }}
                    >
                      <option> </option>
                      <option>Food</option>
                      <option>Travel</option>
                      <option>Hotel</option>
                      <option>Events</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div className="row mb-3">
                <Form.Group controlId="claim_description">
                  <Form.Label id="header">Claim Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Describe reasoning for reimbursement"
                    value={claim_description}
                    onChange={(delta) => {
                      setClaim_description(delta.target.value);
                    }}
                  />
                </Form.Group>
              </div>
            </Form>

            <Button
              className="submitButton fs-5"
              disabled={disableButton}
              type="button"
              id="small-header"
              onClick={() => {
                submitTransaction();
              }}
            >
              Submit Request
            </Button>
          </div>
        </div>
      </Container>


    </>
  );
};
