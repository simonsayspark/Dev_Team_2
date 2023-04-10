import { useContext } from "react";
import { UserContext } from "../../App";
import { useState } from "react";

export const TransactionForm = ({ onTransactionAdded }) => {

  
    const currentUser = useContext(UserContext);

 
    const [employee_id] = useState(currentUser.employee_id);
    const [company_id] = useState(currentUser.company_id);
    const [order_date,setOrder_date] = useState(null);
    const [amount_requested, setAmount_requested] = useState(0);
    const [category, setCategory] = useState('');
    const [claim_description, setClaim_description] = useState('');
    

  
   return(
    <>
        <p>{employee_id}</p>
        <p>{company_id}</p>
        <p>{order_date}</p>
        <p>{amount_requested}</p>
        <p>{category}</p>
        <p>{claim_description}</p>
    </>
   );

        // <ul className="list-group">
        //     <li className = "list-group-item bg-secondary" >
              
        //         <h5 className="text-light">Add Trasaction</h5>
        //     </li>

        //     <li className = "list-group-item">
        //     <div className="row">
        //         <div className="col-8">
        //         <TextField label="Your Name" value={userName} setValue={setUserName} />
             
        //         </div>
        //         <div className="col-2">
        //         <SelectField label="Rating" value={rating} setValue={setRating} options={ratingOptions} optionLabelKey={"label"} optionValueKey={"value"}  />
        //         </div>
        //         <div className="col-1 mt-4 ">
        //         <Rating value={rating} /> 
              
        //         </div>
              
               
        //         </div>
        //         <TextAreaField label="Comment" value={comment} setValue={setComment} />
            
        //     <div>

        //     <button type="button" className="btn btn-primary" onClick={() => {

        //         onReviewAdded(new ProductReview({ userName, rating, comment, date: new Date().toDateString() }));
        //         setRating('');
        //         setComment('');
        //         setUserName('');
        //     }}> Submit</button>

        //     </div>

        //     </li>
        // </ul>






    
}