import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-full  ">
      <Navbar />
      <div className="mt-16">{children}</div>
      <Footer />
    </div>
  );
}
