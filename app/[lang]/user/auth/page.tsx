import { Locale } from "@/i18n.config";
import SSRAuth from "@/app/[lang]/user/auth/ssrauth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | EduSpace",
  description:
    "Authenticate and access your account on EduSpace, an online learning platform",
};

export default function AuthPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const Language = lang == "ka" ? "ka" : "en";

  return (
    <>
      <SSRAuth
        params={{
          lang: Language,
        }}
      />
    </>
  );
}
