'use client'
import InputField from '@/components/ui/InputField'
import Select from '@/components/ui/Select';
import SubmitButton from '@/components/ui/SubmitButton';
import roles from '@/utils/data/roles';
import React, { useActionState } from 'react'
import { FiMail, FiUser, FiLock, FiCalendar, FiBriefcase, FiPhone } from "react-icons/fi"; 
import { FaUsers } from "react-icons/fa"; 
import { Department } from '@/types/Department';
import genders from '@/utils/data/genders';
import { createUser } from '@/actions/admin.action';
import ErrorMessage from '@/components/ui/ErrorMessage';

type Props = {
    departments: Department[]
}

function CreateUserForm({ departments }: Props) {
    const [state, action,isPending] = useActionState(createUser, null);

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const departmentField = document.getElementById("departmentField");
        if (e.target.value === "patient") {
            departmentField?.classList.add("hidden");
        } else {
            departmentField?.classList.remove("hidden");
        }
    };

    return (
        <form action={action}>
            <div className=" text-center mb-3">
            {state?.error&&<ErrorMessage error={state.error}/>}
            </div>
            <div className='mb-3'>
                <InputField type='text' required={true} name="name" placeholder="User Name" icon={FiUser} />
            </div>
            <div className='mb-3'>
                <InputField type='text' required={true} name="email" placeholder="E-mail" icon={FiMail} />
            </div>
            <div className='mb-3'>
                <InputField type='password' required={true} name="password" placeholder="Password" icon={FiLock} />
            </div>
            <div className='mb-3'>
                <InputField type='text' required={true} name="phone" placeholder="Phone" icon={FiPhone} />
            </div>

            {/* Role Select */}
            <div className='mb-3'>
                <Select 
                    name='role' 
                    items={roles.map(item => ({ id: item, name: item }))}
                    icon={FaUsers}
                    onChange={handleRoleChange}
                />
            </div>

            {/* Department Select - Hidden dynamically based on role selection */}
            <div className='mb-3' id="departmentField">
                <Select 
                    name='departmentId' 
                    items={departments.map(item => ({ id: item.id, name: item.name }))}
                    icon={FiBriefcase}
                />
            </div>

            <div className='mb-3'>
                <Select 
                    name='gender' 
                    items={genders.map(item => ({ id: item, name: item }))}
                    icon={FaUsers}
                />
            </div>
            <div className='mb-3'>
                <InputField type='date' required={true} name="birthdate" placeholder="BirthDate" icon={FiCalendar} />
            </div>
            <SubmitButton isPending={isPending}>Save</SubmitButton>
            <div className="mt-6">
                {state?.errors?.map((e:string)=><ErrorMessage error={e} key={e}/>)}
            </div>
        </form>
    )
}

export default CreateUserForm;
