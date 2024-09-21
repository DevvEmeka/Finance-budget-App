import { ItemsColor } from "./Pots";
import { TrxType } from "./Transactions";

export type budgetsProps = {
  category: string;
  maximum: number;
  theme: string;
  id: string;
};

export type BudgetsProp = {
  budgets: budgetsProps[];
  transactions?: TrxType[];
};
function Budgets({ budgets }: BudgetsProp) {
  return (
    <div className="grid lg:grid-cols-[1.8fr,1fr] gap-4">
      <div className="text-center">
        this field is for data analysis pie chat
      </div>
      <div className=" flex flex-col gap-3 pb-8">
        {budgets?.map((budget, i) => (
          <ItemsColor {...budget} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Budgets;
