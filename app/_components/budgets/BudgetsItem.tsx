"use client";

import { calculatePercentage, formatCurrency } from "@/app/_lib/dats-services";
// import { budgetsItems, BudgetsProp, budgetsProps } from "../overview/Budgets";
import GridItems, {
  FlexItems,
  HeaderGrid,
  LinkButton,
} from "../overview/GridItems";
import { ItemsColor } from "../overview/Pots";
import Image from "next/image";
import menu from "@/public/assets/images/icon-ellipsis.svg";
import Transactions, { TrxType } from "../overview/Transactions";
import { useState } from "react";
import Modal from "../ui/Modal";
import PotsForm, { FormEdit } from "../pots/PotsForm";
import DeleteModal from "../ui/DeleteModal";
import BudgtForm from "./BudgtForm";

export type itemsColorType = {
  name?: string;
  target?: number;
  total?: number;
  theme: string;
  category?: string;
  transactions?: TrxType[];
  maximum: number;
};

function BudgetsItems({ transactions }: transac) {
  return (
    <>
      {transactions.map((budget, i) => (
        <BudgetsItem key={i} item={budget} />
      ))}
    </>
  );
}

function BudgetsItem({ item }: Item) {
  const { theme, name, maximum, category, transactions } = item;

  const [openMenu, setOpenMen] = useState({
    menu: false,
    modal: { open: false, toOpen: "" },
  });

  function handleOpenMenu() {
    setOpenMen((prevState) => ({
      ...prevState,
      menu: !prevState.menu,
    }));
  }

  function handleOpenModal(type: string) {
    if (type === "edit") {
      setOpenMen((prevState) => ({
        ...prevState,
        modal: { open: true, toOpen: "edit" },
      }));
    } else if (type === "delete")
      setOpenMen((prevState) => ({
        ...prevState,
        modal: { open: true, toOpen: "delete" },
      }));
  }

  function handleCloseModal() {
    setOpenMen((prevState) => ({
      ...prevState,
      modal: { open: false, toOpen: "" },
    }));
  }


  const total = transactions
    ?.map((tr) => tr.amount)
    .reduce((acc, cur) => acc + cur, 0);

  const tottl = typeof total !== "undefined" ? total : 0;

  const rem = +maximum + tottl;

  return (
    <GridItems>
      {openMenu.modal.toOpen == "edit" && (
        <Modal
          isOpen={openMenu.modal.open}
          onClose={handleCloseModal}
          title={`Edit ${item.category} budget`}
        >
          <BudgtForm type="edit" message="" edit={item} />
        </Modal>
      )}

      {openMenu.modal.toOpen == "delete" && (
        <Modal
          isOpen={openMenu.modal.open}
          onClose={handleCloseModal}
          title={`Delete '${item.category} budget' `}
        >
          <DeleteModal item="budget" />
        </Modal>
      )}
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
          <h1 className="text-lg font-semibold">{category}</h1>
        </div>

        <button
          className="w-6 h-2 flex items-center justify-center relative"
          onClick={handleOpenMenu}
        >
          {openMenu.menu ? (
            <FormEdit handleEdit={handleOpenModal} type="budgets" />
          ) : null}
          <span className="w-full h-1 relative">
            <Image src={menu} alt="Menu" fill />
          </span>
        </button>
      </FlexItems>

      <p className="my-6 text-grey-500 font-light">
        Maximum {formatCurrency(maximum)}
      </p>

      <div className="w-full h-6 rounded-lg z-20 bg-beige-100 flex items-center">
        <div
          style={{
            width: `${calculatePercentage(
              tottl < 0 ? tottl * -1 : tottl,
              maximum
            ).toFixed(2)}%`,
          }}
          className={`h-[80%]  rounded-md z-30 ${
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

      <div className=" grid grid-cols-2 gap-2 my-6">
        <div className="flex items-center gap-3">
          <div
            className={`h-12 w-1 rounded-md ${
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

          <div className="flex flex-col gap-3">
            <p className="text-grey-500 text-s font-light">Spent</p>
            <p className="text-sm ">
              {formatCurrency(typeof total !== "undefined" ? total : 0).replace(
                "-",
                ""
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-12 w-1 rounded-md bg-beige-100"></div>
          <div className="flex flex-col gap-3">
            <p className="text-grey-500 text-s font-light">Remaining</p>
            <p className="text-sm ">{formatCurrency(+rem)}</p>
          </div>
        </div>
      </div>

      <div className=" w-full rounded-lg flex flex-col gap-3 bg-beige-100 px-4">
        <FlexItems>
          <HeaderGrid>Latest spending</HeaderGrid>

          <LinkButton href="/transactions">See All</LinkButton>
        </FlexItems>

        {/* change when real data comes */}
        <Transactions transactions={transactions?.slice(0, 3) || []} />
      </div>
    </GridItems>
  );
}

type bugsumprop = {
  category: string;
  transactions: TrxType[];
  theme: string;
  maximum: number;
};

type transac = {
  transactions: bugsumprop[];
};

export function BudgetsSummaryItems({ transactions }: transac) {
  // console.log(bdgets);

  return (
    <GridItems>
      <div className="flex flex-col gap-4">
        <div className="text-center min-h-40">
          this field is for data analysis pie chat
        </div>
        <h1 className="text-grey-900  text-xl ">Spending summary</h1>
        <div className=" flex flex-col gap-3 pb-8">
          {transactions.map((budget, i) => (
            <BudgetsColors item={budget} key={i} />
          ))}
        </div>
      </div>
    </GridItems>
  );
}

export type Item = {
  item: itemsColorType;
  transactions?: itemsColorType[];
};

function BudgetsColors({ item }: Item) {
  const { theme, name, maximum, category, transactions } = item;

  const total = transactions
    ?.map((tr) => tr.amount)
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <div className="grid grid-cols-[20px,1fr] items-center gap-2 w-full">
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
      <div className="flex justify-between items-center gap-4">
        <p className="text-grey-500 ">{category}</p>
        <div className="flex items-center gap-3 ">
          <h2>
            {formatCurrency(typeof total !== "undefined" ? total : 0).replace(
              "-",
              ""
            )}
          </h2>
          <p className="text-grey-500 font-light text-sm">
            of {formatCurrency(maximum)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BudgetsItems;
