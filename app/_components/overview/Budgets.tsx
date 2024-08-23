import { ItemsColor } from "./Pots";

function Budgets() {
  const budgetsItems = [
    {
      name: "Entertainment",
      target: 2000.0,
      total: 50,
      theme: "green",
    },
    {
      name: "Bills",
      target: 750.0,
      total: 750.0,
      theme: "navy",
    },
    {
      name: "Dinning Out",
      target: 150.0,
      total: 75.0,
      theme: "cyan",
    },
    {
      name: "Personal Care",
      target: 1000.0,
      total: 100.0,
      theme: "yellow",
    },
  ];
  return (
    <div className="grid lg:grid-cols-[1.8fr,1fr] gap-4">
      <div className="text-center">
        this field is for data analysis pie chat
      </div>
      <div className=" flex flex-col gap-3 pb-8">
        {budgetsItems.map((budget, i) => (
          <ItemsColor {...budget} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Budgets;
