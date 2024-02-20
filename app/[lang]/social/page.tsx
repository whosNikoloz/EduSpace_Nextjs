import LayoutNavbar from "@/app/[lang]/layouts/LayoutNavbar";
import { Locale } from "@/i18n.config";
import SSRPosts from "@/app/[lang]/social/ssrposts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social | EduSpace",
  description:
    "Connect and collaborate with other learners on our online learning platform",
};

const SocialPage = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const Language = lang == "ka" ? "ka" : "en";

  return (
    <LayoutNavbar lang={lang}>
      <main className="dark:bg-pattern-dark bg-pattern-white">
        <SSRPosts
          params={{
            lang: Language,
          }}
        />
      </main>
    </LayoutNavbar>
  );
};

export default SocialPage;
