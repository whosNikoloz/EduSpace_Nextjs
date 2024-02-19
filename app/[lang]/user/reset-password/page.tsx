import { useRouter } from "next/navigation";
import SSRResetPassword from "@/app/[lang]/user/reset-password/ssrresetpass";
import { Locale } from "@/i18n.config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | EduSpace",
  description:
    "Verify your account and gain access to EduSpace, an online learning platform",
  keywords: ["resetpassword", "authentication", "account", "online learning"],
};

export default function ResetPasswordPage({
  searchParams,
  params: { lang },
}: {
  searchParams: {
    token: string;
  };
  params: { lang: Locale };
}) {
  return (
    <>
      <SSRResetPassword token={searchParams.token} lng={lang} />
    </>
  );
}
