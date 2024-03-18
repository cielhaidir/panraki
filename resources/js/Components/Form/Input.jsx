import React from "react";


export default function Input({ name, label, type, required, paragraf, value, disabled, onChange }) {
    type = type || 'text';
    let classtype;
    switch (type) {
        case "text":
            classtype = "input input-bordered";
            break;
        case "file":
            classtype = "file-input file-input-bordered ";
            break;
        default:
            classtype = "input input-bordered";
    }

    const handleChange = (e) => {
        onChange(e); // Call the onChange handler passed from the parent component

    };

    return (
        <>
            <div className={`card  w-full  bg-white  text-black mb-4`}>
                <div className="card-body">
                    <label htmlFor={name}>{label}</label>
                    <p>{paragraf}</p>
                    <input
                       {...(required ? { required: 'required' } : {})}
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={handleChange}
                        {...(type === 'file' ? { accept: 'image/*' } : {})}
                        placeholder="Type here"
                        className={`${classtype} w-full bg-white disabled:bg-slate-100 disabled:border-opacity-10 disabled:text-slate-700`}
                        {...(disabled ? { disabled: 'disabled' } : {})}
                    />
                </div>
            </div>
        </>
    );
}
