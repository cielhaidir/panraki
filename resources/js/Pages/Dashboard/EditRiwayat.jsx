import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { toast, ToastContainer } from "react-toastify";

import Input from "@/Components/Form/Input";
import Dropdown from "@/Components/Form/Dropdown";
import { format } from "date-fns";

export default function EditRiwayat() {
    const { id } = useParams(); // Get the id parameter from the URL
    const [riwayat, setRiwayat] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");
    const history = useNavigate();

    useEffect(() => {
        async function fetchRiwayatById() {
            try {
                const response = await axios.post("/riwayat", { id: id });

                setRiwayat(response.data);
                setSelectedStatus(response.data.status);
            } catch (error) {
                console.error("Error fetching Riwayat data:", error);
            }
        }

        fetchRiwayatById();

        return () => {
            // Cleanup code if needed
        };
    }, [id]); // Execute effect when id changes

    console.log(riwayat);

    if (!riwayat) {
        return <div>Loading...</div>; // Show loading indicator while fetching Kontak data
    }

    const handleChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleSimpan = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `/riwayatId`,
                {
                    status: selectedStatus,
                    id: id,
                },
                {
                    maxRedirects: 0, // Prevent Axios from following redirects
                }
            );

            toast.success("Status berhasil diperbarui!", {
                onClose: () => {
                    history('/riwayat-laporan');
                },
            });
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Terjadi kesalahan saat memperbarui status.");
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
                transition:Bounce
            />

            <div className={`container`}>
                <h1 className={`font-bold text-3xl text-black`}>
                    Detail Laporan {riwayat.id}
                </h1>
                <form onSubmit={handleSimpan}>
                    <Input
                        name="nama"
                        label="Nama Pelapor:"
                        value={riwayat.nama}
                        disabled
                    />
                    <Input
                        name="tendik_mhs"
                        label="Kategori Pelapor:"
                        value={riwayat.jenis}
                        disabled
                    />

                    <Input
                        name="urgensi"
                        label="Urgensi Laporan:"
                        value={
                            riwayat.urgensi_masalah
                                ? riwayat.urgensi_masalah
                                : "tidak ada"
                        }
                        disabled
                    />

                    <Input
                        name="jenis_masalah"
                        label="Jenis Masalah:"
                        value={riwayat.jenis_masalah}
                        disabled
                    />
                    <Input
                        name="tanggal"
                        label="Tanggal Laporan:"
                        value={format(
                            new Date(riwayat.created_at),
                            "dd-MM-yyyy"
                        )}
                        disabled
                    />
                    <Input
                        name="jam"
                        label="Jam Laporan:"
                        value={format(new Date(riwayat.created_at), "HH:mm")}
                        disabled
                    />

                    <Dropdown
                        label="Status Laporan"
                        options={["menunggu", "proses", "selesai", "pending"]}
                        name="status"
                        valueDropdown={selectedStatus}
                        onChange={handleChange}
                    />
                    <div className="card lg:w-96  w-full bg-white mb-5 text-black">
                        <figure>
                            {" "}
                            <img src={`/bukti/${riwayat.bukti}`} alt="" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{riwayat.lokasi}</h2>
                            <p>Ruangan : {riwayat.ruangan}</p>
                            <p>Keluhan : "{riwayat.keluhan}"</p>
                        </div>
                    </div>

                    <button className="btn bg-slate-700 hover:bg-slate-500 mb-5">
                        Simpan
                    </button>
                </form>
            </div>
        </>
    );
}
