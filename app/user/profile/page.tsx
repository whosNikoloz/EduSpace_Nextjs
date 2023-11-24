"use client";
import React from "react";

import { useEffect, useState } from "react";
import { UserCard } from "@/components/profile/userCard";
import { UserEdit } from "@/components/profile/userEdit";
import { UserProgress } from "@/components/profile/userProgress";
import MainLayout from "@/app/layouts/Mainlayout";
import { useUser } from "@/app/dbcontext/UserdbContext";

export default function ProfilePage() {
  const [selectedOption, setSelectedOption] = useState("Main");
  const { user } = useUser();

  const handleSelectionChange = (option: string) => {
    setSelectedOption(option);
  };
  return (
    <>
      <MainLayout>
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <UserCard
              username={user?.userName || ""}
              firstname={user?.firstName || ""}
              lastname={user?.lastName || ""}
              profilepicture={user?.picture || ""}
              createdate="2023-11-24"
              onSelectionChange={handleSelectionChange}
            />
            {/* Render content based on the selected option */}
            {selectedOption === "Edit" ? (
              <UserEdit username={""} />
            ) : (
              <UserProgress username={""} />
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
}
