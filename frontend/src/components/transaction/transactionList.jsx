import { TransactionForm } from "./transactionForm";
import { useState, useEffect } from "react";
import { getTransaction } from "../../api/transactionApi";




const TransactionList = () => {
    const currentUser = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
  
    useEffect(() => {
      const fetchTransactions = async () => {
        const fetchedTransactions = await getTransactions(currentUser.company_id);
        setTransactions(fetchedTransactions);
      };
      fetchTransactions();
    }, [currentUser.company_id]);
  
    return (
      <div>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </div>
    );
  };
  
  export default TransactionList;