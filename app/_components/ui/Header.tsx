import User from "../overview/User";
import Button from "./Button";
import { createDummyData, signOutAction } from "@/app/_lib/actions";
import { MdLogout } from "react-icons/md";

type HeaderProps = {
  pathName: string;
  openModal: () => void;
};

function Header({ pathName, openModal }: HeaderProps) {
  async function handleLogout() {
    await signOutAction();
  }
  return (
    <div className="w-full flex justify-between items-center mb-8">
      <h1 className="text-2xl text-grey-900 font-bold capitalize">
        {pathName === "overview" ? <User /> : pathName}
      </h1>
      {(pathName === "pots" || pathName === "budgets") && (
        <Button onClick={openModal}>
          + Add New {pathName.replace("s", "")}
        </Button>
      )}

      {pathName === "overview" ? (
        <Button onClick={openModal}>transfer</Button>
      ) : pathName === "settings" ? (
        <Button className="flex items-center gap-2" onClick={handleLogout}>
          <MdLogout color="#fff" />
          <p>logout</p>
        </Button>
      ) : null}
    </div>
  );
}

export default Header;
