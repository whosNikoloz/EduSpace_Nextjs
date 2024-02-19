import { Locale } from "@/i18n.config";
import { Metadata } from "next";
import SSRResetSuccess from "@/app/[lang]/user/reset-password/resetpassword-successful/ssrresetsucess";

export const metadata: Metadata = {
  title: "Reset Password | EduSpace",
  description:
    "Verify your account and gain access to EduSpace, an online learning platform",
  keywords: ["resetpassword", "authentication", "account", "online learning"],
};

export default function ResetPasswordSuccessPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return <SSRResetSuccess lang={lang} />;
}
