import { useContext } from "react";
import { UserContext } from "../../App";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { addTransaction } from "../../api/transactionApi";
import Container from "react-bootstrap/esm/Container";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../index.css";

//Dont allow for empty submits (change required)
//Find a way to default to empty, for category

export const TransactionForm = () => {
  const currentUser = useContext(UserContext);

  const [employee_id] = useState(currentUser.employee_id);
  const [company_id] = useState(currentUser.company_id);
  const [order_date, setOrder_date] = useState(null);
  const [amount_requested, setAmount_requested] = useState(0);
  const [category, setCategory] = useState("");
  const [claim_description, setClaim_description] = useState("");

  const navigate = useNavigate();

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
    // onAddTransaction(n_transaction);
  };

  return (
    <>
      {console.log(order_date)}
      {console.log(amount_requested)}
      {console.log(category)}
      {console.log(claim_description)}

      <Container className="mt-3">
        <div className="card">
          <div className="card-header py-3">
            <h1 className="display-5">Submit a Transaction</h1>
          </div>
          <div className="card-body">
            <Form>
              <div className="row mb-3">
                <Form.Group className="col-3 inline" controlId="order_date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={order_date}
                    onChange={(delta) => {
                      setOrder_date(delta.target.value);
                    }}
                  />
                </Form.Group>
              </div>
              <div className="row mb-3">
                <Form.Group className="col-3" controlId="amount_requested">
                  <Form.Label>Amount Requested</Form.Label>
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
              </div>
              <div className="row mb-3">
                <div className="col-md-2">
                  <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      type="category"
                      placeholder="Select category"
                      value={category}
                      onChange={(delta) => {
                        setCategory(delta.target.value);
                      }}
                    >
                      <option>Food</option>
                      <option>Travel</option>
                      <option>Hotel</option>
                      <option>Events</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
              <div className="row mb-3">
                <Form.Group controlId="claim_description">
                  <Form.Label>Claim Description</Form.Label>
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
              className="submitButton"
              type="button"
              onClick={() => {
                submitTransaction();
              }}
            >
              Submit Request
            </Button>
          </div>
        </div>
      </Container>

      <Container className="mt-3">
          <Button className="btn btn-secondary"
                  onClick={() => {
                    navigate("/home");
                  }}>
                    Back to Home
          </Button>
      </Container>
    </>
  );
};
