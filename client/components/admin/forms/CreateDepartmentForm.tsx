'use client'

import { createDepartment } from '@/actions/admin.action';
import ErrorMessage from '@/components/ui/ErrorMessage';
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton';
import { useActionState } from 'react';
import {FiBriefcase} from "react-icons/fi"; 

export default function CreateDepartmentForm() {
        const [state, action,isPending] = useActionState(createDepartment, null);
    
  return (
    <form action={action}>
        {state?.error&&<ErrorMessage error={state.error}/>}
        <div className='mb-3'>
            <InputField
                type='text'
                required={true}
                name="name"
                placeholder="Name"
                icon={FiBriefcase}
            />
        </div>
        <SubmitButton isPending={isPending}>Save</SubmitButton>
        <div className="mt-6">
            {state?.errors?.map((e:string)=><ErrorMessage error={e} key={e}/>)}
        </div>
    </form>
)
}
