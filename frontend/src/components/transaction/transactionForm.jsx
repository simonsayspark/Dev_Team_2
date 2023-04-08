

export const ReviewForm = ({ onReviewAdded }) => {

    const options = [
        { value: 1, label: '1 stars' },
        { value: 2, label: '2 stars' },
        { value: 3, label: '3 stars' },
        { value: 4, label: '4 stars' },
        { value: 5, label: '5 stars' }

    ];



    const [ratingOptions] = useState(options);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('')

  
    return (

        <ul className="list-group">
            <li className = "list-group-item bg-secondary" >
              
                <h5 className="text-light">Add Review</h5>
            </li>

            <li className = "list-group-item">
            <div className="row">
                <div className="col-8">
                <TextField label="Your Name" value={userName} setValue={setUserName} />
             
                </div>
                <div className="col-2">
                <SelectField label="Rating" value={rating} setValue={setRating} options={ratingOptions} optionLabelKey={"label"} optionValueKey={"value"}  />
                </div>
                <div className="col-1 mt-4 ">
                <Rating value={rating} /> 
              
                </div>
              
               
                </div>
                <TextAreaField label="Comment" value={comment} setValue={setComment} />
            
            <div>

            <button type="button" className="btn btn-primary" onClick={() => {

                onReviewAdded(new ProductReview({ userName, rating, comment, date: new Date().toDateString() }));
                setRating('');
                setComment('');
                setUserName('');
            }}> Submit</button>

            </div>

            </li>
        </ul>






    );
}