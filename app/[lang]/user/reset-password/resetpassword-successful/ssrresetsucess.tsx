"use client";

import { Hero } from "@/components/resetpasswordsuccessful/Hero";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function SSRResetSuccess(lng: { lang: string }) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    var cookie = new Cookies();
    setUserEmail(cookie.get("regEmail"));

    cookie.remove("regUserName");
    cookie.remove("regEmail");

    setTimeout(() => {
      router.push("/user/auth");
    }, 3000);
  }, [setUserEmail, router]);

  return <Hero userEmail={userEmail} lng={lng} />;
}
