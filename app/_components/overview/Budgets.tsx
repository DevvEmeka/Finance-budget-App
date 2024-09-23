"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ItemsColor } from "./Pots";
import { TrxType } from "./Transactions";
import { formatCurrency } from "@/app/_lib/dats-services";

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
  // Calculate the total sum of maximum values
  const total = budgets.reduce((sum, budget) => sum + budget.maximum, 0);

  //  const totalSpend = budgets.reduce((sum, budget) => sum + budget.total, 0);

  return (
    <div className="grid lg:grid-cols-[1.8fr,1fr] gap-4">
      <div className="relative text-center">
        {/* Relative to position the inner content */}
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={budgets}
              dataKey="maximum"
              nameKey="category"
              innerRadius={85}
              outerRadius={110}
              paddingAngle={3}
            >
              {budgets.map((entry, index) => (
                <Cell key={index} fill={entry.theme} stroke={entry.theme} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Centered Total */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {total > 0 && (
            <p className="text-xl font-bold">{` ${formatCurrency(total)}`}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 pb-8">
        {budgets?.map((budget, i) => (
          <ItemsColor {...budget} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Budgets;
