"use client";

import React, { useEffect, useState } from "react";
import { UserCard } from "@/components/profile/userCard";
import { UserEdit } from "@/components/profile/userEdit";
import { UserProgress } from "@/components/profile/userProgress";
import { useUser } from "@/app/dbcontext/UserdbContext";
import Styles from "@/styles/loader.module.css";
import Image from "next/image";
import EduSpace from "@/public/EduSpaceLogo.png";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [selectedOption, setSelectedOption] = useState("Main");
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) {
        router.push("/user/auth");
      }
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, router]);

  const handleSelectionChange = (option: string) => {
    setSelectedOption(option);
  };

  if (isLoading || !user) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-20">
        <div className={Styles.Loader}>
          <Image
            src={EduSpace}
            alt="Description of the image"
            width={100}
            height={100}
          />
        </div>
      </section>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        <UserCard
          username={user.userName}
          firstname={user.firstName}
          lastname={user.lastName}
          profilepicture={user.picture}
          createdate="2023-11-24"
          onSelectionChange={handleSelectionChange}
        />
        {/* Render content based on the selected option */}
        {selectedOption === "Edit" ? (
          <>
            <UserEdit
              username={user.userName}
              firstname={user.firstName}
              lastname={user.lastName}
              profilepicture={user.picture}
              createdate="2023-11-24"
              onSelectionChange={handleSelectionChange}
            />
          </>
        ) : (
          <UserProgress />
        )}
      </div>
    </div>
  );
}
