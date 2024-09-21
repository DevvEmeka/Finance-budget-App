"use client";

import Image from "next/image";
import GridItems, { FlexItems } from "../overview/GridItems";
import { potsProp } from "./Pots";

import menu from "@/public/assets/images/icon-ellipsis.svg";
import { calculatePercentage, formatCurrency } from "@/app/_lib/dats-services";
import Button from "../ui/Button";
import { useState } from "react";
import Modal from "../ui/Modal";
import PotsForm, { FormEdit } from "./PotsForm";
import DeleteModal from "../ui/DeleteModal";

type propsPots = {
  item: potsProp;
};

function PotsItem({ item }: propsPots) {
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

  const { theme } = item;
  return (
    <GridItems className="flex flex-col gap-5">
      {openMenu.modal.toOpen == "edit" && (
        <Modal
          isOpen={openMenu.modal.open}
          onClose={handleCloseModal}
          title={`Edit ${item.name} pot`}
        >
          <PotsForm type="edit" message="" />
        </Modal>
      )}

      {openMenu.modal.toOpen == "delete" && (
        <Modal
          isOpen={openMenu.modal.open}
          onClose={handleCloseModal}
          title={`Delete '${item.name} pot' `}
        >
          <DeleteModal item="Pot" />
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
          <h1 className="text-lg font-semibold">{item.name}</h1>
        </div>

        <button
          className="w-6 h-2 flex relative items-center justify-center"
          onClick={handleOpenMenu}
        >
          {openMenu.menu ? (
            <FormEdit handleEdit={handleOpenModal} type="pots" />
          ) : null}
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
