'use client';
import Header from "@/components/table/Header";
import Pagination from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import TableData from "@/components/table/TableData";
import InputField from "@/components/ui/InputField";
import PrimaryLink from "@/components/ui/PrimaryLink";
import ShadowParent from "@/components/ui/ShadowParent";
import usePagination from "@/hooks/UsePagination";
import { User } from "@/types/User";
import { roles } from "@/utils/enums/roles";
import Image from "next/image";
import { MdSearch } from "react-icons/md";
import ShowAction from "../ui/ShowAction";

type props = {
    role:roles.Doctor | roles.Pateint,
    data:User[]
}

export default function UserTable({role,data}:props) {
    const { currentPage, setCurrentPage, totalPages, paginatedData } = usePagination<User>(data, 3);
    const isDoctor = role===roles.Doctor
    const headerRows = ['ID','Name','Email','Image',"show",isDoctor&&"department"].filter(Boolean) as string[];
    return (
        <div>
            <div className="headerParent">
                <PrimaryLink href={`/admin/create-user`}>
                    Create New User
                </PrimaryLink>
                <InputField icon={MdSearch} name="search" type="text" placeholder="Search" required={false}/>
            </div>
            <ShadowParent>
                <Table>
                    <Header rows={headerRows}/>
                    <tbody>
                    {paginatedData.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <TableData >{item.id}</TableData>
                            <TableData >{item.name}</TableData>
                            <TableData >{item.email}</TableData>
                            <TableData ><Image width={50} height={50} src={item.image} alt="image"/></TableData>
                            <TableData><ShowAction href={isDoctor?`/admin/doctors/${item.id}`:`/admin/patients/${item.id}`}/></TableData>
                            {
                                isDoctor&&<TableData>{item.department?.name}</TableData>
                            }
                    </tr>
                    ))}
                    </tbody>
                </Table>
            </ShadowParent>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
        </div>
    );
}