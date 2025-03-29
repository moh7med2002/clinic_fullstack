import ShadowParent from '@/components/ui/ShadowParent';
import UserCard from '@/components/user-profile/UserCard';
import { whoAmI } from '@/lib/user.lib';


export default async function page() {
    const user = await whoAmI();
    return (
        <ShadowParent classStyle='max-w-3xl mx-auto'>
            <UserCard
                image={user.image} 
                name={user.name}
                email={user.email} 
                department={user.department?.name}
                birthdate={user.birthdate} 
            />
        </ShadowParent>
    )
}
