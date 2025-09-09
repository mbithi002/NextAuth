"use client";

import React from "react";

export default function UserProfile({ params }: any) {
  const { id } = React.use(params);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="">Profile</h1>
      <hr />
      <p className="text-4xl">Profile page {id}</p>
    </div>
  );
}
