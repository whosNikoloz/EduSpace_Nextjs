"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/Home/Hero";
import MainLayout from "@/app/layouts/Mainlayout";
const Fab = dynamic(() => import("@/components/FAB"), { ssr: false });
import { ConnectorFirst } from "@/components/Home/ConnectorFirst";
import { Toaster } from "react-hot-toast";
import { StepsNew } from "@/components/Home/StepsComponents/stepsNew";
import Feature from "@/components/Home/Feature";
import { Team } from "@/components/Home/team";

const AutoScrollCarousel = dynamic(
  () => import("@/components/Home/AutoScrollCarousel")
);

// Lazy load Review component
const Review = dynamic(() => import("@/components/Home/review"));

const CompilerSection = dynamic(
  () => import("@/components/Home/compilerSection")
);

const ConnectorSecond = dynamic(() =>
  import("@/components/Home/ConnectorSecond").then(
    (module) => module.ConnectorSecond
  )
);

const Stats = dynamic(() => import("@/components/Home/Stats"));
import { useParams } from "next/navigation";

export default function Home() {
  const { lng } = useParams();
  const CurrLanguage = lng === "ge" ? "ge" : "en";

  return (
    <>
      <MainLayout>
        <div className="relative bottom-16">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 object-cover w-full h-full"
          >
            <source src="/EduSpaceHeroBg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Content Overlay */}
          <div className="bg-opacity-50 bg-black absolute inset-0"></div>

          {/* Content */}
          <div className="mb-4 container mx-auto pt-9 lg:px-32 h-[100vh]  sm:px-6 flex-grow relative z-10">
            <Hero lng={CurrLanguage} />
          </div>
        </div>
        <section className=" items-center justify-center">
          <div className="mb-10">
            <AutoScrollCarousel lng={CurrLanguage} />
          </div>
        </section>
        <div className="hidden md:block">
          <ConnectorSecond text="ყველა საიდანღაც იწყებს" color={"blue"} />
        </div>

        <div className="bg-gradient-to-t dark:from-blue-900 from-blue-300  dark:to-black ">
          <div className="mt-7 ">
            <div className="mt-20">
              <Feature lng={CurrLanguage} />
            </div>
          </div>
          <div className="hidden md:block">
            <ConnectorFirst text="არ არსებობს იდეალური დრო" color={"white"} />
          </div>
        </div>
        <div className="bg-gradient-to-b dark:from-blue-900 from-blue-300  dark:to-black  ">
          <section className=" items-center justify-center gap-4 py-8 md:py-10 container mx-auto max-w-7xl pt-9 px-6 flex-grow">
            <div className="mt-7 ">
              <CompilerSection lng={CurrLanguage} />
            </div>
          </section>
          <div className="hidden md:block">
            <ConnectorSecond
              text="კოდირება არის იდეების რეალობად გადაქცევის ხელოვნება."
              color={"blue"}
            />
          </div>
        </div>
        <div className="bg-gradient-to-t dark:from-blue-900 from-blue-300  dark:to-black  ">
          <section className=" items-center justify-center gap-4 py-8 md:py-10">
            <div className="mt-7">
              <Team lng={CurrLanguage} />
            </div>
          </section>

          <div className="hidden md:block">
            <ConnectorFirst
              text="კოდირება არის იდეების რეალობად გადაქცევის ხელოვნება."
              color={"white"}
            />
          </div>
        </div>
        <div className="bg-gradient-to-b dark:from-blue-900 from-blue-300  dark:to-black  ">
          <section
            className=" items-center justify-center gap-4 py-8 md:py-10"
            id="step-section"
          >
            <div className="mt-7 ">
              <div className="mt-10">
                <StepsNew lng={CurrLanguage} />
              </div>
            </div>
          </section>

          <div className="hidden md:block">
            <ConnectorSecond
              text="გააგრძელეთ კოდირება, განაგრძეთ სწავლა და განაგრძეთ ზრდა."
              color={"blue"}
            />
          </div>
        </div>
        <div className="bg-gradient-to-t dark:from-blue-900 from-blue-300  dark:to-black  ">
          <section className=" items-center justify-center gap-4 py-8 md:py-10">
            <div className="mt-7 ">
              <div className="mt-10">
                <Stats lng={CurrLanguage} />
              </div>
            </div>
          </section>
          <div className="hidden md:block">
            <ConnectorFirst
              text="წარუმატებლობა მხოლოდ დროებითი შეცდომაა"
              color={"white"}
            />
          </div>
        </div>
        <div className="bg-gradient-to-b dark:from-blue-900 from-blue-300  dark:to-black  ">
          <section className=" items-center justify-center gap-4 py-8 md:py-10">
            <div className=" text-center   justify-center">
              <Review lng={CurrLanguage} />
            </div>
          </section>
        </div>
        <Fab />
        <Toaster position="bottom-left" reverseOrder={false} />
      </MainLayout>
    </>
  );
}
