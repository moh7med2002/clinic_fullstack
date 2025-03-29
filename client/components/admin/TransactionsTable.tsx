"use client";
import { deleteTransaction } from "@/actions/admin.action";
import Header from "@/components/table/Header";
import Table from "@/components/table/Table";
import TableData from "@/components/table/TableData";
import DeleteAction from "@/components/ui/DeleteAction";
import PrimaryLink from "@/components/ui/PrimaryLink";
import ShadowParent from "@/components/ui/ShadowParent";
import Status from "@/components/ui/Status";
import UpdateAction from "@/components/ui/UpdateAction";
import { Transaction } from "@/types/Transaction";
import { PaymentStatus } from "@/utils/enums/payment-status";
import { startTransition, useOptimistic } from "react";

type props ={
    transactions:Transaction[]
}

function TransactionsTable({transactions}:props) {
    const headerRows = ['ID','Patient',"fee",'Date',"Status","Actions","Note"];
    const [optimisticTrasnactions, setOptimisticTrasnactions] = useOptimistic(
        transactions,
            (currentDepartments, id: number) => {
                return currentDepartments.filter(department => department.id !== id);
            }
        );
    
        const handleDelete = async(id: number) => {
            startTransition(() => {
                setOptimisticTrasnactions(id);
            });
            await deleteTransaction(id)
        };

  return (
        <div>
                <div className="mb-4">
                    <PrimaryLink href={`/admin/create-transaction`}>
                        Create New Transaction
                    </PrimaryLink>
                </div>
                <ShadowParent>
                    <Table>
                        <Header rows={headerRows}/>
                        <tbody>
                        {optimisticTrasnactions.map((item) => (
                            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <TableData >{item.id}</TableData>
                                <TableData >{item.patient.name}</TableData>
                                <TableData >{item.fee}</TableData>
                                <TableData >{item.createdAt}</TableData>
                                <TableData ><Status status={item.status as PaymentStatus}/></TableData>
                                <TableData classes="flex gap-x-2 items-center">
                                    <UpdateAction href={`/admin/update-transaction/${item.id}`}/>
                                    <DeleteAction  handleDelete={() => handleDelete(item.id)}/>
                                </TableData>
                                <TableData >{item.note}</TableData>
                        </tr>
                        ))}
                        </tbody>
                    </Table>
                </ShadowParent>
            </div>
  )
}

export default TransactionsTable