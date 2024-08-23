"use client";

import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  let pathName =
    pathname === "/" ? "Overview" : pathname.replace("_", " ").replace("/", "");
  return (
    <h1 className="text-2xl text-grey-900 font-bold capitalize mb-8">
      {pathName}
    </h1>
  );
}

export default Header;
