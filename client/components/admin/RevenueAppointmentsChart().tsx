'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ShadowParent from '@/components/ui/ShadowParent';
import { monthlyStatisicts } from '@/lib/statistics.lib';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);




export default function RevenueAppointmentsChart({monthlyStatisicts}:{monthlyStatisicts:monthlyStatisicts[]}) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const appointmentsData = new Array(12).fill(0);
    const revenueData = new Array(12).fill(0);
    monthlyStatisicts.forEach((stat) => {
        appointmentsData[stat.month - 1] = stat.appointmentsCount;
        revenueData[stat.month - 1] = stat.revenue;
    });

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Appointments',
                data: appointmentsData,
                backgroundColor: '#3498DB',
            },
            {
                label: 'Revenue ($)',
                data: revenueData, 
                backgroundColor: '#27AE60',
            },
        ],
    };

    return (
        <ShadowParent>
            <h3 className="font-semibold mb-4">Appointments and Revenue Over Last Year</h3>
            <Bar data={data} />
        </ShadowParent>
    );
}