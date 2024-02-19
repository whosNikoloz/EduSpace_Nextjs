"use client";

import { Hero } from "@/components/signupsuccessful/Hero";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Locale } from "@/i18n.config";

export default function SSRSignUpSuccess({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const [userUserName, setUserUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    var cookie = new Cookies();

    setUserUserName(cookie.get("regUserName"));
    setUserEmail(cookie.get("regEmail"));
  }, []);

  return <Hero userEmail={userEmail} userName={userUserName} lng={lang} />;
}
