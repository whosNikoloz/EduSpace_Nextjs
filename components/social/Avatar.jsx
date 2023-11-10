"use client";

import Image from "next/image";

export default function Avatar() {
  return (
    <Image
      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      alt="Harsh mangalam`s profile image"
      className="w-10 h-10 rounded-full"
    />
  );
}
