import dynamic from "next/dynamic";

import Hero from "@/components/Home/Hero";
import AutoScrollCarousel from "@/components/Home/AutoScrollCarousel";
import MainLayout from "@/app/[lang]/layouts/Mainlayout";

import Fab from "@/components/FAB";

// Lazy load non-critical components

const Team = dynamic(() => import("@/components/Home/team"));
const StepsNew = dynamic(() =>
  import("@/components/Home/StepsComponents/stepsNew").then(
    (module) => module.StepsNew
  )
);

const Review = dynamic(() => import("@/components/Home/review"));

const CompilerSection = dynamic(
  () => import("@/components/Home/compilerSection")
);
const ConnectorSecond = dynamic(() =>
  import("@/components/Home/ConnectorSecond").then(
    (module) => module.ConnectorSecond
  )
);
const ConnectorFirst = dynamic(() =>
  import("@/components/Home/ConnectorFirst").then(
    (module) => module.ConnectorFirst
  )
);
const Stats = dynamic(() => import("@/components/Home/StatsComponents/Stats"));
import { Locale } from "@/i18n.config";

export default function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <>
      <MainLayout lang={lang}>
        <main className="dark:bg-pattern-dark bg-pattern-white">
          <div className="relative bottom-16">
            {/* Video Background */}
            <video
              className="absolute inset-0 object-cover w-full h-full"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/EduSpaceHeroBg.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Content Overlay */}
            <div className="bg-opacity-50 bg-black absolute inset-0"></div>

            {/* Content */}
            <div className="mb-4 container mx-auto pt-9 lg:px-32 h-[100vh]  sm:px-6 flex-grow relative z-10">
              <Hero lng={lang} />
            </div>
          </div>
          <section className=" items-center justify-center">
            <div className="mb-10">
              <AutoScrollCarousel lng={lang} />
            </div>
          </section>
          <div className="hidden md:block">
            <ConnectorFirst text="ყველა საიდანღაც იწყებს" color={"white"} />
          </div>
          <section className=" items-center justify-center gap-4 py-8 md:py-10 container mx-auto max-w-7xl pt-9 px-6 flex-grow">
            <div className="mt-7 ">
              <CompilerSection lng={lang} />
            </div>
          </section>
          <div className="hidden md:block">
            <ConnectorSecond
              text="კოდირება არის იდეების რეალობად გადაქცევის ხელოვნება."
              color={"blue"}
            />
          </div>
          <section className=" items-center justify-center gap-4 py-8 md:py-10">
            <div className="mt-7">
              <Team lng={lang} />
            </div>
          </section>

          <div className="hidden md:block">
            <ConnectorFirst
              text="კოდირება არის იდეების რეალობად გადაქცევის ხელოვნება."
              color={"white"}
            />
          </div>
          <section
            className=" items-center justify-center gap-4 "
            id="step-section"
          >
            <StepsNew lng={lang} />
          </section>

          <div className="hidden md:block">
            <ConnectorSecond
              text="გააგრძელეთ კოდირება, განაგრძეთ სწავლა და განაგრძეთ ზრდა."
              color={"blue"}
            />
          </div>
          <section className=" items-center justify-center gap-4 py-8 md:py-10">
            <div className="mt-10">
              <Stats lng={lang} />
            </div>
          </section>
          <div className="hidden md:block">
            <ConnectorFirst
              text="წარუმატებლობა მხოლოდ დროებითი შეცდომაა"
              color={"white"}
            />
          </div>
          <section className=" items-center justify-center gap-4 py-8 md:py-10">
            <div className=" text-center   justify-center">
              <Review lng={lang} />
            </div>
          </section>
        </main>
        <Fab lang={lang} />
      </MainLayout>
    </>
  );
}
