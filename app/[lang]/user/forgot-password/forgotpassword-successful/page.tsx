import { Locale } from "@/i18n.config";
import { Metadata } from "next";
import SSRFPS from "@/app/[lang]/user/forgot-password/forgotpassword-successful/ssrFPS";

export const metadata: Metadata = {
  title: "Forgot Password Successfull | EduSpace",
  description: "Forgot your password? No worries, we got you covered",
  keywords: [
    "forgot password successfull",
    "authentication",
    "account",
    "online learning",
  ],
};

export default function VerificationSuccessfulPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return <SSRFPS lang={lang} />;
}
