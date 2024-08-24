"use client";

import { usePathname } from "next/navigation";
import Button from "./Button";

function Header() {
  const pathname = usePathname();

  let pathName =
    pathname === "/" ? "Overview" : pathname.replace("_", " ").replace("/", "");
  return (
    <div className="w-full flex justify-between items-center mb-8">
      <h1 className="text-2xl text-grey-900 font-bold capitalize">
        {pathName}
      </h1>
      {pathName === "pots" || pathName === "budgets" ? (
        <Button>+ Add New {pathName.replace("s", "")}</Button>
      ) : null}
    </div>
  );
}

export default Header;
