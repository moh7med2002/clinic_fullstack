import React from 'react'
import Table from '../table/Table'
import Header from '../table/Header'
import TableData from '../table/TableData'
import ShadowParent from '../ui/ShadowParent'
import { Transaction } from '@/types/Transaction'


type props ={
    transactions :Transaction[]
}


export default function LastTransactions({transactions}:props) {
    const headerRows = ["id","Pateint","Fee","Time"]
    return (
        <ShadowParent>
            <h3 className='mb-4 font-semibold text-[18px]'>Last Transactions</h3>
            <Table>
                <Header rows={headerRows}/>
                <tbody className='max-h-[200px] overflow-auto'>
                    {transactions.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <TableData >{item.id}</TableData>
                        <TableData >{item.patient.name}</TableData>
                        <TableData >{item.fee}</TableData>
                        <TableData >{item.createdAt}</TableData>
                    </tr>
                ))}
                </tbody>
            </Table>
        </ShadowParent>
    )
}