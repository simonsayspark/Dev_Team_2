import { useContext } from "react";
import { UserContext } from "../../App";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { updateTransaction } from "../../api/transactionApi";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const EditTransaction = ({ setCurrentUser }) => {
  const currentUser = useContext(UserContext);
  const location = useLocation();
  const [currentTransaction] = useState(location.state.transaction);

  const [employee_id] = useState(currentTransaction.employee_id);
  const [company_id] = useState(currentTransaction.company_id);
  const [order_date, setOrder_date] = useState(currentTransaction.order_date.substring(0, currentTransaction.order_date.indexOf("T")));
  const [amount_requested, setAmount_requested] = useState(currentTransaction.amount_requested);
  const [category, setCategory] = useState(currentTransaction.category);
  const [claim_description, setClaim_description] = useState(currentTransaction.claim_description);
  const [disableButton, setDisableButton] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (order_date && amount_requested && category && claim_description) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [order_date, amount_requested, category, claim_description]);


  const editTransaction = () => {
    const u_transaction = {
      claim_number: currentTransaction.claim_number,
      order_date: order_date,
      amount_requested: amount_requested,
      category: category,
      claim_description: claim_description,
      amount_reimbursed: currentTransaction.amount_reimbursed,
      claim_status: currentTransaction.claim_status,
      ceo_comment: currentTransaction.ceo_comment
    };
    updateTransaction(u_transaction).then(navigate('/viewTransactions'));
  };

  return (
    <>
      <Navbar sticky="top" className="color-nav" expand="md" collapseOnSelect>
        <Container fluid className="m-0">
          <Navbar.Brand className="theBrand">
            <NavLink to={"/home"} className="nav-link">
              <img
                width="300px"
                height="auto"
                src="/logo_text.png"
                alt="logo"
              />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
          <NavbarCollapse>
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <NavLink
                to={"/"}
                className="fs-4 nav-link text-light mx-5"
                onClick={() => {
                  setCurrentUser(undefined);
                }}
              >
                Log out
              </NavLink>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>

      <Container className="mt-3 mb-3">
        <Button id="small-header" className="fs-5 btn btn-secondary"
          onClick={() => {
            navigate("/viewTransactions");
          }}>
          Back to Transactions
        </Button>
      </Container>

      <Container className="mt-3 mb-3">
        <div className="card">
          <div className="card-header py-3 main-bg">
            <h1 className="fs-2 text-white p-0 my-2" id="header">Edit Transaction</h1>
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
                    <Form.Label  id="header">Amount Requested</Form.Label>
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
                editTransaction();
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};
