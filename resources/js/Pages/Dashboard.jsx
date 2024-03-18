import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HeaderDashboard from "../Components/Pandraki/HeaderDashboard.jsx";

import EditKontak from "@/Components/Pandraki/EditKontak.jsx";
import Drawer from "@/Components/Pandraki/Drawer.jsx";
import Dashboarditem from "./Dashboard/Dashboarditem.jsx";
import RiwayatLaporanPage from "./Dashboard/RiwayatLaporanPage.jsx";
import Settings from "./Dashboard/Settings.jsx";
import EditRiwayat from "./Dashboard/EditRiwayat.jsx";

import 'react-toastify/dist/ReactToastify.css';


export default function Dashboard({ auth }) {
    return (
        <Router>
            <Drawer auth={auth}>
                <HeaderDashboard
                    batas="ps-5  mt-6 mx-5 top-6 mb-2"
                    root="hidden block"
                    user={auth.user}
                >
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-ghost text-xs lg:hidden bg-transparent text-black "
                    >

                        <svg
                            className="swap-off fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512"
                        >
                            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                        </svg>
                    </label>
                </HeaderDashboard>

                {/* Menu Dashboard */}
                <Routes>
                    
                    <Route path="/dashboard" element={<Dashboarditem user={auth.user}/>} />
                    <Route
                        path="/riwayat-laporan"
                        element={<RiwayatLaporanPage user={auth.user}/>}
                    />
                    <Route
                        path="/riwayat-laporan/detail-laporan/:id"
                        element={<EditRiwayat user={auth.user}/>}
                    />
                    <Route path="/settings" element={<Settings user={auth.user} />} />
                    <Route
                        path="/settings/editKontak/:id"
                        element={<EditKontak />}
                    />
                </Routes>


            </Drawer>
        </Router>
    );
}
