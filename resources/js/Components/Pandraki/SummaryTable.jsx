import React, { useState } from "react";

export default function SummaryTable({ data }) {
    return (
        <>
            <div className={`card lg:w-full w-80  bg-white shadow-md text-black`}>
                <div className="card-body">
                    <div className="overflow-x-auto">
                        <table className="table lg:table-fixed border border-neutral-200">
                            {/* head */}
                            <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                                <tr className=" border-b border-neutral-700 bg-slate-700 text-neutral-50 dark:border-neutral-600 dark:bg-slate-700">
                                  
                                    <th>Unit</th>
                                    <th>Selesai</th>
                                    <th>Proses</th>
                                    <th>Menunggu</th>
                                    <th>Pending</th>
                                    <th>Total Tiket</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 2 */}
                          
                                    {data.map((item, index) => (
                                        <tr key={index} className="hover:text-white hover:bg-slate-700">
                                            {/* Render table cells for each data field */}
                                   
                                            <td>{item.target}</td>
                                            <td>{item.selesai}</td>
                                            <td>{item.proses}</td>
                                            <td>{item.menunggu}</td>
                                            <td>{item.pending}</td>
                                            <td>{item.total}</td>
                                            {/* Add more table cells for additional fields */}
                                        </tr>
                                    ))}
                             
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
