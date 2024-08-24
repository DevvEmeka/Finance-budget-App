import Image from "next/image";
import GridItems, { FlexItems } from "../overview/GridItems";
import { potsProp } from "./Pots";

import menu from "@/public/assets/images/icon-ellipsis.svg";
import { formatCurrency } from "@/app/_lib/dats-services";
import Button from "../ui/Button";

type propsPots = {
  item: potsProp;
};

export function calculatePercentage(part: number, total: number) {
  if (total === 0) {
    return 0; // Avoid division by zero
  }
  return (part / total) * 100;
}
function PotsItem({ item }: propsPots) {
  const { theme } = item;
  return (
    <GridItems className="flex flex-col gap-5">
      <FlexItems>
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              theme === "green"
                ? "bg-secondary-green"
                : theme === "yellow"
                ? "bg-secondary-yellow"
                : theme === "cyan"
                ? "bg-secondary-cyan"
                : theme === "navy"
                ? "bg-secondary-navy"
                : theme === "red"
                ? "bg-secondary-red"
                : theme === "purple"
                ? "bg-secondary-purple"
                : theme === "lightPurple"
                ? "bg-secondary-lightPurple"
                : theme === "turquoise"
                ? "bg-secondary-turquoise"
                : theme === "brown"
                ? "bg-secondary-brown"
                : theme === "magenta"
                ? "bg-secondary-magenta"
                : theme === "blue"
                ? "bg-secondary-blue"
                : theme === "navyGrey"
                ? "bg-secondary-navyGrey"
                : theme === "amyGreen"
                ? "bg-secondary-amyGreen"
                : theme === "gold"
                ? "bg-secondary-gold"
                : theme === "orange"
                ? "bg-secondary-orange"
                : ""
            }`}
          ></span>
          <h1 className="text-lg font-semibold">{item.name}</h1>
        </div>

        <button className="w-6 h-2 flex items-center justify-center">
          <span className="w-full h-1 relative">
            <Image src={menu} alt="Menu" fill />
          </span>
        </button>
      </FlexItems>

      <FlexItems>
        <p className="text-grey-500 text-sm">Total Saved</p>
        <h1 className="text-xl font-bold">{formatCurrency(item.total)}</h1>
      </FlexItems>

      <div className="w-full h-2 rounded-full z-20 bg-beige-100">
        <div
          style={{
            width: `${calculatePercentage(item.total, item.target).toFixed(
              2
            )}%`,
          }}
          className={`h-full  rounded-full z-30 ${
            theme === "green"
              ? "bg-secondary-green"
              : theme === "yellow"
              ? "bg-secondary-yellow"
              : theme === "cyan"
              ? "bg-secondary-cyan"
              : theme === "navy"
              ? "bg-secondary-navy"
              : theme === "red"
              ? "bg-secondary-red"
              : theme === "purple"
              ? "bg-secondary-purple"
              : theme === "lightPurple"
              ? "bg-secondary-lightPurple"
              : theme === "turquoise"
              ? "bg-secondary-turquoise"
              : theme === "brown"
              ? "bg-secondary-brown"
              : theme === "magenta"
              ? "bg-secondary-magenta"
              : theme === "blue"
              ? "bg-secondary-blue"
              : theme === "navyGrey"
              ? "bg-secondary-navyGrey"
              : theme === "amyGreen"
              ? "bg-secondary-amyGreen"
              : theme === "gold"
              ? "bg-secondary-gold"
              : theme === "orange"
              ? "bg-secondary-orange"
              : ""
          }`}
        ></div>
      </div>
      <FlexItems>
        <p className="text-grey-500 text-sm">
          {`${calculatePercentage(item.total, item.target).toFixed(2)}%`}
        </p>
        <p className="text-grey-500 text-sm">
          Target of {formatCurrency(item.target)}
        </p>
      </FlexItems>
      <div className="flex gap-3 w-full">
        <Button
          className="w-full flex justify-center items-center"
          type="secondary"
        >
          + Add Money
        </Button>
        <Button
          type="secondary"
          className="w-full flex justify-center items-center"
        >
          withdraw
        </Button>
      </div>
    </GridItems>
  );
}

export default PotsItem;
