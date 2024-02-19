import SSRSignUpSuccess from "@/app/[lang]/user/auth/signup-successful/ssrsignupsuccss";
import { Metadata } from "next";
import { Locale } from "@/i18n.config";

export const metadata: Metadata = {
  title: "Sign Up Successful | EduSpace",
  description:
    "Congratulations! Your account has been successfully verified. Gain access to EduSpace, an online learning platform.",
  keywords: [
    "verification",
    "authentication",
    "account",
    "online learning",
    "success",
  ],
};

export default function SignupSuccessfulPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const Language = lang == "ka" ? "ka" : "en";
  return (
    <SSRSignUpSuccess
      params={{
        lang: Language,
      }}
    />
  );
}
