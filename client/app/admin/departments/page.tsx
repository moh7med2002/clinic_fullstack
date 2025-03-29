import DepartmentsTable from "@/components/admin/DepartmentsTable";
import { getDepartments } from "@/lib/department.lib";
export default async function page() {
    const departments = await getDepartments();
    return (
        <DepartmentsTable departments={departments}/>
    );
}