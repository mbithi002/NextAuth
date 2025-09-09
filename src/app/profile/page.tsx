"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState(null);
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response.data);
    setData(response.data?._id);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="">Profile</h1>
      <hr />
      <p className="">Profile page</p>
      <hr />
      <h2>
        {data ? <Link href={`/profile/${data}`}>Profile</Link> : "User Profile"}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-red-500 text-center text-ld text-white p-2 my-2 mx-auto rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}
