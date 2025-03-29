"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ShadowParent from '../ui/ShadowParent';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
        {
            label: 'New Patients',
            data: [30, 40, 50, 60, 70],
            borderColor: '#F39C12',
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            fill: true,
        },
    ],
};

export default function PatientRegistrationChart() {
    return (
        <ShadowParent>
            <h3 className="font-semibold mb-4">Patient Registration Trend</h3>
            <Line data={data} />
        </ShadowParent>
    );
}