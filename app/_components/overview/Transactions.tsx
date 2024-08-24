import { formatCurrency, formatDateTime } from "@/app/_lib/dats-services";
import Image from "next/image";

export const transactions = [
  {
    avatar: "/assets/images/avatars/emma-richardson.jpg",
    name: "Emma Richardson",
    category: "General",
    date: "2024-08-19T14:23:11Z",
    amount: 75.5,
    recurring: false,
  },
  {
    avatar: "/assets/images/avatars/savory-bites-bistro.jpg",
    name: "Savory Bites Bistro",
    category: "Dining Out",
    date: "2024-08-19T20:23:11Z",
    amount: -55.5,
    recurring: false,
  },
  {
    avatar: "/assets/images/avatars/daniel-carter.jpg",
    name: "Daniel Carter",
    category: "General",
    date: "2024-08-18T09:45:32Z",
    amount: -42.3,
    recurring: false,
  },
  {
    avatar: "/assets/images/avatars/sun-park.jpg",
    name: "Sun Park",
    category: "General",
    date: "2024-08-17T16:12:05Z",
    amount: 120.0,
    recurring: false,
  },
  {
    avatar: "/assets/images/avatars/urban-services-hub.jpg",
    name: "Urban Services Hub",
    category: "General",
    date: "2024-08-17T21:08:09Z",
    amount: -65.0,
    recurring: false,
  },
];
function Transactions() {
  return (
    <div>
      {transactions.map((trx) => (
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
            src={item.avatar}
            alt="User Avatar"
            fill
            className="rounded-full"
          />
        </span>

        <p className="text-grey-900  ">{item.name}</p>
      </div>
      <div className="flex flex-col gap-3 items-end">
        <p
          className={`font-semibold ${
            item.amount > 0 ? "text-secondary-green" : "text-grey-500"
          }`}
        >
          {item.amount > 0
            ? `+${formatCurrency(item.amount)}`
            : formatCurrency(item.amount)}
        </p>
        <p className="text-grey-500">{formatDateTime(item.date)}</p>
      </div>
    </div>
  );
}

export default Transactions;
