import Button from "./Button";
import { createDummyData } from "@/app/_lib/actions";

type HeaderProps = {
  pathName: string;
  openModal: () => void;
};

function Header({ pathName, openModal }: HeaderProps) {
  async function handlePushDummyData() {
    await createDummyData();
  }

  return (
    <div className="w-full flex justify-between items-center mb-8">
      <h1 className="text-2xl text-grey-900 font-bold capitalize">
        {pathName}
      </h1>
      {(pathName === "pots" || pathName === "budgets") && (
        <Button onClick={openModal}>
          + Add New {pathName.replace("s", "")}
        </Button>
      )}
    </div>
  );
}

export default Header;
