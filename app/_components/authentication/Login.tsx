import Image from "next/image";
import illustration from "@/public/assets/images/Sidebar.png";
import AuthItem from "./AuthItem";

function Login() {
  return (
    <div className="flex items-center justify-center  auth xl:grid xl:grid-cols-[600px,1fr]">
      <div className="h-full w-full relative hidden xl:flex">
        <Image src={illustration} alt="" fill />
      </div>
      <div className="flex items-center justify-center">
        <AuthItem pageName="login" />
      </div>
    </div>
  );
}

export default Login;
