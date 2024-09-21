import Transaction from "../_components/transactions/Transaction";
import Empty from "../_components/ui/Empty";
import { getTransactions } from "../_lib/actions";

async function page() {
  const { transactions } = await getTransactions();

  if (!transactions.length)
    return (
      <div className="w-full h-screen">
        <Empty name="Transactions" />
      </div>
    );

  return <Transaction transactions={transactions} />;
}

export default page;
