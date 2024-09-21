"use client";

import { ReactNode, useEffect, useState } from "react";
import GridItems from "../overview/GridItems";
import carDown from "@/public/assets/images/icon-caret-down.svg";
import Image from "next/image";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import SpinnerMini from "../ui/SpinnerMini";
import { createBudget, getTransactions } from "@/app/_lib/actions";
import { budgetsProps as budp } from "../overview/Budgets";
import { Item, itemsColorType } from "./BudgetsItem";

export { carDown };
export type budgetsProps = {
  type: "new" | "edit";
  message: string;
  edit?: itemsColorType;
};

type FormValues = {
  maximum: number;
};

function BudgtForm({ type, message, edit }: budgetsProps) {
  const { register, handleSubmit, formState, setValue } = useForm<FormValues>();

  const { errors } = formState;

  const initialState = {
    color: "green",
    category: "Entertainment",
  };
  const [colorOpen, setColorOpen] = useState({
    open: false,
    color: { theme: type === "edit" ? edit?.theme : initialState.color },
  });

  const [catOpen, setCatOpen] = useState({
    open: false,
    cat: { category: initialState.category },
  });

  const [existCat, setXistCat] = useState([]);
  // const [budgett, setBudgett] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleOpenColor() {
    setColorOpen((prevState) => ({
      ...prevState,
      open: !prevState.open,
    }));
  }

  async function onSubmit(data: FormValues) {
    const formValue = {
      maximum: +data.maximum,
      theme: colorOpen.color.theme,
      category: catOpen.cat.category,
    };

    setLoading(true);
    try {
      await createBudget(5, formValue);
    } catch (error) {
      console.error("Budget creation failed");
    } finally {
      setLoading(false);
    }
  }

  function handleSetTheme(theme: { theme: string }) {
    setColorOpen((prevState) => ({
      ...prevState,
      open: false,
      color: theme,
    }));
  }

  function handleOpenCat() {
    setCatOpen((prevState) => ({
      ...prevState,
      open: !prevState.open,
    }));
  }

  function handleSetCat(category: { category: string }) {
    setCatOpen((prevState) => ({
      ...prevState,
      open: false,
      cat: category,
    }));
  }

  useEffect(() => {
    async function getTrx() {
      try {
        const { budgets } = await getTransactions();

        const cats = budgets.map((bud: budp) => bud.category);
        setXistCat(cats);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        // throw new Error("Error fetching transactions");
      }
    }

    getTrx();
  }, []);

  return (
    <GridItems className="w-full h-full px-0 ">
      <p className="text-sm text-grey-500  mb-4">
        {type === "new"
          ? "Choose a category to set a spending budget. These categories can help you monitor spending"
          : "As your budgets change, feel free to update your spending limits."}
      </p>

      <div className="w-full flex flex-col gap-6">
        <Input label="Budget Category">
          {catOpen.open && (
            <Categories
              open={catOpen.open}
              setOpen={handleOpenCat}
              handleSetCats={handleSetCat}
              categories={existCat}
              item={edit}
            />
          )}
          <button
            className={`w-full flex justify-between items-center h-full ${
              type === "edit" ? "cursor-not-allowed" : ""
            }`}
            onClick={handleOpenCat}
            disabled={type === "edit"}
          >
            <span className="">
              {type === "edit" ? edit?.category : catOpen.cat.category}
            </span>

            <span className="relative h-4 w-4">
              <Image src={carDown} alt="Arrow img" fill />
            </span>
          </button>
        </Input>

        <Input label="Max Spend">
          <input
            placeholder="$ e.g 2000"
            className="h-full w-full outline-none"
            type="number"
            id="maximum"
            {...register("maximum", {
              required: "Please enter your maximum for this budget",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter a valid number",
              },
              min: { value: 10, message: "Minimum amount is $10" },
            })}
            defaultValue={type === "edit" ? edit?.maximum : ""}
          />
          {errors?.maximum?.message ? (
            <span className="text-secondary-red text-sm flex items-center justify-end my-2">
              {errors?.maximum?.message}
            </span>
          ) : null}
        </Input>

        <Input label="Theme">
          {colorOpen.open && (
            <ColorMenu
              open={colorOpen.open}
              setOpen={handleOpenColor}
              handleSetThemes={handleSetTheme}
              type={type}
            />
          )}
          <button
            className={`w-full flex justify-between items-center  h-full ${
              type === "edit" ? "cursor-not-allowed" : ""
            }`}
            onClick={handleOpenColor}
            disabled={type === "edit"}
          >
            <span className="flex items-center gap-4">
              <div
                className={`h-4 w-4 rounded-full ${
                  colorOpen.color.theme === "green"
                    ? "bg-secondary-green"
                    : colorOpen.color.theme === "yellow"
                    ? "bg-secondary-yellow"
                    : colorOpen.color.theme === "cyan"
                    ? "bg-secondary-cyan"
                    : colorOpen.color.theme === "navy"
                    ? "bg-secondary-navy"
                    : colorOpen.color.theme === "red"
                    ? "bg-secondary-red"
                    : colorOpen.color.theme === "purple"
                    ? "bg-secondary-purple"
                    : colorOpen.color.theme === "lightPurple"
                    ? "bg-secondary-lightPurple"
                    : colorOpen.color.theme === "turquoise"
                    ? "bg-secondary-turquoise"
                    : colorOpen.color.theme === "brown"
                    ? "bg-secondary-brown"
                    : colorOpen.color.theme === "magenta"
                    ? "bg-secondary-magenta"
                    : colorOpen.color.theme === "blue"
                    ? "bg-secondary-blue"
                    : colorOpen.color.theme === "navyGrey"
                    ? "bg-secondary-navyGrey"
                    : colorOpen.color.theme === "amyGreen"
                    ? "bg-secondary-amyGreen"
                    : colorOpen.color.theme === "gold"
                    ? "bg-secondary-gold"
                    : colorOpen.color.theme === "orange"
                    ? "bg-secondary-orange"
                    : ""
                }`}
              ></div>
              <p className="capitalize">
                {type === "edit" ? edit?.theme : colorOpen.color.theme}
              </p>
            </span>

            <span className="relative h-4 w-4">
              <Image src={carDown} alt="Arrow img" fill />
            </span>
          </button>
        </Input>

        <Button
          className="flex items-center justify-center"
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? (
            <SpinnerMini />
          ) : type === "new" ? (
            "Add Budget"
          ) : (
            "Edit Budget"
          )}
        </Button>
      </div>
    </GridItems>
  );
}

type InputProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function Input({ label, children, className }: InputProps) {
  return (
    <div className={`${className} relative`}>
      <label htmlFor={label} className="text-sm font-bold text-grey-500 mb-2">
        {label}
      </label>

      <div className="w-full h-12 rounded-md border border-grey-500 px-3 items-center">
        {children}
      </div>
    </div>
  );
}

type menuProp = {
  open: boolean;
  setOpen: () => void;
  handleSetThemes?: (theme: { theme: string }) => void;
  handleSetCats?: (category: { category: string }) => void;
  type?: "edit" | "new";
  categories?: string[];
  item?: itemsColorType;
};
export function ColorMenu({
  open,
  setOpen,
  handleSetThemes,
  type,
  item,
}: menuProp) {
  const colorPallete = [
    { theme: "green" },
    { theme: "yellow" },
    { theme: "cyan" },
    { theme: "navy" },
    { theme: "red" },
    { theme: "purple" },
    { theme: "lightPurple" },
    { theme: "turquoise" },
    { theme: "brown" },
    { theme: "magenta" },
    { theme: "navyGrey" },
    { theme: "amyGreen" },
    { theme: "gold" },
    { theme: "orange" },
  ];

  function handleTheme(theme: { theme: string }) {
    handleSetThemes?.(theme);
  }

  return (
    <GridItems className="max-w-[500px] p-6 w-[280px] md:w-[460px] z-50 absolute top-20 -left-4 max-h-[280px] overflow-y-auto shadow-2xl shadow-slate-900">
      {colorPallete.map((color, i) => (
        <button
          className="w-full py-4 border-b border-b-beige-100 "
          key={i}
          onClick={() => handleTheme(color)}
        >
          <span className="flex items-center gap-4">
            <div
              className={`h-4 w-4 rounded-full ${
                color.theme === "green"
                  ? "bg-secondary-green"
                  : color.theme === "yellow"
                  ? "bg-secondary-yellow"
                  : color.theme === "cyan"
                  ? "bg-secondary-cyan"
                  : color.theme === "navy"
                  ? "bg-secondary-navy"
                  : color.theme === "red"
                  ? "bg-secondary-red"
                  : color.theme === "purple"
                  ? "bg-secondary-purple"
                  : color.theme === "lightPurple"
                  ? "bg-secondary-lightPurple"
                  : color.theme === "turquoise"
                  ? "bg-secondary-turquoise"
                  : color.theme === "brown"
                  ? "bg-secondary-brown"
                  : color.theme === "magenta"
                  ? "bg-secondary-magenta"
                  : color.theme === "blue"
                  ? "bg-secondary-blue"
                  : color.theme === "navyGrey"
                  ? "bg-secondary-navyGrey"
                  : color.theme === "amyGreen"
                  ? "bg-secondary-amyGreen"
                  : color.theme === "gold"
                  ? "bg-secondary-gold"
                  : color.theme === "orange"
                  ? "bg-secondary-orange"
                  : ""
              }`}
            ></div>
            <p className="text-grey-500 capitalize">{color.theme}</p>
          </span>
        </button>
      ))}
    </GridItems>
  );
}

function Categories({ open, setOpen, handleSetCats, categories }: menuProp) {
  const categorie = [
    { category: "Entertainment" },
    { category: "Bills" },
    { category: "Groceries" },
    { category: "Dining Out" },
    { category: "Transportation" },
    { category: "Personal Care" },
    { category: "Education" },
    { category: "Lifestyle" },
    { category: "Shopping" },
    { category: "General" },
  ];

  function handleTheme(category: { category: string }) {
    handleSetCats?.(category);
  }

  return (
    <GridItems className="max-w-[500px] p-6 w-[280px] md:w-[460px] z-50 absolute top-20 -left-4 max-h-[280px] overflow-y-auto shadow-2xl shadow-slate-900">
      {categorie.map((color, i) => (
        <button
          className={`w-full py-4 border-b border-b-beige-100 text-start flex justify-between items-center ${
            categories?.includes(color.category)
              ? "cursor-not-allowed text-grey-500 text-italic"
              : "cursor-pointer"
          }`}
          key={i}
          onClick={() => handleTheme(color)}
          disabled={categories?.includes(color.category)}
        >
          <span>{color.category}</span>

          {categories?.includes(color.category) && (
            <p className="text-grey-500 text-sm">Already used</p>
          )}
        </button>
      ))}
    </GridItems>
  );
}

export default BudgtForm;
