import { Link } from "@inertiajs/react";
import Dropdown from "../Form/Dropdown";
import React, { useState } from "react";
import Wave from "react-wavify";

export default function Hero() {
    const [selectedUnit, setSelectedUnit] = useState("tik");

    const handleUnitChange = (event) => {
        let unit = event.target.value;
        let unitName
        switch (unit) {
            case "TIK":
                unitName = "tik";
                break;
            case "TP3A":
                unitName = "mr";
                break;
            case "RT":
                unitName = "rt";
                break;
            default:
                unitName = "";
        }

        
        setSelectedUnit(unitName);
    };

    const handleCreateReport = () => {
        // Redirect to the /create route with selected unit as query parameter
        window.location.href = `/create?unit=${selectedUnit}`;
    };

    return (
        <div
            className="hero  z-10 "
            style={{
                position: "relative",
                minHeight: "89vh",
                backgroundImage: "url(/images/bg.jpg)",
            }}
        >
            <div className="hero-content text-center ">
                <div className="card  glassmor">
                    <div className="card-body">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold text-white">
                                Selamat Datang
                            </h1>
                            <p className="py-6 text-white">
                                Website Pengaduan/Pelaporan Layanan UNIT
                                POLITEKNIK NEGERI UJUNG PANDANG
                            </p>

                            {/* You can open the modal using document.getElementById('ID').showModal() method */}
                            <button
                                className="btn bg-cyan-50 glassmor text-black hover:bg-slate-100 hover:outline-none"
                                onClick={() =>
                                    document
                                        .getElementById("my_modal_3")
                                        .showModal()
                                }
                            >
                                Buat Laporan
                            </button>
                           
                           
                            <dialog id="my_modal_3" className="modal">
                                <div className="modal-box bg-white text-black">
                                    <form method="dialog ">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">
                                            ✕
                                        </button>
                                    </form>
                                    <h3 className="font-bold text-lg mb-5">
                                        Melapor ke Unit Mana?
                                    </h3>

                                    <Dropdown
                                        label="Tendik/Mahasiswa"
                                        options={[
                                            "TIK",
                                            "TP3A",
                                            "KABAUK",
                                        ]}
                                        name="tendik_mhs"
                                        onChange={handleUnitChange}
                                    />
                                    
                                    <button
                                        className="btn bg-white glassmor text-black hover:bg-slate-100"
                                        onClick={handleCreateReport}
                                    >
                                        Buat Laporan
                                    </button>
                                </div>
                            </dialog>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Wave
                fill="#90e0ef"
                paused={false}
                style={{
                    width: "100%",
                    height: "39rem", // Adjust the height as needed
                }}
                options={{
                    height: 150,
                    amplitude: 300,
                    speed: 0.15,
                    points: 4,
                }}
            /> */}
        </div>
    );
}
