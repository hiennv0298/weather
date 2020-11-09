import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'


const Chart: React.FC<{}> = ({ }) => {

    const data = {
        labels: ['January', 'Feb2222ruary', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'June', 'July'],
        datasets: [
            {
                label: '',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'white',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'black',
                data: [65, 59, 80, 81, 56, 55, 40, 33, 33, 33, 33, 33, 33, 44, 22, 55, 99, 99]
            }, {
                label: '',
                backgroundColor: 'rgba(233,44,22,0.2)',
                borderColor: 'yellow',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(233,44,22,0.4)',
                hoverBorderColor: 'orange',
                data: [65, 59, 80, 81, 56, 55, 40, 33, 33, 33, 33, 33, 33, 44, 22, 55, 99, 99]
            }
        ]
    };

    return <>
        <div className="chart">
            <Bar data={data} type={"bar"} width={2000} height={1000} options={{
                maintainAspectRatio: false,
                
            }} />
        </div>
    </>
}

export default Chart;