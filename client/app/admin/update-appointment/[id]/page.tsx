import {  FiCheckCircle, FiXCircle } from "react-icons/fi";
import { getSingleAppointment } from "@/lib/apintment.lib";
import UpdateAppointmetForm from "@/components/admin/forms/UpdateAppointmentForm";
import { AppointmentStatus } from "@/utils/enums/appointment-status";
import { updateAppointmentStatus } from "@/actions/admin.action";
import ClientButton from "@/components/ui/ClientButton";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const appointemt =await  getSingleAppointment(id);
    async function handleClick(status:AppointmentStatus){
        await updateAppointmentStatus(status,id);
    }
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Update Appointment</h2>

            {/* Update Date & Time */}
            <UpdateAppointmetForm appointment={appointemt} id={id}/>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
                {/* Complete Button */}
                <ClientButton 
                id={id}
                status={AppointmentStatus.completed}
                style="flex-1 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2">
                    <FiCheckCircle />
                    Complete
                </ClientButton>

                {/* Cancel Button */}
                <ClientButton 
                id={id}
                status={AppointmentStatus.canceled}
                style="flex-1 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2">
                    <FiXCircle />
                    Cancel
                </ClientButton>
            </div>
        </div>
    );
}
