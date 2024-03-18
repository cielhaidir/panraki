import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios

import Card from "@/Components/Pandraki/Card.jsx";

import SummaryTable from "@/Components/Pandraki/SummaryTable.jsx";
import PieChart from "@/Components/Pandraki/PieChart";
import LineChart from "@/Components/Pandraki/LineChart";



export default function Dashboarditem({user}) {
    const [allTicketCount, setAllTicketCount] = useState(0);
    const [successCount, setSuccessCount] = useState(0);
    const [onProgressCount, setOnProgressCount] = useState(0);
    const [waitingCount, setWaitingCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [tableData, settableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState({});
    const [LinechartData, setLineChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {

              
                const target = user.username === 'Admin' ? '' : user.username;
                const [LineChartResponse, pieChartResponse, tableDataResponse, allTicketResponse, successResponse, onProgressResponse, waitingResponse, pendingResponse] = await Promise.all([
                    
                    axios.post('/api/riwayat-laporan/summaryMonth', { target:target }),
                    axios.post('/api/riwayat-laporan/summaryPeople', { target:target }),
                    axios.get('/api/riwayat-laporan/summary'),
                    axios.post('/api/riwayat-laporan/count', { target:target }),
                    axios.post('/api/riwayat-laporan/count?status=selesai', { target:target }),
                    axios.post('/api/riwayat-laporan/count?status=proses', { target:target }),
                    axios.post('/api/riwayat-laporan/count?status=menunggu', { target:target }),
                    axios.post('/api/riwayat-laporan/count?status=pending', { target:target })
                ]);
       
                // console.log(user)
                // Set table data
                settableData(tableDataResponse.data);
        
                // Set counts
                setAllTicketCount(allTicketResponse.data);
                setSuccessCount(successResponse.data);
                setOnProgressCount(onProgressResponse.data);
                setWaitingCount(waitingResponse.data);
                setPendingCount(pendingResponse.data);
        

              
                  
                  const labels = LineChartResponse.data.map(item => item.month);
                  
                  const data = {
                    labels,
                    datasets: [
                      {
                        label: 'Laporan',
                        data: LineChartResponse.data.map(item => item.ticket_count),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      },
                    ],
                  };
                  setLineChartData(data);
                
                const formattedData = {
                    labels: pieChartResponse.data.map(item => item.jenis),
                    datasets: [
                        {
                            label: 'Jumlah Tiket',
                            data: pieChartResponse.data.map(item => item.total),
                            backgroundColor: [
                                'rgb(36,92,126)',
                                'rgb(237,240,244)',
                                'rgb(191,211,213)',
                            ],
                           
                            borderWidth: 0,
                        },
                    ],
                };
                setChartData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                // Set loading state to false regardless of success or failure
                setLoading(false);
            }
        };
        

        fetchData();
    }, []);

    // console.log(user.role)
    return (
        <>
            {/* Count */}
   
            <Card
                title="All Ticket"
                count={allTicketCount}
                color="text-primary"
            />
            <Card title="Success" count={successCount} color="text-success" />
            <Card
                title="On Progress"
                count={onProgressCount}
                color="text-info"
            />
            <Card title="Waiting" count={waitingCount} color="text-warning" />
            <Card title="Pending" count={pendingCount} color="text-error" />


            {/* <SummaryTable data={tableData} /> */}
             {/* {!loading &&  <SummaryTable data={tableData} />} */}
             {user.username === 'Admin' ?  (<SummaryTable data={tableData} />) : ''}
            
            <div>
             {!loading && <PieChart dataChart={chartData} />}

            </div>

            <div className="mb-20">
             {!loading && <LineChart data={LinechartData} />}
            </div>



        </>
    );
}
