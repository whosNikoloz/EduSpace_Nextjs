import { Locale } from "@/i18n.config";
import { Metadata } from "next";
import SSRFP from "@/app/[lang]/user/forgot-password/ssrFP";

export const metadata: Metadata = {
  title: "Forgot Password | EduSpace",
  description: "Forgot your password? No worries, we got you covered",
  keywords: ["forgot password", "authentication", "account", "online learning"],
};

export default function ForgotPasswordPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return <SSRFP lang={lang} />;
}
