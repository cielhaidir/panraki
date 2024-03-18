import { Head, Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import Card from "@/Components/Pandraki/Card.jsx";
import { useNavigate } from "react-router-dom";

export default function RiwayatLaporanPage({user}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useNavigate();

    const target = user.username === 'Admin' ? '' : user.username;
  
        axios.post('/api/riwayat-laporan/summaryMonth', { target:target }),

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "/api/riwayat-laporan/getRiwayat", { target:target }
                );
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
        },
        {
            name: "kategori",
            selector: (row) => row.jenis,
            sortable: true,
        },
        {
            name: "asal",
            selector: (row) => row.sub_jenis,
            sortable: true,
        },
        {
            name: "jenis_masalah",
            selector: (row) => row.jenis_masalah,
            sortable: true,
        },
        {
            name: "urgensi_masalah",
            selector: (row) => row.urgensi_masalah,
            sortable: true,
        },
        {
            name: "target_pengaduan",
            selector: (row) => row.target,
            filter: true,
            filterValue: (row) => row.target,
            sortable: true,
        },
        {
            name: "status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Waktu",
            selector: (row) => format(new Date(row.created_at), "dd-MM-yyyy HH:mm"),
            sortable: true,
        },
    ];


    const handleRowClick = (row) => {

        history(`/riwayat-laporan/detail-laporan/${row.id}`);
        // window.location.href = `/detail_laporan/${row.id}`;
    };


    
    return (
        <>
            <div className="container mx-auto">
                <DataTable
                    title="Riwayat Laporan"
                    columns={columns}
                    data={data}
                    pagination
                    progressPending={loading}
                    progressComponent={<h2>Loading...</h2>}
                    selectableRows
                    pointerOnHover
                    onRowClicked={handleRowClick}
                />
            </div>
        </>
    );
}
