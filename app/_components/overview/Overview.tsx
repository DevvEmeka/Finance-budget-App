import BalanceItem from "./BalanceItem";
import Budgets from "./Budgets";
import GridItems, { FlexItems, HeaderGrid, LinkButton } from "./GridItems";
import Pots from "./Pots";
import Recurring from "./Recurring";
import Transactions from "./Transactions";

function Overview() {
  const balanceDetails = [
    { balance: 4836, title: "Current Balance" },
    { balance: 3814.25, title: "Income" },
    { balance: 1700.5, title: "Expeses" },
  ];
  return (
    <div className="">
      <div className="grid md:grid-cols-3 gap-4">
        {balanceDetails.map((balance, index) => (
          <BalanceItem key={index} {...balance} />
        ))}
      </div>
      <div className="grid lg:grid-cols-[1.5fr,1fr] gap-4 mt-8">
        <div className="flex flex-col gap-4">
          <GridItems className="my-6">
            <FlexItems>
              <HeaderGrid>Pots</HeaderGrid>
              <LinkButton href="/pots">See Details</LinkButton>
            </FlexItems>

            <Pots />
          </GridItems>

          <GridItems className="my-6">
            <FlexItems>
              <HeaderGrid>Transactions</HeaderGrid>

              <LinkButton href="/transactions">View All</LinkButton>
            </FlexItems>
            <Transactions />
          </GridItems>
        </div>

        <div className="flex flex-col gap-4">
          <GridItems className="my-6">
            <FlexItems>
              <HeaderGrid>Budgets</HeaderGrid>
              <LinkButton href="/budgets">See Details</LinkButton>
            </FlexItems>

            <Budgets />
          </GridItems>

          <GridItems className="my-6">
            <FlexItems>
              <HeaderGrid>Recurring Bills</HeaderGrid>

              <LinkButton href="/recurring_bills">See Details</LinkButton>
            </FlexItems>

            <Recurring />
          </GridItems>
        </div>
      </div>
    </div>
  );
}

export default Overview;
