import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Settings({user}) {

    const history = useNavigate();
    const [kontakData, setKontakData] = useState([]);
    const target = user.username === 'Admin' ? '' : user.username;
    useEffect(() => {
        // Fetch Kontak data when the component mounts
        async function fetchKontakData() {
            try {
                const response = await axios.post('/kontak', { target:target }); // Adjust the URL based on your Laravel route
                setKontakData(response.data);
            } catch (error) {
                console.error('Error fetching Kontak data:', error);
            }
        }

        fetchKontakData();

        // Cleanup function
        return () => {
            // Cleanup code if needed
        };
    }, []);

    const handleEdit = (id) => {
        // Redirect or navigate to the edit page with the Kontak ID
        history(`/settings/editKontak/${id}`);
        console.log(`Edit Kontak with ID: ${id}`);
    };


    return (
        <>
            <div className={`card lg:w-full w-96 bg-white shadow-md text-slate-700`}>
                <div className="card-body">
                    <h1 className={`font-bold`}>Panraki Bot</h1>
                    <div className="overflow-x-auto">
                    <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="bg-slate-700 text-white">
                                  
                                    <th>Unit</th>
                                    <th>PJ 1</th>
                                    <th>PJ 2</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
           
                            {kontakData.map((kontak, index) => (
                                <tr key={index} className="hover:text-white hover:bg-slate-700">
                                    
                                    <th onClick={() => handleEdit(kontak.id)}>{kontak.unit}</th>
                                    <th onClick={() => handleEdit(kontak.id)}>{kontak.pj1}</th>
                                    <th onClick={() => handleEdit(kontak.id)}>{kontak.pj2}</th>
                                       <th>
                                        <button onClick={() => handleEdit(kontak.id)}>Edit</button>
                                    </th>
                                </tr>
                            ))}
                               
                            </tbody>
                        </table>
                </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}
