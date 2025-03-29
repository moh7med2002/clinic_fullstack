"use client"
import { createTransaction } from '@/actions/admin.action';
import ErrorMessage from '@/components/ui/ErrorMessage';
import InputField from '@/components/ui/InputField'
import Select from '@/components/ui/Select';
import SubmitButton from '@/components/ui/SubmitButton';
import TextAreaField from '@/components/ui/TextAreaField';
import { User } from '@/types/User';
import payments from '@/utils/data/payments';
import React, { useActionState } from 'react'
import {FiDollarSign,FiBook,FiUser} from "react-icons/fi"; 

type props ={
    patients:User[]
}

function CreateTransactionForm({patients}:props) {
        const [state, action,isPending] = useActionState(createTransaction, null);
    
  return (
    <form action={action}>
                {state?.error&&<ErrorMessage error={state.error}/>}
                {/** pateintsLists */}
                <div className='mb-3'>
                <InputField
                        type='number'
                        required={true}
                        name="fee"
                        placeholder="Fee"
                        icon={FiDollarSign}
                    />
                </div>
                <div className='mb-3'>
                    <Select
                        name='patientId' 
                        items={patients.map(item => ({ id: item.id, name: item.name })) }
                        icon={FiUser}/>
                </div>
                <div className='mb-3'>
                    <TextAreaField
                        name='note'
                        placeholder='Note'
                        required={true}
                        icon={FiBook}/>
                </div>
                <div className='mb-3'>
                    <Select
                        name='status' 
                        items={payments.map(item => ({ id: item, name: item==="amount_owed"?"amount owed":"amount paid" })) }
                        icon={FiDollarSign}
                    />
                </div>
                <SubmitButton isPending={isPending}>Save</SubmitButton>
                <div className="mt-6">
                    {state?.errors?.map((e:string)=><ErrorMessage error={e} key={e}/>)}
                </div>
            </form>
  )
}

export default CreateTransactionForm