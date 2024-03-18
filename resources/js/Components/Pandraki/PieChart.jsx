import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);



import { Pie } from 'react-chartjs-2';

const PieChart = ({dataChart}) => {
 

  return (
    <div className={`card lg:w-full w-80  bg-white shadow-md `}>
    <div className="card-body">
        <Pie data={dataChart} />
    </div>
    </div>
  );
};

export default PieChart;
