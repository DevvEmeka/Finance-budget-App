import { getTransaction, getTransactions } from "@/app/_lib/actions";
import BalanceItem from "./BalanceItem";
import Budgets from "./Budgets";
import GridItems, { FlexItems, HeaderGrid, LinkButton } from "./GridItems";
import Pots from "./Pots";
import Recurring from "./Recurring";
import Transactions, { TrxType } from "./Transactions";

async function Overview() {
  const data = await getTransaction();

  const { transactions, budgets, pots } = data || [];

  const recuTrans = transactions?.filter(
    (transaction: TrxType) => transaction.recurring === true
  );

  const balanceDetails = [
    { balance: data?.balance?.current, title: "Current Balance" },
    { balance: data?.balance?.income, title: "Income" },
    { balance: data?.balance?.expenses, title: "Expeses" },
  ];

  return (
    <div className="">
      <div className="grid md:grid-cols-3 gap-4">
        {balanceDetails?.map((balance, index) => (
          <BalanceItem key={index} {...balance} />
        ))}
      </div>
      <div className="grid lg:grid-cols-[1.5fr,1fr] gap-4 mt-8">
        {!data ? (
          <p>No transactions on your account yet</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <GridItems className="my-6">
                <FlexItems>
                  <HeaderGrid>Pots</HeaderGrid>
                  <LinkButton href="/pots">See Details</LinkButton>
                </FlexItems>

                <Pots potsItems={pots} />
              </GridItems>

              <GridItems className="my-6">
                <FlexItems>
                  <HeaderGrid>Transactions</HeaderGrid>

                  <LinkButton href="/transactions">View All</LinkButton>
                </FlexItems>
                <Transactions transactions={transactions} />
              </GridItems>
            </div>

            <div className="flex flex-col gap-4">
              <GridItems className="my-6">
                <FlexItems>
                  <HeaderGrid>Budgets</HeaderGrid>
                  <LinkButton href="/budgets">See Details</LinkButton>
                </FlexItems>

                <Budgets budgets={budgets} />
              </GridItems>

              <GridItems className="my-6">
                <FlexItems>
                  <HeaderGrid>Recurring Bills</HeaderGrid>

                  <LinkButton href="/recurring_bills">See Details</LinkButton>
                </FlexItems>

                <Recurring recurringTrans={recuTrans} />
              </GridItems>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Overview;
