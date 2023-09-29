"use client";

import MainLayout from "@/app/layouts/Mainlayout";
import React, { Key, useState, useEffect, useRef } from "react";
import { CustomTitle } from "@/components/CustomTitle";

export default function SwiftBeginnerPage() {
  return (
    <MainLayout>
      <CustomTitle title1={"Swift"} title2={"შესავალი"} />
    </MainLayout>
  );
}
