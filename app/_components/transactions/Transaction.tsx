import GridItems from "../overview/GridItems";
import { TransactionItem, transactions } from "../overview/Transactions";
import Filter, { SearchBar, Title } from "./Filter";
import Pagination from "./Pagination";
import TransactionsItem from "./TransactionsItem";

function Transaction() {
  return (
    <GridItems className="overflow-y-auto mb-[60px]">
      <Filter />
      <div className="grid grid-cols-[1.5fr,1fr] md:grid-cols-[1fr,100px,1fr,1fr] lg:grid-cols-[1fr,200px,260px,0.8fr] xl:grid-cols-[1fr,220px,260px,0.8fr] gap-2 gap-y-10 md:px-4">
        <>
          <Title>Recipent / Sender</Title>
          <Title>Category</Title>
          <Title>Transaction Date</Title>
          <Title className="flex justify-end">Amount</Title>
        </>

        {transactions.map((transaction, i) => (
          <TransactionsItem item={transaction} key={i} />
        ))}
      </div>
      <Pagination />
    </GridItems>
  );
}

export default Transaction;
