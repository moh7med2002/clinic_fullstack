import Sidebar from "@/components/layout/Sidebar";
import Wrapper from "@/components/layout/Wrapper";
import { getUserRole } from "@/lib/UserAuth";
import {patientItems,adminMenuItems,doctorItems } from "@/utils/data/menuItems";
import { roles} from "@/utils/enums/roles";

export default async function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
        const role= await getUserRole();
        const validRole = role ?? roles.Admin;
        let sideArray;

        if (validRole === roles.Admin) {
            sideArray = adminMenuItems;
        } else if (validRole === roles.Doctor) {
            sideArray = doctorItems;
        } else {
            sideArray = patientItems;
        }
    
    return (
        <div className="flex items-start">
            <Sidebar menuItems={sideArray} role={validRole} />
            <Wrapper role={validRole}>
                {children}
            </Wrapper>
        </div>
    );
}