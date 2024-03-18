import React, { useState } from "react";

import { TbTicket } from "react-icons/tb";

export default function Card({ title, count, color }) {
    return (
        <>
            <div className={`card w-80 lg:w-56 bg-white shadow-md  `}>
                <div className="card-body">

                    
                    <div className="flex items-center">
                        <span className="text-4xl text-slate-700">
                            {" "}
                            <TbTicket />{" "}
                        </span>
                        <h2
                            className={` card-title ml-auto justify-end font-light ${color} `}
                        >
                            {title}
                        </h2>
                        
                    </div>
                    <h1 className={`text-end text-2xl font-bold ${color}`}>
                        {count}
                    </h1>
                </div>
            </div>
        </>
    );
}
