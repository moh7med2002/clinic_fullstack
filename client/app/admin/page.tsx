import DailyAppointments from "@/components/admin/DailyAppointments";
import LastTransactions from "@/components/admin/LastTransactions";
import PatientRegistrationChart from "@/components/admin/PatientRegistrationChart";
import QuickActions from "@/components/ui/QuickActions";
import RevenueAppointmentsChart from "@/components/admin/RevenueAppointmentsChart()";
import Statistics from "@/components/admin/Statistics";
import { getDailyAppointments } from "@/lib/apintment.lib";
import { getLatestTransactions } from "@/lib/transaction.lib";
import { getAppointmentsandRevenue, getStatistics } from "@/lib/statistics.lib";

export default async function page() {
    const [appointments,transactions,revenueAppintments,statistics] = await Promise.all([
        getDailyAppointments(),
        getLatestTransactions(),
        getAppointmentsandRevenue(),
        getStatistics()
    ]);
    return (
        <div>
            <Statistics statistics={statistics}/>
            <QuickActions/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
                <DailyAppointments appointments={appointments}/>
                <LastTransactions transactions={transactions}/>
            </div>
            <div className="my-8">
                <RevenueAppointmentsChart monthlyStatisicts={revenueAppintments}/>
                {/* <PatientRegistrationChart/> */}
            </div>
        </div>
    );
}