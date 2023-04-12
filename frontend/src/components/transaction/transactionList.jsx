
import { useContext } from "react";
import { UserContext } from "../../App";
import { TransactionForm } from "./transactionForm";
import { useState, useEffect } from "react";
import { getTransaction } from "../../api/transactionApi";
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

// order_date date,
// amount_requested int,
// category VARCHAR(50),
// claim_description VARCHAR(200),
// amount_reimbursed int DEFAULT NULL, 
// claim_status VARCHAR(50) DEFAULT 'Pending',
// ceo_comment VARCHAR(200) DEFAULT '',

export const TransactionList = () => {
    const currentUser = useContext(UserContext);


    const [transactions, setTransactions] = useState(undefined);
    useEffect(() => {
        getTransaction(currentUser.employee_id).then((x) => setTransactions(x));
    }, [])


    { console.log("here") }

    return (
        <>
            {/* {reviews.length === 0 && <div className="row bg-light"><p className="col-12"><span className="mt-3 mr-5 ">Be the first to review!</span></p></div>} */}
            {console.log('Transactions')}
            {console.log(transactions)}
            {transactions ? transactions.map((transaction, index) => {
              return(
              <ListGroup key={index}>

                    <ListGroup.Item>
                        {transaction.order_date}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        {transaction.amount_requested}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        {transaction.amount_reimbursed}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        {transaction.claim_description}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        {transaction.claim_status}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        {transaction.ceo_comment}
                    </ListGroup.Item>

                </ListGroup>
              );

            }


            ) : (
                <p>No available transaction</p>
            )


            }
        </>);
}

