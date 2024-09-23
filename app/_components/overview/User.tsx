"use client";

import { getUser } from "@/app/_lib/actions";
import Image from "next/image";
import { useEffect, useState } from "react";

import defaultPicture from "@/public/assets/images/avatars/buzz-marketing-group.jpg";
import { FaCheck, FaRegCopy } from "react-icons/fa";

type UserType = {
  name: string;
  avatar: string;
  user_id: string;
};
function User() {
  const [user, setUser] = useState<UserType>({
    name: "",
    avatar: "",
    user_id: "",
  });

  const [text, setText] = useState({
    text: "copy",
    icon: <FaRegCopy size={16} />,
  });

  async function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(user.user_id);

      // Change button text to "Copied"
      setText({
        text: "copied",
        icon: <FaCheck size={16} />,
      });
      // Reset the button text after 3 seconds
      setTimeout(() => {
        setText({ text: "copy", icon: <FaRegCopy size={16} /> });
      }, 3000); // 3000ms = 3 seconds
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      const curUser = await getUser();
      setUser(curUser);
    }

    fetchUser();
  }, []);

  return (
    <div>
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

      <span className="flex text-grey-500 items-center gap-2 mt-3">
        <p className="text-sm hidden md:flex">Account ID:</p>
        <p className="text-sm">{user?.user_id.slice(0, 11) + "...."}</p>
        <button
          className="flex items-center gap-1 text-sm p-2 border rounded-md"
          onClick={handleCopy}
        >
          <span>{text.text}</span> {text.icon}
        </button>
      </span>
    </div>
  );
}

export default User;
