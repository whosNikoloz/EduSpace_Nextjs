import MainLayout from "@/app/layouts/Mainlayout";
import AutoScrollCarousel from "@/components/Home/AutoScrollCarousel";
import { Team } from "@/components/Home/team";
import Stats from "@/components/Home/Stats";
import Macbook from "@/components/Home/Macbook";
import { Steps } from "@/components/Home/steps";
import { Hero } from "@/components/Home/Hero";
import { Pricing } from "@/components/Home/pricing";
import { CustomTitle } from "@/components/CustomTitle";
import Review from "@/components/Home/review";
import CompilerSection from "@/components/Home/compilerSection";
import { ConnectorFirst } from "@/components/Home/ConnectorFirst";
import { ConnectorSecond } from "@/components/Home/ConnectorSecond";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  return (
    <MainLayout>
      <div className="mb-56">
        <Hero />
      </div>
      <div className="hidden md:block">
        <ConnectorFirst text="კოდის ყოველი ხაზი არის ინოვაციასთან უფრო ახლოს." />
      </div>
      <section id="compiler-section" className=" items-center justify-center">
        <div className="mt-7 ">
          <CustomTitle
            title1={"ჩვენი"}
            title2={"კურსები"}
            margin={12}
            direct="right"
          />
          <div className="mt-20 mb-20">
            <AutoScrollCarousel />
          </div>
        </div>
      </section>
      <div className="hidden md:block">
        <ConnectorSecond text="ყველა საიდანღაც იწყებს" />
      </div>
      <section className=" items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-7">
          <CustomTitle
            title1={"ჩვენი"}
            title2={"გუნდი"}
            margin={12}
            direct="left"
          />
          <Team />
        </div>
      </section>
      <div className="hidden md:block">
        <ConnectorFirst text="არ არსებობს იდეალური დრო" />
      </div>
      <section className=" items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-7 ">
          <CompilerSection />
        </div>
      </section>
      <div className="hidden md:block">
        <ConnectorSecond text="კოდირება არის იდეების რეალობად გადაქცევის ხელოვნება." />
      </div>
      <section className=" items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-7 ">
          <CustomTitle
            title1={"მიყევი"}
            title2={"ინსტრუქციას"}
            margin={12}
            direct="left"
          />
          <div className="mt-10">
            <Steps />
          </div>
        </div>
      </section>
      <div className="hidden md:block">
        <ConnectorFirst text="გააგრძელეთ კოდირება, განაგრძეთ სწავლა და განაგრძეთ ზრდა." />
      </div>
      <section className=" items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-7 ">
          <div className="mt-10">
            <CustomTitle
              title1={"პროექტის"}
              title2={"სტატისტიკა"}
              margin={12}
              direct="right"
            />
            <Stats />
          </div>
        </div>
      </section>
      <div className="hidden md:block">
        <ConnectorSecond text="წარუმატებლობა მხოლოდ დროებითი შეცდომაა" />
      </div>
      <section className=" items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-7 text-center   justify-center">
          <CustomTitle
            title1={"ჩვენი"}
            title2={"მომხმარებლები"}
            margin={12}
            direct="left"
          />
          <div className="mt-10">
            <Review />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
