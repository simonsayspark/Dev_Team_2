export const TextAreaField = ({ label, value, setValue }) => <>
   

    <div className="form-group mb-3">
        <label htmlFor="value">{ label }</label>
        <textarea
            name="value"
            className="form-control"
            value={value}
            rows={5}
            id="value"
            onChange={event => setValue(event.target.value)} />
    </div>
   
</>;
