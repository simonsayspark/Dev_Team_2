import { transactionForm } from "./transactionForm";
import { useState, useEffect } from "react";
import { TransactionForm } from "./transactionForm";

export const AddTransaction= () => {


    const [transaction, setTransaction] = useState(undefined);

   
    const updateTransaction = (new_transaction) => {
        
        setTransaction({

            ...transaction, ...new_transaction

        });
    };



    return (
        <TransactionForm/>
    );

}