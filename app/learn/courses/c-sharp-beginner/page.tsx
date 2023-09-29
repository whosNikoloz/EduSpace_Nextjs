"use client";

import MainLayout from "@/app/layouts/Mainlayout";
import React, { Key, useState, useEffect, useRef } from "react";
import { CustomTitle } from "@/components/CustomTitle";

export default function CsharpBeginnerPage() {
  return (
    <MainLayout>
      <CustomTitle title1={"C#"} title2={"შესავალი"} />
    </MainLayout>
  );
}
