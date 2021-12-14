import React from "react";

const EMSelect = ({options, value, onChange}) => {
    return (
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            {options.map(opt => 
                <option key={opt.value} value={opt.value}>{opt.name}</option>
            )}
        </select>
    );
};

export default EMSelect;