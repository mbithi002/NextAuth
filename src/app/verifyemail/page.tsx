"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerfiyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      const response = await axios.post(`/api/users/verifyemail`, {
        token,
      });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) verifyEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Your Email</h1>
      <h2 className="p-2 bg-orange-500 text-black font-semibold text-xl">
        {token ? `Token ${token}` : "No token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href={"/login"}>
            <p className="text-blue-500">Login</p>
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-400 text-white">An error occured</h2>
        </div>
      )}
    </div>
  );
}
