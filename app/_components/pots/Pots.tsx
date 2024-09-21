import { getTransactions } from "@/app/_lib/actions";
import PotsItem from "./PotsItem";
import Empty from "../ui/Empty";

export type potsProp = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

async function Pots() {
  const { pots } = await getTransactions();

  if (!pots.length)
    return (
      <div className="w-full h-screen">
        <Empty name="Pots" />
      </div>
    );

  return (
    <div className="lg:grid-cols-2 grid gap-4">
      {pots.map((item: potsProp, i: number) => (
        <PotsItem item={item} key={i} />
      ))}
    </div>
  );
}

export default Pots;
