import AppointmetTable from "@/components/admin/AppointmetTable";
import { getAppointments } from "@/lib/apintment.lib";
export default async function page() {
    const appointments = await getAppointments();
    return (
        <AppointmetTable appointments={appointments}/>
    );
}