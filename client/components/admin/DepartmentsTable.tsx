"use client";
import Table from "@/components/table/Table";
import TableData from "@/components/table/TableData";
import DeleteAction from "@/components/ui/DeleteAction";
import PrimaryLink from "@/components/ui/PrimaryLink";
import ShadowParent from "@/components/ui/ShadowParent";
import UpdateAction from "@/components/ui/UpdateAction";
import Header from '../table/Header';
import { Department } from '@/types/Department';
import { startTransition, useOptimistic } from "react";
import { deleteDepartment } from "@/actions/admin.action";

type props={
    departments:Department[]
}

function DepartmentsTable({departments}:props) {
    const headerRows = ['ID','Name',"Doctors",'Actions']

    const [optimisticDepartments, setOptimisticDepartments] = useOptimistic(
        departments,
        (currentDepartments, id: number) => {
            return currentDepartments.filter(department => department.id !== id);
        }
    );

    const handleDelete = async(id: number) => {
        startTransition(() => {
            setOptimisticDepartments(id);
        });
        await deleteDepartment(id)
    };
  return (
       <div>
                <div className="mb-4">
                    <PrimaryLink href={`/admin/create-department`}>
                        Create New Department
                    </PrimaryLink>
                </div>
                <ShadowParent>
            <Table>
                <Header rows={headerRows} />
                <tbody>
                    {optimisticDepartments.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <TableData>{item.id}</TableData>
                            <TableData>{item.name}</TableData>
                            <TableData classes="flex flex-wrap gap-x-5 gap-y-2">
                                {item.users?.map((doctor, index) => (
                                    <span key={index} className="bg-upcoming px-3 rounded-full text-white">
                                        {doctor.name}
                                    </span>
                                ))}
                            </TableData>
                            <TableData>
                                <div className="flex gap-x-2 items-center">
                                    <UpdateAction href={`/admin/update-department/${item.id}`} />
                                    <DeleteAction handleDelete={() => handleDelete(item.id)} />
                                </div>
                            </TableData>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </ShadowParent>
            </div>
  )
}

export default DepartmentsTable