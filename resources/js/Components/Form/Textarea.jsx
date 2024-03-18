import React from "react";


export default function Textarea({ name, label, required }) {

    return (
        <>
            <div className={`card  w-full  bg-white mb-4`}>
                <div className="card-body">
                    <label htmlFor={name}>{label}</label>
                    <textarea
                        {...(required ? {required: 'required'} : {})}
                        id={name}
                        name={name}
                        placeholder="Type here"
                        className={`textarea textarea-bordered mb-2 bg-white`}
                    />
                </div>
            </div>
        </>
    );
}
