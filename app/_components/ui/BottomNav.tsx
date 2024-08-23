"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { item, navList } from "./LeftNav";

function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="absolute bottom-0 left-0 right-0 h-20 lg:hidden flex justify-between items-center bg-grey-900 px-4 md:pt-6 pt-4">
      {navList.map((item, index) => (
        <AsideItem key={index} items={item} active={pathname === item.href} />
      ))}
    </nav>
  );
}

function AsideItem({ items, active }: item) {
  return (
    <Link
      href={items.href}
      className={`flex flex-col gap-4  ${
        active
          ? "bg-beige-100 border-b-4 border-b-secondary-green"
          : "bg-transparent"
      }   items-center justify-start rounded-t-xl min-w-[64px]  py-2 px-2`}
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
        } transition-all duration-500 md:flex hidden`}
      >
        {items.name}
      </p>
    </Link>
  );
}

export default BottomNav;
