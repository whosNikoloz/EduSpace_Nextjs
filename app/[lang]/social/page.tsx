import LayoutNavbar from "@/app/[lang]/layouts/LayoutNavbar";
import { Locale } from "@/i18n.config";
import SSRPosts from "@/app/[lang]/social/ssrposts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social",
  description: "Online Learning Platform",
};

const SocialPage = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const Language = lang == "ka" ? "ka" : "en";

  return (
    <LayoutNavbar lang={lang}>
      <SSRPosts
        params={{
          lang: Language,
        }}
      />
    </LayoutNavbar>
  );
};

export default SocialPage;
