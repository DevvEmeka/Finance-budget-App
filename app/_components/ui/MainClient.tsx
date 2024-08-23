"use client";

import { ReactNode, useState } from "react";
import LeftNav from "./LeftNav";
import Header from "./Header";
import BottomNav from "./BottomNav";

type mainProps = {
  children: ReactNode;
};

function MainClient({ children }: mainProps) {
  const [menuSow, setMenuShow] = useState(true);

  function handleMenuShow() {
    setMenuShow((shm) => !shm);
  }
  return (
    <main className={`w-full h-full min-h-screen relative`}>
      <LeftNav menuSow={menuSow} handleMenuShow={handleMenuShow} />
      <BottomNav />
      <div
        className={`${
          menuSow ? "lg:pl-[316px]" : "lg:pl-[104px]"
        } py-8 lg:pr-4 px-4 sm:px-8`}
      >
        <Header />
        {children}
      </div>
    </main>
  );
}

export default MainClient;
