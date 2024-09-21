import Image from "next/image";
import searchIcon from "@/public/assets/images/icon-search.svg";
import carretDown from "@/public/assets/images/icon-caret-down.svg";
import sortIcon from "@/public/assets/images/icon-sort-mobile.svg";
import filterIcon from "@/public/assets/images/icon-filter-mobile.svg";
import React from "react";

type FilterProps = {
  handleCateSort: (type: string) => void;
  sortState: { value: string; isOpen: boolean };
  cateState: { value: string; isOpen: boolean };
  searchQuery: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Filter({
  handleCateSort,
  sortState,
  cateState,
  searchQuery,
  handleSearch,
}: FilterProps) {
  return (
    <div className="grid grid-cols-[1fr,60px,60px] md:grid-cols-[1fr,1fr,1fr] lg:grid-cols-[.8fr,200px,260px,0.8fr] xl:grid-cols-[1fr,220px,260px,0.8fr] gap-2 gap-y-10 md:px-4 mb-8">
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <div className="hidden lg:flex"></div>
      <Sort sortState={sortState} handleCateSort={handleCateSort} />
      <FilterCat cateState={cateState} handleCateSort={handleCateSort} />
    </div>
  );
}

type CateProp = {
  cateState: { value: string; isOpen: boolean };
  handleCateSort: (type: string) => void;
};

function FilterCat({ cateState, handleCateSort }: CateProp) {
  return (
    <div className="flex items-center justify-center  gap-2 ">
      <p className="text-grey-500 md:flex hidden">Categoryy</p>
      <button
        className=" grid grid-cols-[1fr,28px] justify-between items-center gap-2 px-1 py-3 rounded-md md:border md:border-grey-500 w-[50%]"
        onClick={() => handleCateSort("cate")}
      >
        <p className="hidden md:flex"> {cateState.value} </p>

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

type sortProp = {
  sortState: { value: string; isOpen: boolean };
  handleCateSort: (type: string) => void;
};

export function Sort({ sortState, handleCateSort }: sortProp) {
  return (
    <div className="items-center justify-center flex gap-1 ">
      <p className="text-grey-500 whitespace-nowrap hidden md:flex">Sort by</p>
      <button
        className=" md:grid grid-cols-[1fr,28px] justify-between items-center gap-2 px-1 py-3 rounded-md md:border md:border-grey-500 w-[50%] flex"
        onClick={() => handleCateSort("sort")}
      >
        <p className="hidden md:flex">{sortState.value}</p>
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

type SearchProps = {
  searchQuery: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SearchBar({ searchQuery, handleSearch }: SearchProps) {
  return (
    <div className="w-full grid grid-cols-[1fr,28px] justify-between items-center gap-2  rounded-md border border-grey- p-1">
      <input
        type="text"
        placeholder="Search transaction"
        className="w-full px-4 py-3 outline-none"
        value={searchQuery}
        onChange={handleSearch}
      />

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
