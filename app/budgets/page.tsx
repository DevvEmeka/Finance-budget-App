// import { cookies } from "next/headers";
import Budget from "../_components/budgets/Budget";

function page() {
  // const id = cookies().get("user")?.value.trim();

  return <Budget />;
}

export default page;
