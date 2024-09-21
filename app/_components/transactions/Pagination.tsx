"use client";

import { ReactNode, useState } from "react";
import leftArr from "@/public/assets/images/icon-caret-left.svg";
import rightArr from "@/public/assets/images/icon-caret-right.svg";
import Image from "next/image";
// import { trxT } from "./Transaction";

type pagiProp = {
  pages: number[];
  isCurPage: number;
  handleCurPage: (type: string) => void;
  setIsCurPage: (curPaage: number) => void;
  onPageChange: (page: number) => void;
};

function Pagination({
  pages,
  handleCurPage,
  isCurPage,
  setIsCurPage,
  onPageChange,
}: pagiProp) {
  return (
    <div className="flex gap-4 md:grid md:grid-cols-3 items-center mt-8">
      <div>
        {isCurPage === 1 ? null : (
          <PaginationItem onClick={() => handleCurPage("prev")}>
            <span className="h-4 w-4 relative">
              <Image src={leftArr} alt="Direction icon" fill />
            </span>
            <p className="hidden md:flex">Prev</p>
          </PaginationItem>
        )}
      </div>
      <div className="flex gap-4 items-center">
        {pages.map((n, i) => (
          <PaginationItem
            key={i}
            isCurPage={isCurPage === n}
            onClick={() => onPageChange(n)}
          >
            <p>{n}</p>
          </PaginationItem>
        ))}
      </div>

      <div className="md:flex md:justify-end">
        {isCurPage === pages.length ? null : (
          <PaginationItem onClick={() => handleCurPage("next")}>
            <p className="hidden md:flex">Next</p>
            <span className="h-4 w-4 relative">
              <Image src={rightArr} alt="Direction icon" fill />
            </span>
          </PaginationItem>
        )}
      </div>
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
