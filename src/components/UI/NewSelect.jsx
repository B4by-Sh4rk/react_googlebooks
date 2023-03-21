import React from 'react';

const NewSelect = ({options, defaulutValue, value, onChange}) => {
    return (
        <select value={value} onChange={event => onChange(event.target.value)}>
             <option disabled value="">{defaulutValue}</option>
             {options.map(option => 
                    <option key={option.value} value={option.value}>{option.name}</option>
                )}
        </select>
    );
};

export default NewSelect;