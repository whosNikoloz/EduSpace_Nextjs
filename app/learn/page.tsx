"use client";

import MainLayout from "@/app/layouts/Mainlayout";
import React, { Key, useState, useEffect, useRef } from "react";
import { CustomTitle } from "@/components/CustomTitle";

export default function LearnPage() {
  return (
    <MainLayout>
      <CustomTitle title1={"სასწავლო"} title2={"ცენტრი"} />
    </MainLayout>
  );
}
