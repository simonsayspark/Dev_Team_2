export const SelectField = ({ label, value, setValue, options, optionValueKey, optionLabelKey, hideBlankOption }) => {
    return <>
        <div className="form-group mb-3">
            <label htmlFor="">{label}</label>
            <select
                value={value}
                className="form-select"
                onChange={event => { console.log(event); setValue(event.target.value) }}
                
            >
                {!hideBlankOption && <option></option>}
                {
                    options.map((option, index) => (
                        <option
                            key={index}
                            value={optionValueKey ? option[optionValueKey] : option}
                        >
                            {optionLabelKey ? option[optionLabelKey] : optionValueKey
                                ? option[optionValueKey] : option}
                        </option>
                    ))
                }
            </select>
        </div>
    </>;
}