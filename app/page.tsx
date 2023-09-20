import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/Home/primitives";
import { GithubIcon } from "@/components/icons";
import MainLayout from "@/app/layouts/Mainlayout";
import AutoScrollCarousel from "@/components/Home/AutoScrollCarousel";
import { Team } from "@/components/Home/team";
import { TemplateContext } from "next/dist/shared/lib/app-router-context";
import Stats from "@/components/Home/Stats";
import Macbook from "@/components/Home/Macbook";
import { Steps } from "@/components/Home/steps";
import { Hero } from "@/components/Home/Hero";
import { Pricing } from "@/components/Home/pricing";
import { CustomTitle } from "@/components/CustomTitle";
import Review from "@/components/Home/review";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <section className=" items-center justify-center gap-4 py-8 md:py-10 mt-20">
        <div className="mt-20 text-center   justify-center">
          <CustomTitle title1={"ჩვენი"} title2={"კურსები"} />
          <div className="mt-20 ">
            <AutoScrollCarousel />
          </div>
        </div>
      </section>
      <section className=" items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-20 text-center   justify-center">
          <CustomTitle title1={"ჩვენი"} title2={"გუნდი"} />
          <Team />
        </div>
      </section>

      <section className=" items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-20 text-center   justify-center">
          <CustomTitle title1={"პროექტის"} title2={"სტატისტიკა"} />
          <Stats />
        </div>
      </section>
      <section className=" items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-20 text-center   justify-center">
          <CustomTitle title1={"მიყევი"} title2={"ინსტრუქციას"} />
          <div className="mt-10">
            <Steps />
          </div>
        </div>
      </section>
      <section className=" items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-20 text-center   justify-center">
          <div className="mt-10">
            <Pricing />
          </div>
        </div>
      </section>

      <section className=" items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-20 text-center   justify-center">
          <CustomTitle title1={"ჩვენი"} title2={"მომხმარებლები"} />
          <div className="mt-10">
            <Review />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
