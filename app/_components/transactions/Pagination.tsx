"use client";

import { ReactNode, useState } from "react";
import leftArr from "@/public/assets/images/icon-caret-left.svg";
import rightArr from "@/public/assets/images/icon-caret-right.svg";
import Image from "next/image";

function Pagination() {
  const [isCurPage, setIsCurPage] = useState(1);
  const num = [1, 2, 3, 4];

  function handleNextPrevPage(name: string) {
    if (name === "next" && isCurPage < 4) {
      setIsCurPage(isCurPage + 1);
    }

    if (name === "prev" && isCurPage > 1) {
      setIsCurPage(isCurPage - 1);
    } else return;
  }

  return (
    <div className="flex gap-4 md:justify-between items-center mt-8">
      <PaginationItem onClick={() => handleNextPrevPage("prev")}>
        <span className="h-4 w-4 relative">
          <Image src={leftArr} alt="Direction icon" fill />
        </span>
        <p className="hidden md:flex">Prev</p>
      </PaginationItem>
      <div className="flex gap-4 items-center">
        {num.map((n, i) => (
          <PaginationItem
            key={i}
            isCurPage={isCurPage === n}
            onClick={() => setIsCurPage(n)}
          >
            <p>{n}</p>
          </PaginationItem>
        ))}
      </div>
      <PaginationItem onClick={() => handleNextPrevPage("next")}>
        <p className="hidden md:flex">Next</p>
        <span className="h-4 w-4 relative">
          <Image src={rightArr} alt="Direction icon" fill />
        </span>
      </PaginationItem>
    </div>
  );
}

type PaginationProp = {
  children: ReactNode;
  onClick?: () => void;
  isCurPage?: boolean;
};

function PaginationItem({ children, onClick, isCurPage }: PaginationProp) {
  return (
    <button
      className={`rounded-md flex items-center gap-3 border border-grey-900 h-10 min-w-10  justify-center ${
        isCurPage
          ? "bg-grey-900 text-beige-100"
          : "bg-transparent text-grey-900"
      } px-3 hover:bg-grey-900 hover:text-beige-100 transition-all duration-500`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Pagination;
