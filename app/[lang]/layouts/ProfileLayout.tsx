import { Navbar } from "@/components/navbar/navbar";
import { Locale } from "@/i18n.config";

export default function ProfileLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-t dark:from-black dark:via-blue-900 dark:to-black from-white to-white via-blue-300">
      <Navbar lng={lang} NotMain={false} />
      {children}
    </div>
  );
}
