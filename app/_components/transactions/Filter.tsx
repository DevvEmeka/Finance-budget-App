import Image from "next/image";
import searchIcon from "@/public/assets/images/icon-search.svg";
import carretDown from "@/public/assets/images/icon-caret-down.svg";
import sortIcon from "@/public/assets/images/icon-sort-mobile.svg";
import filterIcon from "@/public/assets/images/icon-filter-mobile.svg";
import React from "react";

function Filter() {
  return (
    <div className="grid grid-cols-[1fr,60px,60px] md:grid-cols-[1fr,1fr,1fr] lg:grid-cols-[.8fr,200px,260px,0.8fr] xl:grid-cols-[1fr,220px,260px,0.8fr] gap-2 gap-y-10 md:px-4 mb-8">
      <SearchBar />
      <div className="hidden lg:flex"></div>
      <Sort />
      <FilterCat />
    </div>
  );
}

function FilterCat() {
  return (
    <div className="flex items-center justify-center  gap-2 ">
      <p className="text-grey-500 md:flex hidden">Categoryy</p>
      <button className=" grid grid-cols-[1fr,28px] justify-between items-center gap-2 md:px-4 md:py-3 rounded-md md:border md:border-grey-500 w-[50%]">
        <p className="hidden md:flex">All </p>

        <span className="md:hidden flex relative h-6 w-6">
          <Image src={filterIcon} alt="Search icon" fill />
        </span>

        <span className="md:flex hidden relative h-4 w-4">
          <Image src={carretDown} alt="Search icon" fill />
        </span>
      </button>
    </div>
  );
}

export function Sort() {
  return (
    <div className="items-center justify-center flex gap-1 ">
      <p className="text-grey-500 whitespace-nowrap hidden md:flex">Sort by</p>
      <button className=" md:grid grid-cols-[1fr,28px] justify-between items-center gap-2 md:px-4 md:py-3 rounded-md md:border md:border-grey-500 w-[50%] flex">
        <p className="hidden md:flex">Latest</p>
        <span className="md:hidden flex relative h-10 w-8">
          <Image src={sortIcon} alt="Search icon" fill />
        </span>

        <span className="md:flex hidden relative h-4 w-4">
          <Image src={carretDown} alt="Search icon" fill />
        </span>
      </button>
    </div>
  );
}

export function SearchBar() {
  return (
    <div className="w-full grid grid-cols-[1fr,28px] justify-between items-center gap-2 px-4 py-3 rounded-md border border-grey-500">
      <input type="text" placeholder="Search transaction" className="w-full " />

      <button className="h-4 w-4 relative">
        <Image src={searchIcon} alt="Search icon" fill />
      </button>
    </div>
  );
}

type titleType = {
  children: React.ReactNode;
  className?: string;
};

export function Title({ children, className }: titleType) {
  return (
    <h3 className={`text-grey-500 md:flex hidden font-light ${className} `}>
      {children}
    </h3>
  );
}

export default Filter;
