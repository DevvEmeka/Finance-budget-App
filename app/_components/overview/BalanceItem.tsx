import { formatCurrency } from "@/app/_lib/dats-services";

type balanceItemType = {
  balance: number;
  title: string;
};

function BalanceItem({ balance, title }: balanceItemType) {
  return (
    <div
      className={`flex flex-col gap-2  w-full p-4 ${
        title === "Current Balance" ? "bg-grey-900" : "bg-secondary-white"
      } rounded-lg`}
    >
      <p
        className={`${
          title === "Current Balance" ? "text-beige-100" : "text-grey-500"
        } text-sm`}
      >
        {title}
      </p>

      <h2
        className={`${
          title === "Current Balance" ? "text-beige-100" : "text-grey-900"
        } text-2xl font-semibold`}
      >
        {formatCurrency(balance)}
      </h2>
    </div>
  );
}

export default BalanceItem;
