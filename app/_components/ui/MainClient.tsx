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

type mainProps = {
  children: ReactNode;
};

function MainClient({ children }: mainProps) {
  const [menuSow, setMenuShow] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const pathname = usePathname();
  console.log(pathname);
  let pathName =
    pathname === "/" ? "Overview" : pathname.replace("_", " ").replace("/", "");

  const data = getData();

  function handleMenuShow() {
    setMenuShow((shm) => !shm);
  }

  return (
    <main className={`w-full h-full min-h-screen relative`}>
      <LeftNav menuSow={menuSow} handleMenuShow={handleMenuShow} />
      <BottomNav />
      <div
        className={`${
          menuSow ? "xl:pl-[316px] lg:pl-[256px]" : "lg:pl-[104px]"
        } py-8 lg:pr-4 px-4 sm:px-8 z-30`}
      >
        {pathname === "/budgets" ? (
          <Modal title="Add New Budget" isOpen={showModal} onClose={closeModal}>
            <BudgtForm type="new" message="" />
          </Modal>
        ) : pathname === "/pots" ? (
          <Modal title="Add New Pot" isOpen={showModal} onClose={closeModal}>
            <PotsForm type="new" message="" />
          </Modal>
        ) : null}
        <Header pathName={pathName} openModal={openModal} />
        {children}
      </div>
    </main>
  );
}

export default MainClient;
