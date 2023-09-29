"use client";

import MainLayout from "@/app/layouts/Mainlayout";
import React, { Key, useState, useEffect, useRef } from "react";
import { CustomTitle } from "@/components/CustomTitle";

export default function PythonIntermediatePage() {
  return (
    <MainLayout>
      <CustomTitle title1={"Python"} title2={"შუალედური"} />
    </MainLayout>
  );
}
