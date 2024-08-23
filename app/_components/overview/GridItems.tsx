import Link from "next/link";
import { ReactNode } from "react";
import leftArr from "@/public/assets/images/icon-caret-right.svg";
import Image from "next/image";
type gridItems = {
  children: ReactNode;
};

function GridItems({ children }: gridItems) {
  return (
    <div className="bg-secondary-white rounded-lg w-full p-4 ">{children}</div>
  );
}

export function FlexItems({ children }: gridItems) {
  return (
    <div className="flex justify-between items-center gap-4 w-full py-6">
      {children}
    </div>
  );
}

type linkProps = {
  href: string;
  children: ReactNode;
};

export function LinkButton({ href, children }: linkProps) {
  return (
    <Link href={href} className="flex gap-4 items-center text-grey-500">
      <p>{children}</p>
      <div className="relative h-3 w-3">
        <Image src={leftArr} alt="Arrow" fill />
      </div>
    </Link>
  );
}
export function HeaderGrid({ children }: gridItems) {
  return <h3 className="text-xl text-grey-900">{children}</h3>;
}

export default GridItems;
