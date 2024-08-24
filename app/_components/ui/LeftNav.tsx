"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import navHome from "@/public/assets/images/icon-nav-overview.svg";

import navHomeActive from "@/public/assets/images/icon-nav-overview-active.svg";

import navTransactionActive from "@/public/assets/images/icon-nav-transactions-active.svg";

import navTransaction from "@/public/assets/images/icon-nav-transactions.svg";

import navBudgets from "@/public/assets/images/icon-nav-budgets.svg";

import navBudgetsActive from "@/public/assets/images/icon-nav-budgets-active.svg";

import navPots from "@/public/assets/images/icon-nav-pots.svg";

import navPotsActive from "@/public/assets/images/icon-nav-pots-active.svg";

import recBills from "@/public/assets/images/icon-nav-recurring-bills.svg";

import recBillsActive from "@/public/assets/images/icon-nav-recurring-bills-active.svg";
import logo from "@/public/assets/images/logo-large.svg";
import logosm from "@/public/assets/images/logo-small.svg";

import hideMenuIcon from "@/public/assets/images/icon-minimize-menu.svg";

export type item = {
  items: itemsProp;
  active?: boolean;
  menuShown?: boolean;
};

type itemsProp = {
  name: string;
  icon: string;
  iconActive: string;
  href: string;
};

export const navList = [
  {
    name: "Overview",
    icon: navHome,
    iconActive: navHomeActive,
    href: "/",
  },
  {
    name: "Transactions",
    icon: navTransaction,
    iconActive: navTransactionActive,
    href: "/transactions",
  },
  {
    name: "Budgets",
    icon: navBudgets,
    iconActive: navBudgetsActive,
    href: "/budgets",
  },
  {
    name: "Pots",
    icon: navPots,
    iconActive: navPotsActive,
    href: "/pots",
  },
  {
    name: "Recurring Bills",
    icon: recBills,
    iconActive: recBillsActive,
    href: "/recurring_bills",
  },
];

type navProp = {
  menuSow: boolean;
  handleMenuShow: () => void;
};
function LeftNav({ menuSow, handleMenuShow }: navProp) {
  const pathname = usePathname();
  return (
    <aside
      className={`absolute left-0  top-0 bottom-0 bg-grey-900 rounded-r-xl lg:flex flex-col justify-between py-12 ${
        menuSow ? "xl:w-[300px] lg:w-[240px]" : "lg:w-[88px]"
      } transition-all duration-500 hidden `}
    >
      <div
        className={`flex flex-col gap-20 ${
          menuSow ? "" : "justify-center items-center"
        }`}
      >
        <div
          className={`relative h-[22px] ${
            menuSow ? "ml-6 w-[121px] " : " w-[24px]"
          }`}
        >
          <Image src={menuSow ? logo : logosm} alt="logo image" fill />
        </div>

        <div>
          {navList.map((item, index) => (
            <AsideItem
              key={index}
              items={item}
              active={pathname === item.href}
              menuShown={menuSow}
            />
          ))}
        </div>
      </div>
      <button
        className={`flex ${menuSow ? "ml-6" : "ml-4"} gap-4 items-center`}
        onClick={handleMenuShow}
      >
        <div className="relative w-6 h-6 ">
          <Image src={hideMenuIcon} alt="hide menu icon" fill />
        </div>
        <p
          className={`text-beige-100 transition-all duration-500 ${
            menuSow ? "flex" : "hidden"
          }`}
        >
          Minimize Menu
        </p>
      </button>
    </aside>
  );
}

function AsideItem({ items, active, menuShown }: item) {
  return (
    <Link
      href={items.href}
      className={`flex gap-4  ${
        menuShown && active
          ? "bg-beige-100 border-l-4 border-l-secondary-green"
          : "bg-transparent"
      } w-[90%] h-14 items-center justify-start rounded-r-xl ${
        menuShown ? "px-6 py-4 " : "justify-center items-center"
      } `}
    >
      <div className="relative h-6 w-6">
        <Image
          src={active ? items.iconActive : items.icon}
          alt="Icon image"
          fill
        />
      </div>
      <p
        className={`font-semibold ${
          active ? "text-grey-900" : "text-grey-100"
        } ${menuShown ? "flex" : "hidden"} transition-all duration-500`}
      >
        {items.name}
      </p>
    </Link>
  );
}

export default LeftNav;
