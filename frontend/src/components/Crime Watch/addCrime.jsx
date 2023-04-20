import { warrantRequest } from "./arrestWarrant";
import { useState, useEffect } from "react";
import { WarrantRequest } from "./arrestWarrant";
// import { TransactionList } from "./transactionList";

//leave for now, but you can get rid of later

export const AddCriminal = () => {


    // const [transaction, setTransaction] = useState(undefined);


    // const updateTransaction = (new_transaction) => {

    //     setTransaction({

    //         ...transaction, ...new_transaction

    //     });
    // };

    return (
        <div>
            <WarrantRequest />

            {/* <TransactionList  /> */}

        </div>



    );

}