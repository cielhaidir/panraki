import Header from "@/Components/Pandraki/Header";
import Input from "../Components/Form/Input";
import Dropdown from "../Components/Form/Dropdown";
import Textarea from "../Components/Form/Textarea";

import { Head, Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Ticket({ auth }) {
    // TENDIK/MAHASISWA?UNIT
    const [selectedOption, setSelectedOption] = useState("Tendik");

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // MR PROBLEM
    const [selectedProblem, setselectedProblem] = useState(
        "Peralatan Lab & Bengkel"
    );

    const handleProblemChange = (e) => {
        setselectedProblem(e.target.value);
    };

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
        formData.append("jenis", e.target.tendik_mhs.value);
        formData.append("target", target);
        formData.append("no_pelapor", e.target.no_pelapor.value);
        formData.append("pj1", pj1);
        formData.append("pj2", pj2);
        formData.append("bukti", e.target.bukti.files[0]);
        formData.append("lokasi", e.target.lokasi.value);
        formData.append("ruangan", e.target.ruangan.value);
        formData.append("keluhan", e.target.keluhan.value);
        formData.append("urgensi_masalah", e.target.rt_urgent?.value);
        // Umum
        if (selectedOption === "Tendik") {
            formData.append("sub_jenis", e.target.jurusanTendik?.value);
        }
        if (selectedOption === "Mahasiswa") {
            formData.append("sub_jenis", e.target.prodi?.value);
        }
        if (selectedOption === "Unit") {
            formData.append("sub_jenis", e.target.unit?.value);
        }

        // Unit Target
        if (unit === "tik") {
            formData.append("jenis_masalah", e.target.tik_problem?.value);
        }
        if (unit === "rt") {
            formData.append("jenis_masalah", e.target.rt_problem?.value);
        }
        if (unit === "mr") {
            formData.append("jenis_masalah", e.target.mr_problem?.value);

            if (selectedProblem === "Kendaraan Dinas") {
                formData.append(
                    "spesifikasi_kendaraan",
                    e.target.spesifikasi_kendaraan?.value
                );
                formData.append(
                    "nomor_inventaris",
                    e.target.nomor_inventaris?.value
                );
            } else {
                formData.append("alat_bermasalah", e.target.alat?.value);
            }
        }

        try {
            const response = await axios.post("/laporan", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data.message);

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
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size > 5097152) { // 2097152 bytes = 5 MB
        toast.error('Ukuran Foto Maksimal 5mb!');
          event.target.value = ''; // Clear the input field
        }
      };
    return (
        <div className="bg-slate-100">
            <Header user={auth.user} />
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
                <section className="py-10 md:py-16 bg-slate-100">
                    <div className="container text-black">
                        <div className="lg:mx-72">
                            <h2 className="card-title text-3xl items-center sm:text-4xl font-bold ">
                                Buat Laporan
                            </h2>
                            <p className="mb-5">
                                Melaporkan Ke Unit :{" "}
                                <span className="font-bold">{unitName}</span>
                            </p>

                            <Input name="nama" label="Nama Pelapor:" />

                            <Dropdown
                                label="Tendik/Mahasiswa/Unit"
                                options={["Tendik", "Mahasiswa", "Unit"]}
                                name="tendik_mhs"
                                onChange={handleOptionChange}
                            />

                            {selectedOption === "Tendik" && (
                                <Dropdown
                                    label="Jurusan"
                                    options={[
                                        "Sipil",
                                        "Elektro",
                                        "Kimia",
                                        "Mesin",
                                        "Administrasi Niaga",
                                        ,
                                        "Akuntansi",
                                        "Informatika & Komputer",
                                    ]}
                                    name="jurusanTendik"
                                />
                            )}
                            {selectedOption === "Mahasiswa" && (
                                <Input name="prodi" label="Program Studi:" />
                            )}
                            {selectedOption === "Unit" && (
                                <Input name="unit" label="Unit:" />
                            )}

                            <Input
                                name="no_pelapor"
                                label="No Whatsapp:"
                                paragraf="tolong diisi dimulai angka 0 dan tidak ada garis mendatar (-)"
                            />
                            <Dropdown
                                label="Sifat Laporan/Pengaduan"
                                options={["Biasa", "Urgent"]}
                                name="rt_urgent"
                            />
                            {unit === "tik" && (
                                <>
                                    <Dropdown
                                        label="Masalah tentang"
                                        options={["Jaringan", "Aplikasi"]}
                                        name="tik_problem"
                                        onChange=""
                                    />
                                </>
                            )}

                            {unit === "rt" && (
                                <>
                                    <Dropdown
                                        label="Bagian Masalah"
                                        options={[
                                            "Keamanan Kampus",
                                            "Kebersihan dan Pemeliharaan Rumah Tangga ",
                                        ]}
                                        name="rt_problem"
                                    />
                                </>
                            )}

                            {unit === "mr" && (
                                <>
                                    <Dropdown
                                        label="Masalah tentang"
                                        options={[
                                            "Peralatan Lab & Bengkel",
                                            "Instalasi Kelistrikan",
                                            "Kendaraan Dinas",
                                            "Perangkat Komputer/Elektronik",
                                            "AC",
                                        ]}
                                        name="mr_problem"
                                        onChange={handleProblemChange}
                                    />
                                    {selectedProblem === "Kendaraan Dinas" && (
                                        <>
                                            <Input
                                                name="spesifikasi_kendaraan"
                                                label="Spesifikasi Kendaraan"
                                                paragraf="Tolong diisi dengan merk & tipe kendaraan dinas"
                                            />
                                            <Input
                                                name="nomor_inventaris"
                                                label="Nomor Inventaris"
                                                paragraf="Tolong diisi dengan mengisi nomor plat kendaraan dinas"
                                            />
                                        </>
                                    )}
                                    {selectedProblem != "Kendaraan Dinas" && (
                                        <Input
                                            name="alat"
                                            label="Alat/Peralatan:"
                                        />
                                    )}
                                </>
                            )}

                            <Input
                                name="bukti"
                                label="Upload Gambar"
                                type="file"
                                onChange={handleFileChange}
                                required
                            />
                            <Dropdown
                                label="Lokasi"
                                options={["Kampus 1", "Kampus 2"]}
                                name="lokasi"
                            />
                            <Input
                                name="ruangan"
                                label="Lokasi/Ruangan:"
                                required
                            />
                            <Textarea
                                name="keluhan"
                                label="Keluhan/Kerusakan secara detail"
                                required
                            />

                            <button type="submit" className="btn bg-slate-700">
                                Kirim Laporan
                            </button>
                        </div>
                    </div>
                    \
                </section>
            </form>
        </div>
    );
}
