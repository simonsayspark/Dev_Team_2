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
  getCompanyTransactionByStatus,
  getSortCompanyTransactionByStatus,
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
import { AppealTransaction } from "./appealTransaction";
import { getCompanies } from "../../api/companiesApi";

//ONLY for pending, allow for edits of the transaction details

export const TransactionList = () => {
  const currentUser = useContext(UserContext);

  const [transactions, setTransactions] = useState(undefined);
  const [aTransactions, setaTransactions] = useState(undefined);
  const [dTransactions, setdTransactions] = useState(undefined);
  const [pTransactions, setpTransactions] = useState(undefined);
  const [apTransactions, setapTransactions] = useState(undefined);
  const [sortValue, setSortValue] = useState("Sort By");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState();
  const [reimburseAmount, setReimburseAmount] = useState();
  const [deleteClicked, setDeleteClicked] = useState(true);
  const [ceoCompany, setCeoCompany] = useState(0);

  const navigate = useNavigate();

  if (currentUser.role === "Employee") {

  }

  useEffect(() => {
    if (currentUser.role === "Employee") {
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
    getTransactionByStatus(currentUser.employee_id, "Appealed").then((x) =>
      setapTransactions(x)
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

      getSortTransactionByStatus(
        currentUser.employee_id,
        "Appeal",
        sortValue
      ).then((x) => setapTransactions(x));

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
      getTransactionByStatus(currentUser.employee_id, "Appealed").then((x) =>
        setapTransactions(x)
      );
    } else {
      if (currentUser.role === "Financial Manager") {
        let company = currentUser.company_id
        getCompanyTransactionByStatus(company, "Accepted").then((x) =>
          setaTransactions(x)
        );
        getCompanyTransactionByStatus(company, "Denied").then((x) =>
          setdTransactions(x)
        );
        getCompanyTransactionByStatus(company, "Pending").then((x) =>
          setpTransactions(x)
        );
        getCompanyTransactionByStatus(company, "Appealed").then((x) =>
          setapTransactions(x)
        );
      } else { //CEO
        getCompanies().then((allCompanies) => {
          allCompanies.forEach((aCompany, index) => {
            if (aCompany.ceo_id === currentUser.ceo_id) {
              getCompanyTransactionByStatus(aCompany.company_id, "Accepted").then((x) =>
                setaTransactions(x)
              );
              getCompanyTransactionByStatus(aCompany.company_id, "Denied").then((x) =>
                setdTransactions(x)
              );
              getCompanyTransactionByStatus(aCompany.company_id, "Pending").then((x) =>
                setpTransactions(x)
              );
              getCompanyTransactionByStatus(aCompany.company_id, "Appealed").then((x) =>
                setapTransactions(x)
              );
              setCeoCompany(aCompany.company_id);
            }
          });
        })
      }
    }

  }, []);

  useEffect(() => {
    if (currentUser.role === "Employee") {
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
        getSortTransactionByStatus(
          currentUser.employee_id,
          "Appeal",
          sortValue
        ).then((x) => setapTransactions(x));

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
        getTransactionByStatus(currentUser.employee_id, "Appealed").then((x) =>
          setapTransactions(x)
        );
      }

    } else {
      var companyID = 0
      if (currentUser.role === "Financial Manager") {
        companyID = currentUser.company_id;
      } else {
        companyID = ceoCompany;
      }
      if (sortValue != "Sort By") {
        console.log('SORTING!!!')
        console.log(sortValue)
        getSortCompanyTransactionByStatus(companyID, "Accepted", sortValue).then((x) =>
          setaTransactions(x)
        );
        getSortCompanyTransactionByStatus(companyID, "Denied", sortValue).then((x) =>
          setdTransactions(x)
        );
        getSortCompanyTransactionByStatus(companyID, "Pending", sortValue).then((x) => {
          setpTransactions(x)
          console.log('PENDING')
          console.log(x)
        }
        );
        getSortCompanyTransactionByStatus(companyID, "Appealed", sortValue).then((x) =>
          setapTransactions(x)
        );
      } else {
        getCompanyTransactionByStatus(companyID, "Accepted").then((x) =>
          setaTransactions(x)
        );
        getCompanyTransactionByStatus(companyID, "Denied").then((x) =>
          setdTransactions(x)
        );
        getCompanyTransactionByStatus(companyID, "Pending").then((x) =>
          setpTransactions(x)
        );
        getCompanyTransactionByStatus(companyID, "Appealed").then((x) =>
          setapTransactions(x)
        );
      }
    }
  }, []);


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

    const appeal = (transactionNumber) => {
      updateTransactionStatus(transactionNumber, "Appealed").then((x) =>
        setStatus("Appealed"))

    }
  };

  //create 3 different api requests
  if (!aTransactions || !dTransactions || !pTransactions || !apTransactions) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }
  if (currentUser.role === "Employee")
    return (
      <>
        <div className="row">


          <div className="col-10 p-0 ms-5">
            <Tabs
              defaultActiveKey="pending"
              id="uncontrolled-tab-example"
              className="mb-3"
              fill

            >
              <Tab eventKey="pending" title="Pending">
                {pTransactions.length !== 0 ? (
                  <ListGroup>
                    {pTransactions?.map((transaction, index) => {
                      return (
                        <ListGroup.Item>
                          <Container className="d-flex ">
                            <Row>
                              <strong>Order Date:</strong>
                              <Col className="">{transaction.order_date}</Col>

                            </Row>

                            <Row>
                              <strong >Amount Requested:</strong>
                              <p> ${transaction.amount_requested}</p>
                            </Row>

                            <Row>
                              <Col>
                                <strong>Claim Description:</strong>

                                <p> {transaction.claim_description}</p>
                              </Col>

                            </Row>
                          </Container>

                          <Col>

                            <div className="d-flex justify-content-end">
                              <Badge bg="secondary" className="">
                                {transaction.claim_status}
                              </Badge>{" "}


                              <Button className="px-3 me-1 submitButton" type="button" onClick={() => {
                                navigate('/editTransaction', { state: { transaction } });
                              }}>Edit</Button>

                              <Button className="" type="button" onClick={() => {
                                deleteTransaction(transaction.claim_number);
                                setDeleteClicked(!deleteClicked);
                              }}>Delete</Button>

                              <Button className="" type="button" onClick={() => {
                                navigate('/appealTransaction', { state: { transaction } });

                              }}>Appeal</Button>

                            </div>
                          </Col>
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

              <Tab eventKey="appealed" title="Appealed">
                {apTransactions.length !== 0 ? (
                  <ListGroup>
                    {apTransactions.map((transaction, index) => {
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

        <div className="col-1 mt-2 ps-4 ms-3">



          <Dropdown
            className="dropdown1"
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

          <div className="mt-1">
            <Button className="button btn submitButton text-decoration-none" onClick={() => navigate("/Home")}>Back</Button>
          </div>
        </div>
      </>
    );
  else if (currentUser.ceo_id || currentUser.role === "Financial Manager") {
    return (
      <>
        <div className="row">
          <div className="col-10 p-0 ms-5">
            <Tabs
              defaultActiveKey="pending"
              id="uncontrolled-tab-example"
              className="mb-3"
              fill

            >
              <Tab eventKey="pending" title="Pending">
                {pTransactions.length !== 0 ? (
                  <ListGroup>
                    {pTransactions?.map((transaction, index) => {
                      return (
                        <ListGroup.Item>
                          <Container className="d-flex ">
                            <Row>
                              <strong>Order Date:</strong>
                              <Col className="">{transaction.order_date}</Col>

                            </Row>

                            <Row>
                              <strong>Amount Requested:</strong>
                              <p> ${transaction.amount_requested}</p>
                            </Row>

                            <Row>
                              <Col>
                                <strong>Claim Description:</strong>

                                <p> {transaction.claim_description}</p>
                              </Col>

                            </Row>
                          </Container>
                          <Row className="mb-3 mx-1">
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

              <Tab eventKey="appealed" title="Appealed">
                {apTransactions.length !== 0 ? (
                  <ListGroup>
                    {apTransactions.map((transaction, index) => {
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

        <div className="col-1 mt-2 ps-4 ms-3">



          <Dropdown
            className="dropdown1"
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

          <div className="mt-1">
            <Button className="button btn submitButton text-decoration-none" onClick={() => navigate("/Home")}>Back</Button>
          </div>
        </div>

      </>

    );

  }
};
