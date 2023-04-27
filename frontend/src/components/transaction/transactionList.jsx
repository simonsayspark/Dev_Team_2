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
import Card from "react-bootstrap/Card";
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
  const [update, setUpdate] = useState(true);
  const [reimburseAmount, setReimburseAmount] = useState();
  const [deleteClicked, setDeleteClicked] = useState(true);
  const [ceoCompany, setCeoCompany] = useState(0);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (currentUser.role === "Employee") {
  //     getTransactionByStatus(currentUser.employee_id, "Accepted").then((x) =>
  //       setaTransactions(x)
  //     );
  //     getTransactionByStatus(currentUser.employee_id, "Denied").then((x) =>
  //       setdTransactions(x)
  //     );
  //     getTransactionByStatus(currentUser.employee_id, "Pending").then((x) =>
  //       setpTransactions(x)
  //     );
  //     getTransactionByStatus(currentUser.employee_id, "Appealed").then((x) =>
  //       setapTransactions(x)
  //     );
  //   } else {
  //     if (currentUser.role === "Financial Manager") {
  //       let company = currentUser.company_id
  //       getCompanyTransactionByStatus(company, "Accepted").then((x) =>
  //         setaTransactions(x)
  //       );
  //       getCompanyTransactionByStatus(company, "Denied").then((x) =>
  //         setdTransactions(x)
  //       );
  //       getCompanyTransactionByStatus(company, "Pending").then((x) =>
  //         setpTransactions(x)
  //       );
  //       getCompanyTransactionByStatus(company, "Appealed").then((x) =>
  //         setapTransactions(x)
  //       );
  //     } else { //CEO
  //       getCompanies().then((allCompanies) => {
  //         allCompanies.forEach((aCompany, index) => {
  //           if (aCompany.ceo_id === currentUser.ceo_id) {
  //             getCompanyTransactionByStatus(aCompany.company_id, "Accepted").then((x) =>
  //               setaTransactions(x)
  //             );
  //             getCompanyTransactionByStatus(aCompany.company_id, "Denied").then((x) =>
  //               setdTransactions(x)
  //             );
  //             getCompanyTransactionByStatus(aCompany.company_id, "Pending").then((x) =>
  //               setpTransactions(x)
  //             );
  //             getCompanyTransactionByStatus(aCompany.company_id, "Appealed").then((x) =>
  //               setapTransactions(x)
  //             );
  //             setCeoCompany(aCompany.company_id);
  //           }
  //         });
  //       })
  //     }
  //   }

  // }, [status]);

  useEffect(() => {
    if (currentUser.role === "Employee") {
      if (sortValue != "Sort By") {
        console.log('NOT SUPPOSED TO BE HERE')
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
        getTransactionByStatus(currentUser.employee_id, "Accepted").then((x) => {
          setaTransactions(x)
          console.log('Accepted is:')
          console.log(x)
        }
          
        );
        getTransactionByStatus(currentUser.employee_id, "Denied").then((x) => {
          setdTransactions(x)
          console.log('Denied is:')
          console.log(x)
        }
          
        );
        getTransactionByStatus(currentUser.employee_id, "Pending").then((x) => {
          setpTransactions(x)
          console.log('Pending is:')
          console.log(x)
        }
        );
        getTransactionByStatus(currentUser.employee_id, "Appeal").then((x) => {
          console.log('Inside Appeal')
          setapTransactions(x)
          console.log('Appeal is:')
          console.log(x)
        }
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
        getSortCompanyTransactionByStatus(companyID, "Appeal", sortValue).then((x) =>
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
        getCompanyTransactionByStatus(companyID, "Appeal").then((x) =>
          setapTransactions(x)
        );
      }
    }
  }, [sortValue, update, deleteClicked]);


  const sortBy = (e) => {
    setSortValue(e);
  };


  const addComment = (transactionNumber) => {
    updateTransactionComment(transactionNumber, comment).then((x) =>
      setComment("")
      //test
    );
  };

  const approve = (transactionNumber) => {
    updateTransactionComment(transactionNumber, comment).then((x) => {
      updateTransactionStatus(transactionNumber, "Accepted").then((y) =>
        updateTransactionReimbursed(transactionNumber, reimburseAmount).then((z) => {
          console.log("Success");
          setUpdate(!update);
        }))
    }
    );
    setComment("");
    //setStatus("");
    setReimburseAmount(0);
  };

  const deny = (transactionNumber) => {
    updateTransactionComment(transactionNumber, comment).then((x) => {
      updateTransactionStatus(transactionNumber, "Denied").then((y) =>
        updateTransactionReimbursed(transactionNumber, reimburseAmount).then((z) => {
          console.log("Success");
          setUpdate(!update);
        }))
      }
    );
  };
  const appeal = (transactionNumber) => {
    updateTransactionStatus(transactionNumber, "Appeal").then((x) =>
      setUpdate(!update))

  }

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
        <Row>
          <Tabs
            defaultActiveKey="pending"
            id="uncontrolled-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="pending" title="Pending">

              {pTransactions.length !== 0 ? (
                <>
                  <Container fluid className="">
                    <Row>
                      {pTransactions.map((transaction, index) => {
                        return (
                          <Col className="mb-4" xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <Card>
                              <Card.Title>
                                {/*Maybe put something in here???*/}
                              </Card.Title>
                              <Card.Body>
                                <Card.Text>
                                  <Row>
                                    <Col xs={8} sm={8} md={8} lg={9} xl={10} xxl={10}>
                                      <strong>Order Date: </strong>
                                      <br />
                                      {transaction.order_date.substring(0, transaction.order_date.indexOf("T"))}
                                    </Col>
                                    <Col className=" text-end" xs={4} sm={4} md={4} lg={3} xl={2} xxl={2}>
                                      <Badge bg="secondary" className="rounded-2" >
                                        {transaction.claim_status}
                                      </Badge>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <strong >Amount Requested: </strong>
                                      ${transaction.amount_requested}
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <strong >Category: </strong>
                                      {transaction.category}
                                    </Col>
                                  </Row>

                                  <Row className="mt-4 pb-5">
                                    <Col>
                                      <strong>Claim Description:</strong>

                                      <p>{transaction.claim_description}</p>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col>
                                      <Button className=" submitButton px-3 pt-2" type="button" onClick={() => {
                                        navigate('/editTransaction', { state: { transaction } });
                                      }}>Edit</Button>

                                      <Button variant="danger" type="button" onClick={() => {
                                        deleteTransaction(transaction.claim_number);
                                        setDeleteClicked(!deleteClicked);
                                      }}>Delete</Button>
                                    </Col>
                                  </Row>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  </Container>
                </>

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
                            <Col className="p-0">{transaction.order_date.split("T")[0]}</Col>
                            <Col>
                              <Badge bg="success" className="">
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
                            Comment: {transaction.ceo_comment}
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
                            <Col className="p-0">{transaction.order_date.split("T")[0]}</Col>
                            <Col>
                              <Badge bg="danger" className="">
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
                            Ceo Comment: {transaction.ceo_comment}
                          </Row>

                          <Button className="mt-3" type="button" onClick={() => {
                            navigate('/appealTransaction', { state: { transaction } });

                          }}>Appeal</Button>
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
                            <Col className="p-0">{transaction.order_date.split("T")[0]}</Col>
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
                            Ceo Comment: {transaction.ceo_comment}
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
        </Row>

        <div className="col-1 mt-2 ps-4 ms-3">
          <Dropdown
            className="dropdown1"
            onSelect={(e) => {
              setSortValue(e);
            }}
          >
            <Dropdown.Toggle
              className=""
              variant="secondary"
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
            <Button id="small-header" className="button btn btn-secondary text-decoration-none" onClick={() => navigate("/Home")}>Back</Button>
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
                          <Row className="mx-1">
                            <Col className="">
                              <strong>Order Date:</strong>
                              <p>{transaction.order_date}</p>
                            </Col>
                            <Col>
                              <strong>Amount Requested:</strong>
                              <p> ${transaction.amount_requested}</p>
                            </Col>
                            <Col className="">
                              <strong>Claim Description:</strong>
                              <p> {transaction.claim_description}</p>
                            </Col>

                            <Col>
                              <strong>Category:</strong>
                              <p>{transaction.category}</p>
                            </Col>

                          </Row>

                          <Row className="mb-2 mx-1">
                            <Col className="col-4">
                              <Row className="">
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
                                  </Form.Group>
                                </div>
                              </Row>
                            </Col>
                          </Row>

                          <Row className="my-1 mx-1">
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
                            </Form.Group>
                          </Row>

                          <Row className="my-3 mx-1">
                            <Col>
                              <Button
                                className="btn-success mx-1"
                                onClick={() => {
                                  approve(transaction.claim_number);
                                  console.log(transaction);
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

                            </Col>
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
                              <Col className="p-0">{transaction.order_date.split("T")[0]}</Col>
                              <Col>
                                <Badge bg="success" className="">
                                  {transaction.claim_status}
                                </Badge>{" "}
                              </Col>
                            </Row>

                            <Row className="my-1">
                              <Col className="p-0">
                                <strong>Amount Reimbursed: </strong>
                                {transaction.amount_reimbursed}
                              </Col>
                            </Row>

                            <Row className="my-1">
                              <Col className="p-0">
                                <strong>Comment:</strong>
                                <br />
                                {transaction.ceo_comment}

                              </Col>
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
                              <Col className="p-0">{transaction.order_date.split("T")[0]}</Col>
                              <Col>
                                <Badge bg="danger" className="">
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
                              Ceo Comment: {transaction.ceo_comment}
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
                              <Col className="p-0">{transaction.order_date.split("T")[0]}</Col>
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
                              Ceo Comment: {transaction.ceo_comment}
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
              className="mt-2 dropdown-bg text-white"
              variant="info"
              id="small-header"
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
            <Button id="small-header" className="button btn submitButton text-decoration-none" onClick={() => navigate("/Home")}>Back</Button>
          </div>
        </div>

      </>

    );

  }
};
