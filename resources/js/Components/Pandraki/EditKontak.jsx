import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { ToastContainer, toast } from "react-toastify";

export default function EditKontak() {
    const { id } = useParams(); // Get the id parameter from the URL
    const [kontak, setKontak] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchKontakById() {
            try {
                const response = await axios.get(`/kontak/${id}`); // Adjust the URL based on your API endpoint
                setKontak(response.data);
            } catch (error) {
                console.error("Error fetching Kontak data:", error);
            }
        }

        fetchKontakById();

        return () => {
            // Cleanup code if needed
        };
    }, [id]); // Execute effect when id changes

    const handleChange = (e) => {
        let value = e.target.value;

        // Allow only numbers
        if (!/^[0-9]*$/.test(value)) {
            // If non-numeric characters are entered, remove them
            value = value.replace(/[^0-9]/g, "");
        }

        // Update the corresponding property in the kontak state
        setKontak({ ...kontak, [e.target.name]: e.target.value });
    };

    if (!kontak) {
        return <div>Loading...</div>; // Show loading indicator while fetching Kontak data
    }

    const handleSimpan = async () => {
        try {
            await axios.put(`/kontak/${id}`, kontak); // Adjust the URL based on your API endpoint
            toast.success("Kontak berhasil diperbarui!", {
                onClose: () => {
                    navigate(-1);
                },
            });
        } catch (error) {
            console.error("Error saving Kontak data:", error);
            toast.error("Terjadi kesalahan saat menyimpan data Kontak.");
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
                transition:Bounce
            />
            <div className={`card h-auto lg:w-full w-96 bg-white shadow-md`}>
                <div className="card-body text-slate-700">
                    <h1 className={`font-bold`}>Edit nomor Whatsapp </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:gap-8 xl-gap-10">
                        <div>
                            <label htmlFor="unit">Unit</label>
                            <input
                                disabled
                                id="unit"
                                name="unit"
                                type="text"
                                value={kontak.unit || ""} // Populate with kontak.pj1
                                placeholder="Type here"
                                className="input disabled:input-bordered bg-white disabled:bg-white disabled:text-black w-full  mb-2"
                                onChange={handleChange} // Update kontak.pj1 on change
                            />
                        </div>
                        <div>
                            <label htmlFor="pj1">Penanggung Jawab 1</label>
                            <input
                                required
                                id="pj1"
                                name="pj1"
                                type="text"
                                value={kontak.pj1 || ""} // Populate with kontak.pj1
                                placeholder="Type here"
                                className="input input-bordered bg-white text-black w-full  mb-2"
                                onChange={handleChange} // Update kontak.pj1 on change
                            />
                        </div>
                        <div>
                            <label htmlFor="pj2">Penanggung Jawab 2</label>
                            <input
                                required
                                id="pj2"
                                name="pj2"
                                type="text"
                                value={kontak.pj2 || ""} // Populate with kontak.pj2
                                placeholder="Type here"
                                className="input input-bordered bg-white text-black w-full  mb-2"
                                onChange={handleChange} // Update kontak.pj2 on change
                            />
                        </div>
                    </div>
                    <button
                        className="btn bg-slate-700 hover:bg-slate-500"
                        onClick={handleSimpan}
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </>
    );
}
