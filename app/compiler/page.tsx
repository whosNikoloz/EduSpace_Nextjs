"use client";

import React, { Key, useState, useEffect, useRef } from "react";
import Landing from "@/components/compiler/Landing";
import LayoutNavbar from "../layouts/LayoutNavbar";

export default function CompilerPage() {
  return (
    <LayoutNavbar>
      <Landing />
    </LayoutNavbar>
  );
}
