'use client'
import { updateAppointment } from '@/actions/admin.action';
import ErrorMessage from '@/components/ui/ErrorMessage';
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton';
import TextAreaField from '@/components/ui/TextAreaField';
import { Appointment } from '@/types/Appointment';
import { useActionState } from 'react';
import { FiBook, FiCalendar} from "react-icons/fi"; 

type props={
    id:number,
    appointment:Appointment
}

export default function UpdateAppointmetForm({id,appointment}:props) {
    const [state, action,isPending] = useActionState(updateAppointment, null);
    
  return (
    <form className="mb-4" action={action}>
        {state?.error&&<ErrorMessage error={state.error}/>}
            <InputField
                type="datetime-local"
                required={false}
                name="date"
                placeholder="Update Date & Time"
                icon={FiCalendar}
                defaultValue={appointment.date}
            />
            <div className='mb-3'>
            <TextAreaField
                name='note'
                placeholder='Note'
                required={false}
                defaultValue={appointment.note}
                icon={FiBook}/>
            </div>
            <input name="appointmentId" value={id} hidden/>
            <SubmitButton isPending={isPending}>Save Date</SubmitButton>
        <div className="mt-6">
            {state?.errors?.map((e:string)=><ErrorMessage error={e} key={e}/>)}
        </div>
    </form>
)
}
