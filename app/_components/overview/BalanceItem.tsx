import { formatCurrency } from "@/app/_lib/dats-services";
import Image from "next/image";

type balanceItemType = {
  balance: number;
  title: string;
  image?: string;
};

function BalanceItem({ balance, title, image }: balanceItemType) {
  return (
    <div
      className={`flex flex-col gap-2  w-full p-4 ${
        title === "Current Balance" || title === "Total Bills"
          ? "bg-grey-900"
          : "bg-secondary-white"
      } rounded-lg`}
    >
      {image ? (
        <span className="w-6 relative h-6 mb-8">
          <Image src={image} alt="Recurring" fill />
        </span>
      ) : null}
      <p
        className={`${
          title === "Current Balance" || title === "Total Bills"
            ? "text-beige-100"
            : "text-grey-500"
        } text-sm`}
      >
        {title}
      </p>

      <h2
        className={`${
          title === "Current Balance" || title === "Total Bills"
            ? "text-beige-100"
            : "text-grey-900"
        } text-2xl font-semibold`}
      >
        {formatCurrency(balance).replace("-", "")}
      </h2>
    </div>
  );
}

export default BalanceItem;
