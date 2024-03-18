import Header from "@/Components/Pandraki/Header";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Ticket() {
    const { props } = usePage();
    const { unit, pj1, pj2 } = props;

    let unitName;
    let target = unit;

    switch (unit) {
        case "tik":
            unitName = "UPT TIK";
            break;
        case "mr":
            unitName = "UPT TP3A";
            break;
        case "rt":
            unitName = "RUMAH TANGGA";
            break;
        default:
            unitName = "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nama", e.target.nama.value);
        formData.append("unit", e.target.unit_pelapor.value);
        formData.append("target", e.target.target.value);
        formData.append("no_pelapor", e.target.no_pelapor.value);
        formData.append("pj1", e.target.pj1.value);
        formData.append("pj2", e.target.pj2.value);
        formData.append("bukti", e.target.bukti.files[0]);
        formData.append("lokasi", e.target.lokasi.value);
        formData.append("keluhan", e.target.keluhan.value);
        try {
            const response = await axios.post("/laporan", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data.message);
            // Tambahkan logika penanganan sukses di sini
            toast("Laporan Diterima 🔊!", {
                onClose: () => {
                    window.location.href = "/";
                },
            });
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            // Tambahkan logika penanganan kesalahan di sini
        }
    };

    return (
        <>
            <Header />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <section className="py-10 md:py-16 ">
                    <div className="container">
                        <div className="card card-side m-3">
                            <div className="card-body ">
                                <h2 className="card-title text-3xl items-center sm:text-4xl font-bold">
                                    Buat Laporan
                                </h2>
                                <p className="mb-5">
                                    Melaporkan Ke Unit :{" "}
                                    <span className="font-bold">
                                        {unitName}
                                    </span>
                                </p>

                                <input
                                    id="target"
                                    name="target"
                                    value={target}
                                    hidden
                                    readOnly
                                ></input>
                                <input
                                    id="pj1"
                                    name="pj1"
                                    value={pj1}
                                    hidden
                                    readOnly
                                ></input>
                                <input
                                    id="pj2"
                                    name="pj2"
                                    value={pj2}
                                    hidden
                                    readOnly
                                ></input>

                                <label htmlFor="nama">Nama Pelapor:</label>
                                <input
                                    required
                                    id="nama"
                                    name="nama"
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full  mb-2"
                                />

                                <label htmlFor="unit_pelapor">Asal Unit:</label>
                                <input
                                    required
                                    id="unit_pelapor"
                                    name="unit_pelapor"
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full  mb-2"
                                />

                                    <label htmlFor="no_pelapor">No Whatsapp:</label>
                                    <input
                                        required
                                        id="no_pelapor"
                                        name="no_pelapor"
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full  mb-2"
                                    />

                              
                                {unit === "mr" && (
                                    <>
                                        <label htmlFor="additionalInput1">
                                            Additional Input 1:
                                        </label>
                                        <input
                                            id="additionalInput1"
                                            name="additionalInput1"
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full  mb-2"
                                            value={additionalInput1}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    setAdditionalInput1
                                                )
                                            }
                                        />
                                        <label htmlFor="additionalInput2">
                                            Additional Input 2:
                                        </label>
                                        <input
                                            id="additionalInput2"
                                            name="additionalInput2"
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full  mb-2"
                                            value={additionalInput2}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    setAdditionalInput2
                                                )
                                            }
                                        />
                                        <label htmlFor="additionalInput3">
                                            Additional Input 3:
                                        </label>
                                        <input
                                            id="additionalInput3"
                                            name="additionalInput3"
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full  mb-2"
                                            value={additionalInput3}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    setAdditionalInput3
                                                )
                                            }
                                        />
                                    </>
                                )}

                                <label htmlFor="bukti">Upload Gambar:</label>
                                <input
                                    required
                                    id="bukti"
                                    name="bukti"
                                    type="file"
                                    placeholder="Type here"
                                    className="file-input file-input-bordered w-full  mb-2"
                                />

                                <label htmlFor="lokasi">Lokasi Masalah: </label>
                                <input
                                    required
                                    id="lokasi"
                                    name="lokasi"
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered sm:w-full  mb-2"
                                />

                                <label htmlFor="keluhan">Keluhan:</label>
                                <textarea
                                    id="keluhan"
                                    name="keluhan"
                                    className="textarea textarea-bordered mb-2"
                                    placeholder="Bio"
                                ></textarea>

                                <button
                                    type="submit"
                                    className="btn btn-neutral"
                                >
                                    Kirim Laporan
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </>
    );
}
