import Header from "@/components/table/Header";
import Table from "@/components/table/Table";
import TableData from "@/components/table/TableData";
import PrimaryLink from "@/components/ui/PrimaryLink";
import ShadowParent from "@/components/ui/ShadowParent";
import Status from "@/components/ui/Status";
import UpdateAction from "@/components/ui/UpdateAction";
import { Appointment } from "@/types/Appointment";
import { AppointmentStatus } from "@/utils/enums/appointment-status";

type props ={
    appointments:Appointment[]
}

function AppointmetTable({appointments}:props) {
    const headerRows = ['ID','Patient',"Doctor",'Date',"Status","Update","Note"]

  return (
    <div>
        <div className="mb-4">
            <PrimaryLink href={`/admin/create-appointment`}>
                Create New Appointment
            </PrimaryLink>
        </div>
        <ShadowParent>
            <Table>
                <Header rows={headerRows}/>
                <tbody>
                {appointments.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <TableData >{item.id}</TableData>
                        <TableData >{item.doctor.name}</TableData>
                        <TableData >{item.patient.name}</TableData>
                        <TableData >{item.date}</TableData>
                        <TableData ><Status status={item.status as AppointmentStatus}/></TableData>
                        <TableData><UpdateAction href={`/admin/update-appointment/${item.id}`}/></TableData>
                        <TableData >{item.note}</TableData>
                </tr>
                ))}
                </tbody>
            </Table>
        </ShadowParent>
    </div>
  )
}

export default AppointmetTable