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

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <section className=" items-center justify-center gap-4 py-8 md:py-10 mt-20">
        <div className="mt-20 text-center   justify-center">
          <CustomTitle title1={"ჩვენი"} title2={"კურსები"} margin={12} />
          <div className="mt-20 ">
            <AutoScrollCarousel />
          </div>
        </div>
      </section>
      <section className=" items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-20 text-center   justify-center">
          <CustomTitle title1={"ჩვენი"} title2={"გუნდი"} margin={12} />
          <Team />
        </div>
      </section>

      <section className=" items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-20 text-center   justify-center">
          <CustomTitle title1={"პროექტის"} title2={"სტატისტიკა"} margin={12} />
          <Stats />
        </div>
      </section>
      <section className=" items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-20 text-center   justify-center">
          <CustomTitle title1={"მიყევი"} title2={"ინსტრუქციას"} margin={12} />
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
          <CustomTitle title1={"ჩვენი"} title2={"მომხმარებლები"} margin={12} />
          <div className="mt-10">
            <Review />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
