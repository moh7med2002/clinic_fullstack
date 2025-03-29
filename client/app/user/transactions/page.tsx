import TransactionsList from '@/components/user-profile/TransactionsList'
import { getUserTransactions } from '@/lib/transaction.lib'
import { transactions } from '@/utils/data/fakeData'
import { PaymentStatus } from '@/utils/enums/payment-status'
import React from 'react'

export default async function page() {
    const transactions = await getUserTransactions();
    return (
        <>
            <TransactionsList transactions={transactions}/>
        </>
    )
}
