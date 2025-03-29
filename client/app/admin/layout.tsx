import Sidebar from "@/components/layout/Sidebar";
import Wrapper from "@/components/layout/Wrapper";
import { adminMenuItems } from "@/utils/data/menuItems";
import { roles } from "@/utils/enums/roles";

export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <div className="flex items-start">
            <Sidebar menuItems={adminMenuItems} role={roles.Admin} />
            <Wrapper role={roles.Admin}>
                {children}
            </Wrapper>
        </div>
    );
}