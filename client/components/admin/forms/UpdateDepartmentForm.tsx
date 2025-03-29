'use client'

import { createDepartment, updateDepartment } from '@/actions/admin.action';
import ErrorMessage from '@/components/ui/ErrorMessage';
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton';
import { Department } from '@/types/Department';
import { useActionState } from 'react';
import {FiBriefcase} from "react-icons/fi"; 

type props={
    id:number,
    department:Department
}

export default function UpdateDepartmentForm({id,department}:props) {
    const [state, action,isPending] = useActionState(updateDepartment, null);
    
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
                defaultValue={department.name}
            />
        </div>
        <input name="departmentId" value={id} hidden/>
        <SubmitButton isPending={isPending}>Save</SubmitButton>
        <div className="mt-6">
            {state?.errors?.map((e:string)=><ErrorMessage error={e} key={e}/>)}
        </div>
    </form>
)
}
