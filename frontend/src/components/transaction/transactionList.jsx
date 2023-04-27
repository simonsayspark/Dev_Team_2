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
  const [status, setStatus] = useState(undefined);
  const [disableApprove, setDisableApprove] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.role === "Employee") {
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
          "Appealed",
          sortValue
        ).then((x) => setapTransactions(x));

      } else {
        getTransactionByStatus(currentUser.employee_id, "Accepted").then((x) => {
          setaTransactions(x)
        }
        );
        getTransactionByStatus(currentUser.employee_id, "Denied").then((x) => {
          setdTransactions(x)
        }
        );
        getTransactionByStatus(currentUser.employee_id, "Pending").then((x) => {
          setpTransactions(x)
          console.log('Pending is:')
          console.log(x)
        }
        );
        getTransactionByStatus(currentUser.employee_id, "Appealed").then((x) => {
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
  }, [sortValue, update, deleteClicked]);

  useEffect(() => {
    if (reimburseAmount) {
      setDisableApprove(false);
    } else {
      setDisableApprove(true);
    }
  }, [reimburseAmount])


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
    let newComment = "";
    if (comment) {
      newComment = comment;
    } else {
      newComment = "Transaction Approved.";
    }
    updateTransactionComment(transactionNumber, newComment).then((x) => {
      console.log('Comment added')
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
    let newComment = "";
    if (comment) {
      newComment = comment;
    } else {
      newComment = "Transaction Denied.";
    }
    updateTransactionComment(transactionNumber, newComment).then((x) => {
      updateTransactionStatus(transactionNumber, "Denied").then((y) =>
        updateTransactionReimbursed(transactionNumber, 0).then((z) => {
          console.log("Success");
          setUpdate(!update);
        }))
    }
    );
  };

  const appeal = (transactionNumber) => {
    updateTransactionStatus(transactionNumber, "Appealed").then((x) =>
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
                              <Card.Header className="pb-0 pt-3 main-bg text-white" id="">
                                <Row>
                                  <Col>
                                    <div id="header" className=" ">Claim# {transaction.claim_number} </div>
                                  </Col>
                                  <Col xs={7} sm={8} md={8} lg={4} xl={3} xxl={3}>
                                    <div id="header" className="text-end" >{transaction.order_date.substring(0, transaction.order_date.indexOf("T"))}</div>
                                  </Col>
                                </Row>
                              </Card.Header>
                              <Card.Body>
                                <Card.Text >
                                  <Row>




                                    <Col className="mb-3">
                                      <div id="header">Amount Requested: </div>
                                      <span id="small-header">${transaction.amount_requested}</span>

                                    </Col>

                                    <Col className=" text-end" xs={4} sm={4} md={4} lg={3} xl={2} xxl={2}>
                                      <Badge bg="secondary" className="rounded-2 px-2 fs-6"  >
                                        <span id="small-header">{transaction.claim_status}</span>
                                      </Badge>
                                    </Col>
                                    <hr />

                                  </Row>
                                  <Row>
                                    <Col className="mb-3">
                                      <div id="header">Category: </div>

                                      <span id="small-header"> {transaction.category}</span>

                                    </Col>
                                    <hr />
                                  </Row>

                                  <Row className="mt-1 pb-5">
                                    <Col>
                                      <div id="header">Claim Description:</div>

                                      <div id="small-header" className="fs-6">{transaction.claim_description}</div>
                                    </Col>
                                  </Row>

                                  <Row>

                                    <Col>
                                      <Button className=" submitButton px-3 pt-2 me-2" id="small-header" type="button" onClick={() => {
                                        navigate('/editTransaction', { state: { transaction } });
                                      }}>Edit</Button>

                                      <Button variant="danger" className="px-2" type="button" id="small-header" onClick={() => {
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
                <>

                  <Container fluid className="">
                    <Row>
                      {aTransactions.map((transaction, index) => {
                        return (

                          //   <Row>
                          //   Amount Requested: ${transaction.amount_requested}
                          // </Row>

                          // <Row>
                          //   Category: {transaction.category}
                          // </Row>


                          <Col className="mb-4" xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <Card>
                              <Card.Header className="pb-0 pt-3 main-bg text-white" id="">
                                <Row>
                                  <Col>
                                    <div id="header" className=" ">Claim# {transaction.claim_number} </div>
                                  </Col>
                                  <Col xs={7} sm={8} md={8} lg={4} xl={3} xxl={3}>
                                    <div id="header" className="text-end" >{transaction.order_date.substring(0, transaction.order_date.indexOf("T"))}</div>
                                  </Col>
                                </Row>
                              </Card.Header>
                              <Card.Body>
                                <Card.Text >
                                  <Row>




                                    <Col className="mb-3">
                                      <div id="header">Amount Requested: </div>
                                      <span id="small-header">${transaction.amount_requested}</span>

                                    </Col>

                                    <Col className=" text-end" xs={4} sm={4} md={4} lg={3} xl={2} xxl={2}>
                                      <Badge bg="success" className="rounded-2 px-2 fs-6"  >
                                        <span id="small-header">{transaction.claim_status}</span>
                                      </Badge>
                                    </Col>
                                    <hr />

                                  </Row>
                                  <Row>
                                    <Col className="mb-3">
                                      <div id="header">Category: </div>

                                      <span id="small-header"> {transaction.category}</span>

                                    </Col>
                                    <hr />
                                  </Row>

                                  <Row className="mt-1 pb-1">
                                    <Col>
                                      <div id="header">Claim Description:</div>

                                      <div id="small-header" className="fs-6">{transaction.claim_description}</div>
                                    </Col>
                                  </Row>

                                  <hr />


                                  <Row className=" pb-3">
                                    <Col>
                                      <div id="header">Comment:</div>
                                      <div id="small-header" className="fs-6">  {transaction.ceo_comment}</div>
                                    </Col>
                                  </Row>


                                  <Row>

                                    <Col className="">
                                      <Button className=" submitButton px-3 pt-2 me-2" id="small-header" type="button" onClick={() => {
                                        navigate('/editTransaction', { state: { transaction } });
                                      }}>Edit</Button>

                                      <Button variant="danger" className="px-2" type="button" id="small-header" onClick={() => {
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
                <p className="ms-3">No available transaction</p>
              )}
            </Tab>



            <Tab eventKey="denied" title="Denied">
              {dTransactions.length !== 0 ? (
                <>
                  <Container fluid className="">
                    <Row>
                      {dTransactions.map((transaction, index) => {
                        return (



                          <Col className="mb-4" xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <Card>
                              <Card.Header className="pb-0 pt-3 main-bg text-white" id="">
                                <Row>
                                  <Col>
                                    <div id="header" className=" ">Claim# {transaction.claim_number} </div>
                                  </Col>
                                  <Col xs={7} sm={8} md={8} lg={4} xl={3} xxl={3}>
                                    <div id="header" className="text-end" >{transaction.order_date.substring(0, transaction.order_date.indexOf("T"))}</div>
                                  </Col>
                                </Row>
                              </Card.Header>
                              <Card.Body>
                                <Card.Text >
                                  <Row>




                                    <Col className="mb-3">
                                      <div id="header">Amount Requested: </div>
                                      <span id="small-header">${transaction.amount_requested}</span>

                                    </Col>

                                    <Col className=" text-end" xs={4} sm={4} md={4} lg={3} xl={2} xxl={2}>
                                      <Badge bg="danger" className="rounded-2 px-2 fs-6"  >
                                        <span id="small-header">{transaction.claim_status}</span>
                                      </Badge>
                                    </Col>
                                    <hr />

                                  </Row>
                                  <Row>
                                    <Col className="mb-3">
                                      <div id="header">Category: </div>

                                      <span id="small-header"> {transaction.category}</span>

                                    </Col>
                                    <hr />
                                  </Row>

                                  <Row className="mt-1 pb-1">
                                    <Col>
                                      <div id="header">Claim Description:</div>

                                      <div id="small-header" className="fs-6">{transaction.claim_description}</div>
                                    </Col>
                                  </Row>

                                  <hr />


                                  <Row className=" pb-3">
                                    <Col>
                                      <div id="header">Ceo Comment:</div>
                                      <div id="small-header" className="fs-6">  {transaction.ceo_comment}</div>
                                    </Col>
                                  </Row>


                                  <Row>
                                    <Col>
                                      <Button className="mt-3 submitButton" type="button" onClick={() => {
                                        navigate('/appealTransaction', { state: { transaction } });

                                      }}>Appeal</Button>
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
                <p className="ms-3">No available transaction</p>
              )}
            </Tab>

            <Tab eventKey="appealed" title="Appealed">
              {console.log(apTransactions)}
              {apTransactions.length !== 0 ? (
                <>
                  <Container fluid className="">
                    <Row>
                      {apTransactions.map((transaction, index) => {
                        return (
                     
                          <Col className="mb-4" xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <Card>
                              <Card.Header className="pb-0 pt-3 main-bg text-white" id="">
                                <Row>
                                  <Col>
                                    <div id="header" className=" ">Claim# {transaction.claim_number} </div>
                                  </Col>
                                  <Col xs={7} sm={8} md={8} lg={4} xl={3} xxl={3}>
                                    <div id="header" className="text-end" >{transaction.order_date.substring(0, transaction.order_date.indexOf("T"))}</div>
                                  </Col>
                                </Row>
                              </Card.Header>
                              <Card.Body>
                                <Card.Text >
                                  <Row>




                                    <Col className="mb-3">
                                      <div id="header">Amount Requested: </div>
                                      <span id="small-header">${transaction.amount_requested}</span>

                                    </Col>

                                    <Col className=" text-end" xs={4} sm={4} md={4} lg={3} xl={2} xxl={2}>
                                      <Badge bg="warning" className="rounded-2 px-2 fs-6"  >
                                        <span id="small-header">{transaction.claim_status}</span>
                                      </Badge>
                                    </Col>
                                    <hr />

                                  </Row>
                                  <Row>
                                    <Col className="mb-3">
                                      <div id="header">Category: </div>

                                      <span id="small-header"> {transaction.category}</span>

                                    </Col>
                                    <hr />
                                  </Row>

                                  <Row className="mt-1 pb-1">
                                    <Col>
                                      <div id="header">Claim Description:</div>

                                      <div id="small-header" className="fs-6">{transaction.claim_description}</div>
                                    </Col>
                                  </Row>

                                  <hr />


                                  <Row className=" pb-3">
                                    <Col>
                                      <div id="header">Ceo Comment:</div>
                                      <div id="small-header" className="fs-6">  {transaction.ceo_comment}</div>
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
              <p className="ms-3">No available transaction</p>
              )}
            </Tab>
          </Tabs>
        </Row >

        <div className="col-1 mt-1  ms-3">
          <Dropdown
            id="small-header"
            className="dropdown1"
            onSelect={(e) => {
              setSortValue(e);
            }}
          >
            <Dropdown.Toggle
              className="fs-9"
              variant="secondary"
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

          <div className="mt-2">
            <Button id="small-header" className="button btn btn-secondary " onClick={() => navigate("/Home")}>Back</Button>
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
                  <Container fluid className="">
                    <Row>
                      {pTransactions?.map((transaction, index) => {
                        return (
                          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <Card>
                              <Card.Header className="pb-0 pt-3 main-bg text-white" id="">
                                <Row>
                                  <Col>
                                    <div id="header">Claim# {transaction.claim_number}</div>
                                  </Col>
                                  <Col xs={7} sm={8} md={8} lg={4} xl={3} xxl={3}>
                                    <div id="header" className="text-end">{transaction.order_date.substring(0, transaction.order_date.indexOf("T"))}</div>
                                  </Col>
                                </Row>
                              </Card.Header>
                              <Card.Body>
                                <Card.Text>
                                  <Row>

                                    <Col className="mb-3">
                                      <div id="header">Amount Requested:</div>
                                      <span id="small-header"> ${transaction.amount_requested}</span>
                                    </Col>
                                    <Col className="mb-3">
                                      <div id="header">Category:</div>
                                      <span id="small-header">{transaction.category}</span>
                                    </Col>
                                    <Col className=" text-end" xs={12} sm={4} md={4} lg={3} xl={2} xxl={2}>
                                      <Badge bg="secondary" className="rounded-2 px-2 fs-6"  >
                                        <span id="small-header">{transaction.claim_status}</span>
                                      </Badge>
                                    </Col>
                                    <hr />
                                  </Row>

                                  <Row className="mt-1 pb-2">
                                    <Col>
                                      <div id="header">Claim Description:</div>
                                      <div id="small-header" className="fs-6">{transaction.claim_description}</div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col>
                                      <Form.Label>Amount to Reimburse</Form.Label>
                                      <Form.Group
                                        className="col-2"
                                        controlId="amount_requested"
                                      >
                                        <Form.Control
                                          className="mb-1"
                                          onChange={(delta) => {
                                            setReimburseAmount(delta.target.value)
                                          }}
                                        />
                                      </Form.Group>
                                    </Col>
                                  </Row>

                                  <Row className="my-2">
                                    <Form.Group controlId="comment" className="col-12">
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
                                  <Row className="mt-3">
                                    <Col>
                                      <Button
                                        className="btn-success px-3 pt-2 me-2"
                                        id="small-header"
                                        onClick={() => {
                                          approve(transaction.claim_number);
                                          console.log(transaction);
                                        }}
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        className="btn-danger px-2"
                                        id="small-header"
                                        onClick={() => {
                                          deny(transaction.claim_number);
                                        }}
                                      >
                                        Deny
                                      </Button>

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
        </div >



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
            <Button id="small-header" className="display-4 button btn submitButton text-decoration-none" onClick={() => navigate("/Home")}>Back</Button>
          </div>
        </div>

      </>

    );

  }
};
