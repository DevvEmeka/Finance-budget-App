import BalanceItem from "./_components/overview/BalanceItem";
import Budgets from "./_components/overview/Budgets";
import GridItems, {
  FlexItems,
  HeaderGrid,
  LinkButton,
} from "./_components/overview/GridItems";
import Pots from "./_components/overview/Pots";
import Recurring from "./_components/overview/Recurring";
import Transactions from "./_components/overview/Transactions";
import Button from "./_components/ui/Button";

function page() {
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
          <GridItems>
            <FlexItems>
              <HeaderGrid>Pots</HeaderGrid>
              <LinkButton href="/pots">See Details</LinkButton>
            </FlexItems>

            <Pots />
          </GridItems>

          <GridItems>
            <FlexItems>
              <HeaderGrid>Transactions</HeaderGrid>

              <LinkButton href="/transactions">View All</LinkButton>
            </FlexItems>
            <Transactions />
          </GridItems>
        </div>

        <div className="flex flex-col gap-4">
          <GridItems>
            <FlexItems>
              <HeaderGrid>Budgets</HeaderGrid>
              <LinkButton href="/budgets">See Details</LinkButton>
            </FlexItems>

            <Budgets />
          </GridItems>

          <GridItems>
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

export default page;
