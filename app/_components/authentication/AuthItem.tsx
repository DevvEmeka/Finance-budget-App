"use client";

import { useForm } from "react-hook-form";
import { Input } from "../budgets/BudgtForm";
import Button from "../ui/Button";
import Link from "next/link";
import { useState } from "react";
import {
  signInAction,
  signup,
  updateUser,
  // uploadImage,
} from "@/app/_lib/actions";
import SpinnerMini from "../ui/SpinnerMini";
// import { uploadImage } from "@/app/_lib/upload";
import { uploadImage } from "@/app/_lib/dats-services";

type FormValues = {
  name?: string;
  email: string;
  password: string;
  isDemo?: boolean;
  user_id?: string | undefined;
  avatar?: string;
  // imageUrl?: string;
};

type EditData = {
  name: string;
  email: string;
  avatar: string;
};

type pageName = {
  pageName: "login" | "signup" | "";
  type?: "edit";
  userData?: EditData;
};

function AuthItem({ pageName, type, userData }: pageName) {
  const { register, handleSubmit, formState, setValue } = useForm<FormValues>();
  const { errors } = formState;

  const [loading, setLoading] = useState(false);
  const [failError, setFailError] = useState("");
  async function onSubmit(data: FormValues) {
    const dataAv = {
      name: data.name,
      email: data.email,
      password: data.password,
      isDemo: data.isDemo,
      avatar: "",
    };
    setLoading(true);

    try {
      if (pageName === "signup") {
        await signup(dataAv);
      } else if (pageName === "login") {
        await signInAction(data);
      } else if (type === "edit") {
        const editData = {
          ...userData,
          name: data.name,
          avatar: data.avatar,
        };

        let avatarUrl = userData?.avatar || ""; // Default to existing avatar URL

        // Check if `data.avatar` is a `FileList`
        if (data.avatar && typeof data.avatar !== "string" && data.avatar[0]) {
          avatarUrl = await uploadImage(data.avatar[0]);
        }

        const dataObj = {
          ...editData,
          avatar: avatarUrl,
        };

        // console.log(dataObj.avatar);
        await updateUser(dataObj);
      }
    } catch (error: any) {
      console.error(error?.message);
      setFailError(error?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-6 w-full md:w-[500px] py-8 px-4 md:px-6 bg-white rounded-lg">
      <h1 className="font-semibold text-2xl md:text-[32px]">
        {pageName === "login"
          ? "Login"
          : pageName === "signup"
          ? "Sign Up"
          : "Update your credentials"}
      </h1>
      {pageName === "signup" || type === "edit" ? (
        <Input label="Name">
          <input
            placeholder="Michael king"
            className="h-full w-full outline-none"
            type="text"
            id="maximum"
            {...register("name", {
              required: "Full name is required",
              minLength: {
                value: 5,
                message: "Full name must be at least 5 characters",
              },
              maxLength: {
                value: 60,
                message: "Full name cannot exceed 60 characters",
              },
              pattern: {
                value:
                  /^[A-Za-z]+(?:[' -][A-Za-z]+)* [A-Za-z]+(?:[' -][A-Za-z]+)*$/,
                message: "Please enter a valid full name (e.g., John Doe)",
              },
            })}
            defaultValue={userData?.name}
          />
          {errors?.name?.message ? (
            <span className="text-secondary-red text-sm flex items-center justify-end my-2">
              {errors?.name?.message}
            </span>
          ) : null}
        </Input>
      ) : null}

      {type === "edit" ? null : (
        <Input label="Email">
          <input
            placeholder="michael@mail.com"
            className={`h-full w-full outline-none ${
              type === "edit" ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            defaultValue={userData?.email}
            // disabled={type === "edit"}
          />
          {errors?.email?.message ? (
            <span className="text-secondary-red text-sm flex items-center justify-end my-2">
              {errors?.email?.message}
            </span>
          ) : null}
        </Input>
      )}
      {type === "edit" ? null : (
        <Input label="Create password">
          <input
            className="h-full w-full outline-none"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must include letters, numbers, and special characters",
              },
            })}
          />
          {errors?.password?.message ? (
            <span className="text-secondary-red text-sm flex items-center justify-end my-2">
              {errors?.password?.message}
            </span>
          ) : (
            <p
              className={` text-sm w-full text-center md:text-end justify-end mt-2 text-grey-500 ${
                pageName === "login" ? "hidden" : "flex"
              }`}
            >
              Passwords must be atleast 8 characters
            </p>
          )}
        </Input>
      )}

      {type === "edit" ? (
        <Input label="Avatar">
          <input
            type="file"
            accept="image/*"
            className=" cursor-pointer mt-2"
            // onChange={handleFileUpload}
            id="imageUrl"
            {...register("avatar", {
              required: "Please upload an image file (JPG, PNG)",
            })}
            // defaultValue={userData?.avatar}
          />
        </Input>
      ) : null}

      {pageName === "signup" ? (
        <div className="pt-4 flex items-center gap-2 md:justify-end justify-center text-grey-300">
          <p>Start with demo transaction</p>

          <input
            type="checkbox"
            className="h-4 w-4"
            // checked={isChecked}
            // onChange={handleCheckboxChange}

            {...register("isDemo")}
          />
        </div>
      ) : null}

      {failError && (
        <p className="text-sm text-center text-secondary-red">{failError}</p>
      )}
      <Button
        className="flex justify-center mt-8"
        onClick={handleSubmit(onSubmit)}
      >
        {loading ? (
          <SpinnerMini />
        ) : pageName === "login" ? (
          "Login"
        ) : pageName === "signup" ? (
          "Create Account"
        ) : (
          "Update"
        )}
      </Button>

      {pageName === "" ? null : (
        <span className="flex items-center justify-center w-full text-grey-500 gap-2">
          <p>
            {pageName === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link
            href={pageName === "login" ? "/signup" : "/login"}
            className="font-semibold underline underline-offset-4"
          >
            {pageName === "login" ? "Sign up" : "Login"}
          </Link>
        </span>
      )}
    </form>
  );
}

export default AuthItem;
