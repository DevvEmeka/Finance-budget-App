import { formatCurrency, formatDateTime } from "@/app/_lib/dats-services";
import { Item } from "../overview/Transactions";
import Image from "next/image";
import defaultImg from "@/public/assets/images/avatars/ecofuel-energy.jpg";
function TransactionsItem({ item }: Item) {
  return (
    <>
      <div className="flex items-center gap-4 ">
        <span className="relative w-6 h-6 rounded-full">
          <Image
            src={
              item?.avatar && item?.avatar?.startsWith(".")
                ? item.avatar.replace(".", "")
                : item.avatar
                ? defaultImg
                : item.avatar
            }
            alt="User Avatar"
            fill
            className="rounded-full"
          />
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-grey-900 md:text-[14px] text-sm ">{item.name}</p>
          <p className="text-grey-500 text-sm md:hidden ">{item.category}</p>
        </div>
      </div>

      <p className="text-grey-500 hidden md:flex ">{item.category}</p>

      <p className="text-grey-500 hidden md:flex ">
        {formatDateTime(item.date)}
      </p>

      <div className="flex flex-col gap-3 items-end">
        <p
          className={`font-semibold ${
            item.amount > 0 ? "text-secondary-green" : "text-grey-500 "
          } md:text-[18px] text-sm`}
        >
          {item.amount > 0
            ? `+${formatCurrency(item.amount)}`
            : formatCurrency(item.amount)}
        </p>
        <p className="text-grey-500 md:hidden md:text-[18px] text-[10px]">
          {formatDateTime(item.date)}
        </p>
      </div>
    </>
  );
}

export default TransactionsItem;
