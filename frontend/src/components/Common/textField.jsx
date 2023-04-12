export const TextField = ({id, label, value, setValue}) => {
    return <>
        <div className="form-group mb-3">
            <label htmlFor={ id }>{label}</label>
            <input id={id} 
                name={id}
                className="form-control"
                type="text"
                value={value}
                onChange={event => setValue(event.target.value)} />
        </div>
    </>;
}