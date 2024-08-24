import Overview from "./_components/overview/Overview";

function page() {
  const balanceDetails = [
    { balance: 4836, title: "Current Balance" },
    { balance: 3814.25, title: "Income" },
    { balance: 1700.5, title: "Expeses" },
  ];
  return <Overview />;
}

export default page;
