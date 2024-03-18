import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import { Line } from "react-chartjs-2";

const LineChart = ({ data }) => {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: Math.max(...data.datasets[0].data) + 3, // Adjust the maximum value
                ticks: {
                    stepSize: 1,
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Laporan Bulanan",
            },
        },
    };

    return (
        <div className={`card lg:w-full h-full bg-white shadow-md `}>
            <div className="card-body">
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default LineChart;
