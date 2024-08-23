import { formatCurrency } from "@/app/_lib/dats-services";
import saved from "@/public/assets/images/icon-pot.svg";

import Image from "next/image";
import Header from "../ui/Header";

function Pots() {
  const potsItems = [
    {
      name: "Savings",
      target: 2000.0,
      total: 159.0,
      theme: "green",
    },
    {
      name: "Concert Ticket",
      target: 150.0,
      total: 110.0,
      theme: "navy",
    },
    {
      name: "Gift",
      target: 150.0,
      total: 110.0,
      theme: "cyan",
    },
    {
      name: "New Laptop",
      target: 1000.0,
      total: 10.0,
      theme: "yellow",
    },
    {
      name: "Holiday",
      target: 1440.0,
      total: 531.0,
      theme: "purple",
    },
  ];

  return (
    <div className="grid md:grid-cols-[1fr,1.2fr] gap-3 ">
      <div className="h-32 w-full flex gap-4 items-center rounded-lg bg-beige-100 px-4">
        <div className="relative h-9 w-7">
          <Image src={saved} alt="Pots" fill />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm text-grey-500">Total Saved</h3>
          <h1 className="text-2xl text-grey-900 font-bold capitalize">
            {formatCurrency(850)}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {potsItems.slice(0, 4).map((pot, i) => (
          <ItemsColor {...pot} key={i} />
        ))}
      </div>
    </div>
  );
}

type itemsColorType = {
  name: string;
  target?: number;
  total?: number;
  theme: string;
};

export function ItemsColor({ name, theme, total }: itemsColorType) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`h-14 w-1 rounded-md ${
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
      <div className="flex flex-col gap-4">
        <p className="text-grey-500 ">{name}</p>
        <h2>{typeof total !== "undefined" && formatCurrency(total)}</h2>
      </div>
    </div>
  );
}

export default Pots;
