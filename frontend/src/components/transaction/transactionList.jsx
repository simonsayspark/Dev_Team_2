import { useContext } from "react";
import { UserContext } from "../../App";
import { useState, useEffect } from "react";
import {
  getTransactionByStatus,
  getSortTransactionByStatus,
  updateTransactionStatus,
  updateTransactionComment,
  getTransactionsByCompany,
  deleteTransaction,
} from "../../api/transactionApi";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { EditTransaction } from "./editTransaction";

//ONLY for pending, allow for edits of the transaction details

export const TransactionList = () => {


  const currentUser = useContext(UserContext);

  const [transactions, setTransactions] = useState(undefined);
  const [aTransactions, setaTransactions] = useState(undefined);
  const [dTransactions, setdTransactions] = useState(undefined);
  const [pTransactions, setpTransactions] = useState(undefined);
  const [sortValue, setSortValue] = useState("Sort By");
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getTransactionByStatus(currentUser.employee_id, "Accepted").then((x) =>
      setaTransactions(x)
    );
    getTransactionByStatus(currentUser.employee_id, "Denied").then((x) =>
      setdTransactions(x)
    );
    getTransactionByStatus(currentUser.employee_id, "Pending").then((x) =>
      setpTransactions(x)
    );
    getTransactionsByCompany(currentUser.company_id).then((x) => {
      setTransactions(x);
    });
  }, []);

  useEffect(() => {
    if (sortValue != "Sort By") {
      getSortTransactionByStatus(
        currentUser.employee_id,
        "Accepted",
        sortValue
      ).then((x) => setaTransactions(x));
      getSortTransactionByStatus(
        currentUser.employee_id,
        "Denied",
        sortValue
      ).then((x) => setdTransactions(x));
      getSortTransactionByStatus(
        currentUser.employee_id,
        "Pending",
        sortValue
      ).then((x) => setpTransactions(x));
    } else {
      getTransactionByStatus(currentUser.employee_id, "Accepted").then((x) =>
        setaTransactions(x)
      );
      getTransactionByStatus(currentUser.employee_id, "Denied").then((x) =>
        setdTransactions(x)
      );
      getTransactionByStatus(currentUser.employee_id, "Pending").then((x) =>
        setpTransactions(x)
      );
    }
  }, [sortValue, pTransactions]);

  const sortBy = (e) => {
    setSortValue(e);
  };

  const addComment = (transactionNumber) => {
    console.log(comment);
    updateTransactionComment(transactionNumber, comment).then((x) =>
      setComment(comment)
    );
  };

  const approve = (transactionNumber) => {
    updateTransactionStatus(transactionNumber, "Accepted").then((x) =>
      console.log("Success")
    );
  };

  const deny = (transactionNumber) => {
    updateTransactionStatus(transactionNumber, "Denied").then((x) =>
      console.log("Success")
    );
  };

  //create 3 different api requests
  if (!aTransactions || !dTransactions || !pTransactions) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }



  if (currentUser.role === "Employee")
    return (
      <>
        <div className="pos-absolute">
          <Dropdown
            className=""
            onSelect={(e) => {
              setSortValue(e);
            }}
          >
            <Dropdown.Toggle
              className="col-1"
              variant="info"
              id="dropdown-menu"
            >
              {sortValue}
            </Dropdown.Toggle>
            <Dropdown.Menu className="col-1">
              <Dropdown.Item eventKey="Date">Date</Dropdown.Item>
              <Dropdown.Item eventKey="Amount">Amount</Dropdown.Item>
              <Dropdown.Item eventKey="Category">Category</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="pending" title="Pending">
            {pTransactions.length !== 0 ? (
              <ListGroup>
                {pTransactions?.map((transaction, index) => {
                  return (
                    <ListGroup.Item>
                      <Container>
                        <Row>
                          <Col className="p-0">{transaction.order_date}</Col>
                          <Col>
                            <Badge bg="secondary" className="">
                              {transaction.claim_status}
                            </Badge>{" "}
                          </Col>
                        </Row>

                        <Row>
                          Amount Requested: ${transaction.amount_requested}
                        </Row>

                        <Row>
                          Claim Description:
                          <br />
                          {transaction.claim_description}
                        </Row>
                      </Container>
                      
                      <Button type="button" onClick={() => {
                        navigate('/editTransaction', {state: {transaction}});
                      }}>Edit</Button>        

                      <Button type="button" onClick={() => {
                        deleteTransaction(transaction.claim_number);
                      }}>Delete</Button>

                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            ) : (
              <p>No available transaction</p>
            )}
          </Tab>

          <Tab eventKey="accepted" title="Accepted">
            {aTransactions.length !== 0 ? (
              <ListGroup>
                {aTransactions?.map((transaction, index) => {
                  return (
                    <ListGroup.Item>
                      <Container>
                        <Row>
                          <Col className="p-0">{transaction.order_date}</Col>
                          <Col>
                            <Badge bg="secondary" className="">
                              {transaction.claim_status}
                            </Badge>{" "}
                          </Col>
                        </Row>

                        <Row>
                          Amount Requested: ${transaction.amount_requested}
                        </Row>

                        <Row>
                          Amount Reimbursed: ${transaction.amount_reimbursed}
                        </Row>

                        <Row>
                          Claim Description:
                          <br />
                          {transaction.claim_description}
                        </Row>

                        <Row>
                          Comment:
                          <br />
                          {transaction.ceo_comment}
                        </Row>
                      </Container>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            ) : (
              <p className="ms-3">No available transaction</p>
            )}
          </Tab>

          <Tab eventKey="denied" title="Denied">
            {dTransactions.length !== 0 ? (
              <ListGroup>
                {dTransactions?.map((transaction, index) => {
                  return (
                    <ListGroup.Item>
                      <Container>
                        <Row>
                          <Col className="p-0">{transaction.order_date}</Col>
                          <Col>
                            <Badge bg="secondary" className="">
                              {transaction.claim_status}
                            </Badge>{" "}
                          </Col>
                        </Row>

                        <Row>
                          Amount Requested: ${transaction.amount_requested}
                        </Row>

                        <Row>
                          Amount Reimbursed: ${transaction.amount_reimbursed}
                        </Row>

                        <Row>
                          Claim Description:
                          <br />
                          {transaction.claim_description}
                        </Row>

                        <Row>
                          Ceo Comment:
                          <br />
                          {transaction.ceo_comment}
                        </Row>

                      </Container>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            ) : (
              <p className="ms-3">No available transaction</p>
            )}
          </Tab>
        </Tabs>


      </>
    );
  if (currentUser.ceo_id || currentUser.role === "Financial Manager") {
    return (
      <>
        <ListGroup>
          {transactions.map((transaction, index) => {
            return (
              <ListGroup.Item>
                <Container>
                  <Row>
                    <Col className="p-0">{transaction.order_date}</Col>
                    <Col>
                      <Badge bg="secondary" className="block mb-1">
                        {transaction.claim_status}
                      </Badge>{" "}
                    </Col>
                    <Col>
                      <Form.Group controlId="comment">
                        <Form.Label>Add Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Add comment"
                          //value={comment}
                          onChange={(delta) => {
                            setComment(delta.target.value);
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            addComment(transaction.claim_number);
                          }}
                          className="mt-3"
                        >
                          Add Comment
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="p-0">
                      Amount Requested: ${transaction.amount_requested}
                    </Col>
                    <Col>
                      <Button
                        className="btn-success btn-sm mb-1"
                        onClick={() => {
                          approve(transaction.claim_number);
                        }}
                      >
                        Approve
                      </Button>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="p-0">
                      Claim Description:
                      <br />
                      {transaction.claim_description}
                    </Col>
                    <Col>
                      <Button
                        className="btn-danger btn-sm"
                        onClick={() => {
                          deny(transaction.claim_number);
                        }}
                      >
                        Deny
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </>
    );
  }
};
