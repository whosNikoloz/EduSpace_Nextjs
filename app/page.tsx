"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/Home/Hero";
import MainLayout from "@/app/layouts/Mainlayout";
import FAB from "@/components/FAB";
import { ConnectorFirst } from "@/components/Home/ConnectorFirst";

const AutoScrollCarousel = dynamic(
  () => import("@/components/Home/AutoScrollCarousel")
);

const Feature = dynamic(() => import("@/components/Home/Feature"));
// Lazy load Review component
const Review = dynamic(() => import("@/components/Home/review"));

// Lazy load Team, CompilerSection, Stats, and Steps components
const Team = dynamic(() =>
  import("@/components/Home/team").then((mod) => mod.Team)
);

const CompilerSection = dynamic(
  () => import("@/components/Home/compilerSection")
);

const ConnectorSecond = dynamic(() =>
  import("@/components/Home/ConnectorSecond").then(
    (module) => module.ConnectorSecond
  )
);

const Stats = dynamic(() => import("@/components/Home/Stats"));
const Steps = dynamic(() =>
  import("@/components/Home/steps").then((module) => module.Steps)
);

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className="mb-4 container mx-auto max-w-7xl pt-9 px-6 flex-grow">
          <Hero />
        </div>
        <div className="hidden md:block">
          <ConnectorFirst text="კოდის ყოველი ხაზი არის ინოვაციასთან უფრო ახლოს." />
        </div>
        <section className=" items-center justify-center">
          <div className="mt-7 ">
            <div className="mt-20 mb-7">
              <AutoScrollCarousel />
            </div>
          </div>
        </section>
        <div className="hidden md:block">
          <ConnectorSecond text="ყველა საიდანღაც იწყებს" />
        </div>

        <div className="mt-7 ">
          <div className="mt-20 mb-7">
            <Feature />
          </div>
        </div>
        <div className="hidden md:block">
          <ConnectorFirst text="არ არსებობს იდეალური დრო" />
        </div>
        <section className=" items-center justify-center gap-4 py-8 md:py-10 container mx-auto max-w-7xl pt-9 px-6 flex-grow">
          <div className="mt-7 ">
            <CompilerSection />
          </div>
        </section>
        <div className="hidden md:block">
          <ConnectorSecond text="კოდირება არის იდეების რეალობად გადაქცევის ხელოვნება." />
        </div>
        <section className=" items-center justify-center gap-4 py-8 md:py-10">
          <div className="mt-7">
            <Team />
          </div>
        </section>

        <div className="hidden md:block">
          <ConnectorFirst text="კოდირება არის იდეების რეალობად გადაქცევის ხელოვნება." />
        </div>
        <section
          className=" items-center justify-center gap-4 py-8 md:py-10"
          id="step-section"
        >
          <div className="mt-7 ">
            <div className="mt-10">
              <Steps />
            </div>
          </div>
        </section>

        <div className="hidden md:block">
          <ConnectorSecond text="გააგრძელეთ კოდირება, განაგრძეთ სწავლა და განაგრძეთ ზრდა." />
        </div>
        <section className=" items-center justify-center gap-4 py-8 md:py-10">
          <div className="mt-7 ">
            <div className="mt-10">
              <Stats />
            </div>
          </div>
        </section>
        <div className="hidden md:block">
          <ConnectorFirst text="წარუმატებლობა მხოლოდ დროებითი შეცდომაა" />
        </div>
        <section className=" items-center justify-center gap-4 py-8 md:py-10">
          <div className=" text-center   justify-center">
            <Review />
          </div>
        </section>
        <FAB />
      </MainLayout>
    </>
  );
}
