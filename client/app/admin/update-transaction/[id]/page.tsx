import UpdateTransactionForm from '@/components/admin/forms/UpdateTransactionForm';
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton';
import TextAreaField from '@/components/ui/TextAreaField';
import { getSingleTransaction } from '@/lib/transaction.lib';
import React from 'react'
import {FiDollarSign,FiBook} from "react-icons/fi"; 

export default async function page({params}:{params:Promise<{id:number}>}) {
    const {id} = await params;
    const transaction = await getSingleTransaction(id);
    return (
        <UpdateTransactionForm transaction={transaction}/>
    )
}
