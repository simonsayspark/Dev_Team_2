import { useContext } from "react";
import { UserContext } from "../../App";
import { TransactionForm } from "./transactionForm";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getTransactionByStatus,
  getSortTransactionByStatus,
  updateTransactionStatus,
  updateTransactionComment,
  getTransactionsByCompany,
  deleteTransaction,
  updateTransactionReimbursed,
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
  const [status, setStatus] = useState();
  const [reimburseAmount, setReimburseAmount] = useState();

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
  }, [status]);

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
  }, [sortValue]);

  const sortBy = (e) => {
    setSortValue(e);
  };

  const reimburse = (transactionNumber) => {
    console.log(reimburse);
    updateTransactionReimbursed(transactionNumber, reimburseAmount).then((x) =>
      console.log("Success")
    );
  };

  const addComment = (transactionNumber) => {
    updateTransactionComment(transactionNumber, comment).then((x) =>
      setComment(comment)
    );
  };

  const approve = (transactionNumber) => {
    updateTransactionStatus(transactionNumber, "Accepted").then((x) =>
      setStatus("Accepted")
    );
  };

  const deny = (transactionNumber) => {
    updateTransactionStatus(transactionNumber, "Denied").then((x) =>
      setStatus("Denied")
    );
  };

  //create 3 different api requests
  if (!aTransactions || !dTransactions || !pTransactions || !transactions) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  if (currentUser.role === "Employee")
    return (
      <>
        <div className="row">
          <div className="col-1 mt-2 ps-4 me-2">
            <NavLink to={"/home"} className="">
              <button className="btn btn-primary">Back</button>
            </NavLink>

            <Dropdown
              className=""
              onSelect={(e) => {
                setSortValue(e);
              }}
            >
              <Dropdown.Toggle
                className="mt-2"
                variant="info"
                id="dropdown-menu"
              >
                {sortValue}
              </Dropdown.Toggle>
              <Dropdown.Menu className="">
                <Dropdown.Item eventKey="Date">Date</Dropdown.Item>
                <Dropdown.Item eventKey="Amount">Amount</Dropdown.Item>
                <Dropdown.Item eventKey="Category">Category</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="col-10 p-0 ms-5">
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
                            navigate('/editTransaction', { state: { transaction } });
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
                              Category: {transaction.category}
                            </Row>
                            <Row>
                              <p className="px-0">Claim Description: {transaction.claim_description}</p>
                            </Row>

                          </Container>
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
                    {aTransactions.map((transaction, index) => {
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

              <Tab eventKey="denied" title="Denied">
                {dTransactions.length !== 0 ? (
                  <ListGroup>
                    {dTransactions.map((transaction, index) => {
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

          </div>
        </div>
      </>
    );
  if (currentUser.ceo_id || currentUser.role === "Financial Manager") {
    console.log(status);
    return (
      <>
        <div className="card-deck m-3">
          {transactions.map((transaction, index) => {
            return (
              <div className="card">
                <div className="card-body">
                  <Row className="mb-3 mx-1">
                    <Col className="col-8 mb-5">
                      <div className="align-items-left mb-2">
                        {transaction.claim_status === "Pending" && (
                          <span bg="secondary" className=" block mb-1">
                            <Badge>{transaction.claim_status}</Badge>
                          </span>
                        )}
                        {transaction.claim_status === "Accepted" && (
                          <span bg="success" className="block mb-1">
                            <Badge>{transaction.claim_status}</Badge>

                          </span>
                        )}
                        {transaction.claim_status === "Denied" && (
                          <span bg="danger" className="block mb-1">
                            <Badge>{transaction.claim_status}</Badge>
                          </span>
                        )}

                      </div>
                      <Row className="p-1">
                        <p className="card-text">{transaction.order_date}</p>
                      </Row>
                      <Row className="p-1">
                        <p className="card-text">Amount Requested: ${transaction.amount_requested}</p>
                      </Row>
                      <Row className="p-1">
                        <p className="card-text my-0">Claim Description:</p>
                        <p className="card-text">{transaction.claim_description}</p>
                      </Row>
                    </Col>

                    <Col className="col-4">
                      <Row className="float-end position-relative">
                        <div className="float-end position-relative">
                          <Button
                            className="btn-success mx-1"
                            onClick={() => {
                              approve(transaction.claim_number);
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            className="btn-danger"
                            onClick={() => {
                              deny(transaction.claim_number);
                            }}
                          >
                            Deny
                          </Button>
                        </div>
                        <div className="float-end position-absolute reimburse">
                          {transaction.claim_status === "Accepted" && (
                            <div className="my-2 col-12">
                              <Form.Label>Amount to Reimburse</Form.Label>
                              <Form.Group
                                className="col-lg"
                                controlId="amount_requested"
                              >

                                <Form.Control
                                  className="mb-2"
                                  onChange={(delta) => {
                                    setReimburseAmount(delta.target.value)
                                  }}
                                />
                                <Button
                                  className="btn-primary mb-1"
                                  onClick={() =>
                                    reimburse(transaction.claim_number)
                                  }
                                >
                                  Reimburse
                                </Button>
                              </Form.Group>
                            </div>
                          )}
                        </div>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="my-5 mx-1">
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Add comment"
                        rows={5}
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
                        className="mt-3 btn-primary"
                      >
                        Add Comment
                      </Button>
                    </Form.Group>
                  </Row>




                </div>
              </div>
            );
          })}
        </div>
        <br/>
        <br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

      </>

    );

  }
};
