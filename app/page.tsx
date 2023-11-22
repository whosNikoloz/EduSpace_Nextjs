"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Styles from "@/styles/loader.module.css";
import EduSpace from "@/public/EduSpaceLogo.png";
import { Hero } from "@/components/Home/hero";
import MainLayout from "@/app/layouts/Mainlayout";

// Lazy load MainLayout and AutoScrollCarousel

const FAB = dynamic(() => import("@/components/FAB"));
const AutoScrollCarousel = dynamic(
  () => import("@/components/Home/AutoScrollCarousel")
);

// Lazy load Review component
const Review = dynamic(() => import("@/components/Home/review"));

// Lazy load Team, CompilerSection, Stats, and Steps components
const Team = dynamic(() =>
  import("@/components/Home/team").then((module) => module.Team)
);
const CompilerSection = dynamic(
  () => import("@/components/Home/compilerSection")
);
const ConnectorFirst = dynamic(() =>
  import("@/components/Home/connectorFirst").then(
    (module) => module.ConnectorFirst
  )
);
const ConnectorSecond = dynamic(() =>
  import("@/components/Home/connectorSecond").then(
    (module) => module.ConnectorSecond
  )
);

const Stats = dynamic(() => import("@/components/Home/Stats"));
const Steps = dynamic(() =>
  import("@/components/Home/steps").then((module) => module.Steps)
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading by setting isLoading to false after some time
  useEffect(() => {
    // Set a timeout to change isLoading to false after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Cleanup the timeout if the component unmounts before the timeout is reached
    return () => {
      clearTimeout(timeoutId);
    };

    // The empty dependency array ensures that this effect runs only once, similar to componentDidMount
  }, []);
  return (
    <>
      {isLoading ? (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-20">
          <div className={Styles.Loader}>
            <Image
              src={EduSpace}
              alt="Description of the image"
              width={100} // Specify the width of the image
              height={100}
            />
          </div>
        </section>
      ) : (
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
          <section className=" items-center justify-center gap-4 py-8 md:py-10">
            <div className="mt-7">
              <Team />
            </div>
          </section>
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
            <ConnectorFirst text="გააგრძელეთ კოდირება, განაგრძეთ სწავლა და განაგრძეთ ზრდა." />
          </div>
          <section className=" items-center justify-center gap-4 py-8 md:py-10">
            <div className="mt-7 ">
              <div className="mt-10">
                <Stats />
              </div>
            </div>
          </section>
          <div className="hidden md:block">
            <ConnectorSecond text="წარუმატებლობა მხოლოდ დროებითი შეცდომაა" />
          </div>
          <section className=" items-center justify-center gap-4 py-8 md:py-10">
            <div className=" text-center   justify-center">
              <Review />
            </div>
          </section>
          <FAB />
        </MainLayout>
      )}
    </>
  );
}
