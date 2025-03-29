"use client"
import { updateTrasnaction } from '@/actions/admin.action';
import ErrorMessage from '@/components/ui/ErrorMessage';
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton';
import TextAreaField from '@/components/ui/TextAreaField';
import { Transaction } from '@/types/Transaction';
import { useActionState } from 'react';
import {FiDollarSign,FiBook} from "react-icons/fi"; 

type props ={
    transaction:Transaction
}

export default function UpdateTransactionForm({transaction}:props) {
        const [state, action,isPending] = useActionState(updateTrasnaction, null);
    
  return (
    <form action={action}>
        {state?.error&&<ErrorMessage error={state.error}/>}
        <InputField
            type='number'
            required={true}
            name="fee"
            placeholder="Fee"
            icon={FiDollarSign}
            defaultValue={`${transaction.fee}`}
        />
        <div className='my-3'>
            <TextAreaField
            name='note'
            placeholder='Note'
            required={true}
            icon={FiBook}
            defaultValue={transaction.note}
            />
        </div>
        <input type="text" hidden name='transactionId' value={transaction.id} />
        <SubmitButton isPending={isPending}>Save</SubmitButton>
        <div className="mt-6">
            {state?.errors?.map((e:string)=><ErrorMessage error={e} key={e}/>)}
        </div>
    </form>
  )
}
