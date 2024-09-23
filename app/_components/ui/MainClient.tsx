"use client";

import { ReactNode, useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { getData } from "@/app/_lib/dats-services";
import Modal from "./Modal";
import BudgtForm from "../budgets/BudgtForm";
import { usePathname } from "next/navigation";
import PotsForm from "../pots/PotsForm";
import User from "../overview/User";
import TrxForm from "../overview/TrxForm";

type mainProps = {
  children: ReactNode;
};

function MainClient({ children }: mainProps) {
  const [menuSow, setMenuShow] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const pathname = usePathname();
  let pathName =
    pathname === "/signup" || pathname === "/login"
      ? ""
      : pathname === "/"
      ? "overview"
      : pathname.replace("_", " ").replace("/", "");

  const data = getData();

  function handleMenuShow() {
    setMenuShow((shm) => !shm);
  }

  return (
    <main className={`w-full h-full min-h-screen relative`}>
      {pathname === "/signup" || pathname === "/login" ? null : (
        <>
          <LeftNav menuSow={menuSow} handleMenuShow={handleMenuShow} />
          <BottomNav />
        </>
      )}
      <div
        className={`${
          pathname === "/signup" || pathname === "/login"
            ? ""
            : menuSow
            ? "xl:pl-[316px] lg:pl-[256px]"
            : "lg:pl-[104px]"
        } py-8 lg:pr-4 px-4 sm:px-8 z-30`}
      >
        {pathname === "/budgets" ? (
          <Modal title="Add New Budget" isOpen={showModal} onClose={closeModal}>
            <BudgtForm type="new" message="" />
          </Modal>
        ) : pathname === "/pots" ? (
          <Modal title="Add New Pot" isOpen={showModal} onClose={closeModal}>
            <PotsForm type="new" message="" close={closeModal} />
          </Modal>
        ) : pathname === "/" ? (
          <Modal title="Transfer" isOpen={showModal} onClose={closeModal}>
            <TrxForm />
          </Modal>
        ) : null}
        <Header pathName={pathName} openModal={openModal} />
        {children}
      </div>
    </main>
  );
}

export default MainClient;
