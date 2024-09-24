import { formatCurrency, formatDateTime } from "@/app/_lib/dats-services";
import Image from "next/image";
import defaultImg from "@/public/assets/images/avatars/flavor-fiesta.jpg";

export type transactionsProp = {
  transactions: TrxType[];
};

function Transactions({ transactions }: transactionsProp) {
  return (
    <div>
      {transactions?.slice(0, 5).map((trx) => (
        <TransactionItem key={trx.date} item={trx} />
      ))}
    </div>
  );
}

export type TrxType = {
  avatar: string;
  name: string;
  category?: string;
  date: string;
  amount: number;
  recurring?: boolean;
  status?: string;
};

export type Item = {
  item: TrxType;
};

export function TransactionItem({ item }: Item) {
  return (
    <div className="flex justify-between items-center border-b border-b-beige-100 py-4">
      <div className="flex items-center gap-4 ">
        <span className="relative w-8 h-8 rounded-full">
          <Image
            src={
              item.avatar && item?.avatar?.startsWith(".")
                ? item?.avatar?.replace(".", "")
                : !item.avatar
                ? defaultImg
                : item?.avatar
            }
            alt="User Avatar"
            fill
            className="rounded-full"
          />
        </span>

        <p className="text-grey-900  ">{item?.name}</p>
      </div>
      <div className="flex flex-col gap-3 items-end">
        <p
          className={`font-semibold ${
            item.amount > 0 ? "text-secondary-green" : "text-grey-500"
          }`}
        >
          {item?.amount > 0
            ? `+${formatCurrency(item?.amount)}`
            : formatCurrency(item?.amount)}
        </p>
        <p className="text-grey-500">{formatDateTime(item.date)}</p>
      </div>
    </div>
  );
}

export default Transactions;
