"use client"
import { createAppointment } from '@/actions/admin.action';
import ErrorMessage from '@/components/ui/ErrorMessage';
import InputField from '@/components/ui/InputField';
import Select from '@/components/ui/Select'
import SubmitButton from '@/components/ui/SubmitButton';
import TextAreaField from '@/components/ui/TextAreaField';
import { User } from '@/types/User';
import { useActionState } from 'react';
import {FiUser,FiCalendar,FiBook } from "react-icons/fi";


type props={
    doctors:User[],
    patients:User[]
}

export default function CreateAppointmetForm({doctors,patients}:props) {
            const [state, action,isPending] = useActionState(createAppointment, null);
    
  return (
        <form action={action}>
            <div className='mb-3'>
            {state?.error&&<ErrorMessage error={state.error}/>}
             <label className='text-[14px] mb-2 block font-normal'>Doctor Name</label>
                <Select
                    name='doctorId' 
                    items={doctors.map(item => ({ id: item.id, name: item.name })) }
                    icon={FiUser}/>
            </div>
            <div className='mb-3'>
                <label className='text-[14px] mb-2 block font-normal'>Patient Name</label>
                <Select
                    name='patientId' 
                    items={patients.map(item => ({ id: item.id, name: item.name })) }
                    icon={FiUser}/>
            </div>
            <div className='mb-3'>
                <InputField
                    type='datetime-local'
                    required={true}
                    name="date"
                    placeholder="Time"
                    icon={FiCalendar}
                />
            </div>
            <div className='mb-3'>
                <TextAreaField
                    name='note'
                    placeholder='Note'
                    required={true}
                    icon={FiBook}/>
            </div>
            <SubmitButton isPending={isPending}>Create</SubmitButton>
            <div className="mt-6">
                {state?.errors?.map((e:string)=><ErrorMessage error={e} key={e}/>)}
            </div>
        </form>  )
}
