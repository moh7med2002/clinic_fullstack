import UpdateDepartmentForm from '@/components/admin/forms/UpdateDepartmentForm';
import { getDepartmentById } from '@/lib/department.lib';

export default async function page({params}:{params:Promise<{id:number}>}) {
    const {id} = await params;
    const department = await getDepartmentById(id);
    return (
        <UpdateDepartmentForm id={id} department={department}/>
    )
}
