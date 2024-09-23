"use client";

import { getUser } from "@/app/_lib/actions";
import Image from "next/image";
import { useEffect, useState } from "react";

import defaultPicture from "@/public/assets/images/avatars/emma-richardson.jpg";

type UserType = {
  name: string;
  avatar: string;
};
function User() {
  const [user, setUser] = useState<UserType>({ name: "", avatar: "" });

  useEffect(() => {
    async function fetchUser() {
      const curUser = await getUser();
      setUser(curUser);
    }

    fetchUser();
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-full relative">
        <Image
          src={user?.avatar ? user?.avatar : defaultPicture}
          alt="profile image"
          fill
          className="rounded-full"
        />
      </div>

      <h1 className="text-lg text-grey-900">
        Welcome {user?.name?.split(" ")[1]}!
      </h1>
    </div>
  );
}

export default User;
