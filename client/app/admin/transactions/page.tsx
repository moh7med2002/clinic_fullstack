import TransactionsTable from "@/components/admin/TransactionsTable";
import { getTransactions } from "@/lib/transaction.lib";
export default async function page() {
    const transactions = await getTransactions();
    return (
        <TransactionsTable transactions={transactions}/>
    );
}