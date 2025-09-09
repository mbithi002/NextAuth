"use client";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: ""
  });

  const onLogin = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="">Login</h1>
      <hr />
      <label htmlFor="email" className="etxt-start">
        email
      </label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-nne focus:border-gray-600"
        placeholder="email"
      />
      <hr />
      <label htmlFor="password" className="text-start">
        password
      </label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-nne focus:border-gray-600"
        placeholder="password"
      />
      <button  onClick={() => onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
        Login
      </button>
      <Link href={"/signup"}>No account? Signup</Link>
    </div>
  );
}
