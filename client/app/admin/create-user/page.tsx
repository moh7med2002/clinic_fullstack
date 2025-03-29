import { getDepartments } from '@/lib/department.lib';
import CreateUserForm from '@/components/admin/forms/CreateUserForm';

export default async function page() {
    const departments = await getDepartments();
    return (
        <CreateUserForm departments={departments}/>
    )
}
