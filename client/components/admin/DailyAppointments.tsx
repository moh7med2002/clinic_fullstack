import React from 'react'
import Table from '../table/Table'
import Header from '../table/Header'
import TableData from '../table/TableData'
import ShadowParent from '../ui/ShadowParent'
import { Appointment } from '@/types/Appointment'

type props={
    appointments:Appointment[]
}

export default function DailyAppointments({appointments}:props) {
    const headerRows = ["id","Pateint","Doctor","Time"]
    return (
        <ShadowParent>
            <h3 className='mb-4 font-semibold text-[18px]'>Daily Appointments</h3>
            <Table>
                <Header rows={headerRows}/>
                <tbody className='max-h-[200px] overflow-auto'>
                    {appointments.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <TableData >{item.id}</TableData>
                        <TableData >{item.patient.name}</TableData>
                        <TableData >{item.doctor.name}</TableData>
                        <TableData >{item.date}</TableData>
                    </tr>
                ))}
                </tbody>
            </Table>
        </ShadowParent>
    )
}