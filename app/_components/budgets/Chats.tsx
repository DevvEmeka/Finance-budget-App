"use client";

import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { BudgetsProp } from "../overview/Budgets";
// import { budgetsProps } from "./BudgtForm";

function Chats({ budgets }: BudgetsProp) {
  return (
    <div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={budgets} dataKey="maximum" nameKey="category"></Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chats;
