import { AppointmentStatus } from '@/utils/enums/appointment-status'
import { PaymentStatus } from '@/utils/enums/payment-status'
import { getStatusLabel } from '@/utils/getLablelStatus'


export default function Status({status}:{status:AppointmentStatus|PaymentStatus}) {
    return (
        <div className={`
            ${(status===AppointmentStatus.pending||status===PaymentStatus.AMOUNT_OWED)&&'bg-upcoming'}
            ${status===AppointmentStatus.canceled&&'bg-error'}
            ${(status===AppointmentStatus.completed||status===PaymentStatus.AMOUNT_PAID)&&'bg-success'}
            text-white rounded-full px-3 py-1 w-fit
        `}>
            {getStatusLabel(status)}
        </div>
    )
}
