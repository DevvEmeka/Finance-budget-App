import { formatCurrency } from "@/app/_lib/dats-services";

function Recurring() {
  const trnx = [
    {
      name: "Paid bills",
      amount: 116.5,
      status: "paid",
    },
    {
      name: "total upcoming",
      amount: 206.5,
      status: "upcoming",
    },
    {
      amount: 116.5,
      status: "pending",
      name: "due soon",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center gap-4 pb-8">
      {trnx.map((payment, index) => (
        <RecurringId key={index} {...payment} />
      ))}
    </div>
  );
}

type Payment = {
  amount: number;
  status: string;
  name: string;
};
export function RecurringId({ amount, status, name }: Payment) {
  // if()
  return (
    <div
      className={`w-full h-14 rounded-lg border-l-4 px-2 flex items-center justify-between ${
        status === "paid"
          ? "border-l-secondary-green"
          : status === "upcoming"
          ? "border-l-secondary-yellow"
          : status === "pending"
          ? "border-l-secondary-cyan  "
          : ""
      } bg-beige-100`}
    >
      <p className="capitalize text-grey-500 ">{name}</p>
      <p className="font-semibold">{formatCurrency(amount)}</p>
    </div>
  );
}

export default Recurring;
