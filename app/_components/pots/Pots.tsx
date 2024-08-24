import PotsItem from "./PotsItem";

const pots = [
  {
    name: "Savings",
    target: 2000.0,
    total: 159.0,
    theme: "green",
  },
  {
    name: "Concert Ticket",
    target: 150.0,
    total: 110.0,
    theme: "navy",
  },
  {
    name: "Gift",
    target: 150.0,
    total: 110.0,
    theme: "cyan",
  },
  {
    name: "New Laptop",
    target: 1000.0,
    total: 10.0,
    theme: "yellow",
  },
  {
    name: "Holiday",
    target: 1440.0,
    total: 531.0,
    theme: "purple",
  },
];

export type potsProp = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

function Pots() {
  return (
    <div className="lg:grid-cols-2 grid gap-4">
      {pots.map((item, i) => (
        <PotsItem item={item} key={i} />
      ))}
    </div>
  );
}

export default Pots;
