import Image from "next/image";
import illustration from "@/public/assets/images/illustration-authentication.svg";
import AuthItem from "../_components/authentication/AuthItem";
import Signup from "../_components/authentication/Signup";

function page() {
  return (
    <div>
      <Signup />
    </div>
  );
}

export default page;
