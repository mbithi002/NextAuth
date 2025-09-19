"use client";

interface UserProfileProps {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: UserProfileProps) {
  const { id } = params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="">Profile</h1>
      <hr />
      <p className="text-4xl">Profile page {id}</p>
    </div>
  );
}
