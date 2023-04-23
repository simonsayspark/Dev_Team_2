import { useContext } from "react";
import { UserContext } from "../../App";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { addAppeal } from "../../api/transactionApi";
import { useLocation } from "react-router-dom";
//Dont allow for empty submits (change required)
//Find a way to default to empty, for category

export const AppealTransaction = () => {
  const currentUser = useContext(UserContext);
  const location = useLocation();
  const [currentTransaction] = useState(location.state.transaction);

  const [employee_id] = useState(currentTransaction.employee_id);
  const [company_id] = useState(currentTransaction.company_id);
  const [order_date, setOrder_date] = useState(currentTransaction.order_date);
  const [amount_requested, setAmount_requested] = useState(currentTransaction.amount_requested);
  const [category, setCategory] = useState(currentTransaction.category);
  const [claim_description, setClaim_description] = useState(currentTransaction.claim_description);
  const [appeal_description, setAppeal_description] = useState("");

  const navigate = useNavigate();

  const AppealTransaction = () => {
    const n_transaction = {
      employee_id: employee_id,
      company_id: company_id, 
      order_date: order_date,
      amount_requested: amount_requested,
      category: category,
      claim_description: claim_description,
      appeal_description: appeal_description

    };
    console.log('ADDING THE APPEAL')
    console.log(n_transaction)
    addAppeal(n_transaction);
    navigate('/viewTransactions');
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
               AppealTransaction();
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
