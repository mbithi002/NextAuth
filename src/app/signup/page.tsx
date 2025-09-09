"use client";
import Link from "next/link";
import React from "react";

export default function SingupPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="">Signup</h1>
      <hr />
      <label htmlFor="username" className="text-start">
        username
      </label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-nne focus:border-gray-600"
        placeholder="username"
      />
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
      <button  onClick={() => onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
        Signup
      </button>
      <Link href={"/login"}>Have an account? Login</Link>
    </div>
  );
}
