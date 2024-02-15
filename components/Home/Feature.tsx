"use client";

import FeatureReview from "@/public/FeatureReview.png";
import Image from "next/image";
import { FcGraduationCap, FcLock, FcCommandLine } from "react-icons/fc";
import { useScroll, motion } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    name: "Online Learning",
    description:
      "მიიღეთ კურსებისა და მასალების ფართო სპექტრი ეფექტური ონლაინ სწავლისთვის.",
    icon: FcGraduationCap,
  },
  {
    name: "Secure Platform",
    description:
      "ჩვენი პლატფორმა უზრუნველყოფს თქვენი მონაცემების უსაფრთხოებას SSL სერთიფიკატებით უსაფრთხო და დაშიფრული კავშირებისთვის.",
    icon: FcLock,
  },
  {
    name: "Regular Testing",
    description:
      "რეგულარული ტესტირება და ვიქტორინები, რათა თვალყური ადევნოთ თქვენს პროგრესს და გააუმჯობესოთ თქვენი სასწავლო გამოცდილება.",
    icon: FcCommandLine,
  },
];

export default function Feature() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.01 1"],
  });

  return (
    <div className="overflow-hidden">
      <div className="mx-auto  px-6 lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4 lg:ml-24">
            <div className="lg:max-w-lg">
              <h2 className=" font-semibold leading-7 text-[#444] hover:text-white transition-all">
                Welcome to Our Online Learning Platform
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight dark:text-white text-black sm:text-4xl">
                Enhance Your Skills, Anytime, Anywhere
              </p>
              <p className="mt-6 text-lg leading-8 dark:text-white text-black">
                ჩვენი პლატფორმა გთავაზობთ კურსებისა და მასალების ფართო სპექტრს
                ეფექტური ონლაინ სწავლისთვის. რეგულარული ტესტირება და
                ვიქტორინებია ხელმისაწვდომია თქვენი პროგრესის თვალყურის
                დევნებისთვის და სწავლის გასაუმჯობესებლად.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 dark:text-white text-black lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold dark:text-white text-black">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <motion.div
            ref={ref}
            style={{
              opacity: scrollYProgress,
            }}
            className="opacity-0"
          >
            <Image
              src={FeatureReview}
              alt="Product screenshot"
              className="w-[21rem] md:max-w-none mx-auto rounded-xl shadow-xl border  ring-1 ring-gray-400/10 dark:ring-gray-100/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
