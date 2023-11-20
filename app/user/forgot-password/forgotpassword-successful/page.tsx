"use client";

import { Hero } from "@/components/forgotpasswordsuccessful/Hero";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function VerificationSuccessfulPage() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    var cookie = new Cookies();
    setUserEmail(cookie.get("forgetEmail"));

    cookie.remove("forgetEmail");
  },[setUserEmail]);

  return <Hero userEmail={userEmail} />;
}
