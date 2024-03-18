import React from "react";

export default function Dropdown({ name, label, required, options, onChange, valueDropdown  }) {

    const handleChange = (e) => {
        onChange(e); // Call the onChange handler passed from the parent component

    };

    return (
        <>
            <div className={`card  w-full  bg-white mb-4 text-black`}>
                <div className="card-body">
                    <label htmlFor={name}>{label}:</label>
                    <select
                        {...(required ? {required: 'required'} : {})}
                        id={name}
                        name={name}
                        className="input input-bordered w-full mb-2 bg-white text-black"
                        onChange={handleChange}
                        value={valueDropdown}
                    >
                        {options.map((option, index) => (
                            <option key={index} value={option} selected={valueDropdown === option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}
