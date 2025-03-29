import React from 'react'
import StatisticsBox from '../ui/StatisticsBox'
import {FiUsers, FiCalendar, FiDollarSign} from "react-icons/fi"; 
import { Statisicts } from '@/lib/statistics.lib';

export default function Statistics({statistics}:{statistics:Statisicts}) {
    return (
        <div className="statisticsGrid">
            <StatisticsBox color="#E74C3C" icon={FiUsers} text="Total Doctors" number={statistics.doctors}/>
            <StatisticsBox color="#3498DB" icon={FiUsers} text="Total Patients" number={statistics.patients}/>
            <StatisticsBox color="#F39C12" icon={FiCalendar} text="Total Appointments" number={statistics.appointments}/>
            <StatisticsBox color="#27AE60" icon={FiDollarSign} text="Total Revenue" number={statistics.payments}/>
        </div>
    )
}