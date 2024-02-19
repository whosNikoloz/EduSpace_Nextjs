"use client";
import { Hero } from "@/components/verificationsuccessful/Hero";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Locale } from "@/i18n.config";

export default function SSRVS({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const router = useRouter();
  const [userUserName, setUserUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    var cookie = new Cookies();
    setUserUserName(cookie.get("regUserName"));
    setUserEmail(cookie.get("regEmail"));

    cookie.remove("regUserName");
    cookie.remove("regEmail");

    setTimeout(() => {
      router.push("/user/auth");
    }, 3000);
  }, [setUserEmail, router]);

  return <Hero userEmail={userEmail} userName={userUserName} lng={lang} />;
}
