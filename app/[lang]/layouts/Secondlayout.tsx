import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";
import { Locale } from "@/i18n.config";

export default function Secondlayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  return (
    <div className="relative flex flex-col h-full  ">
      <Navbar lng={lang} NotMain={true} />
      <div className="mt-16">{children}</div>
      <Footer lng={lang} />
    </div>
  );
}
