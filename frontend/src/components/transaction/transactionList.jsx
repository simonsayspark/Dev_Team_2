import { TransactionForm } from "./transactionForm";
import { useState, useEffect } from "react";
import { getTransaction } from "../../api/transactionApi";




const TransactionList = () => {
    const currentUser = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
  
    useEffect(() => {
      const fetchTransactions = async () => {
        const fetchedTransactions = await getTransaction(currentUser.company_id);
        setTransactions(fetchedTransactions);
      };
      fetchTransactions();
    }, [currentUser.company_id]);
  
    return (
        <div>
          {transactions.map((transaction) => {
            const { id, employee_id, company_id, order_date, amount_requested, category, claim_description } = transaction;
            return (
              <TransactionForm 
                key={id}
                id={id}
                employee_id={employee_id}
                company_id={company_id}
                order_date={order_date}
                amount_requested={amount_requested}
                category={category}
                claim_description={claim_description}
              />
            );
          })}
        </div>
      );
  };
  
  export default TransactionList;