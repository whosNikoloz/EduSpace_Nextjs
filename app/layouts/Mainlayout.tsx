import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";
import { useParams } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lng } = useParams();
  const CurrLanguage = lng === "ge" ? "ge" : "en";
  return (
    <div className="relative flex flex-col h-full  ">
      <Navbar lng={CurrLanguage} />
      <div className="mt-16">{children}</div>
      <Footer />
    </div>
  );
}
