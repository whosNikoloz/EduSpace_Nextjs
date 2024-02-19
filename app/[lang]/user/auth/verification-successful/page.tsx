import SSRVS from "@/app/[lang]/user/auth/verification-successful/ssrvs";
import { Locale } from "@/i18n.config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verification | EduSpace",
  description:
    "Verify your account and gain access to EduSpace, an online learning platform",
  keywords: ["verification", "authentication", "account", "online learning"],
};

export default function VerificationSuccessfulPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const Language = lang == "ka" ? "ka" : "en";
  return (
    <SSRVS
      params={{
        lang: Language,
      }}
    />
  );
}
