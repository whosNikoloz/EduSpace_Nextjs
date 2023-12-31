import FeatureReview from "@/public/FeatureReview.png";
import Image from "next/image";
import { Reveal } from "../RevealFramer";
import { FcAssistant, FcDatabase } from "react-icons/fc";

const features = [
  {
    name: "Online Learning",
    description:
      "Access a wide range of courses and materials for effective online learning.",
    icon: FcAssistant,
  },
  {
    name: "Secure Platform",
    description:
      "Our platform ensures your data is safe with SSL certificates for secure and encrypted connections.",
    icon: FcDatabase,
  },
  {
    name: "Regular Testing",
    description:
      "Regular testing and quizzes to track your progress and enhance your learning experience.",
    icon: FcDatabase,
  },
];

export default function Feature() {
  return (
    <div className="overflow-hidden ">
      <div className="mx-auto  px-6 lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <Reveal direction="right">
            <div className="lg:pr-8 lg:pt-4 lg:ml-24">
              <div className="lg:max-w-lg">
                <h2 className=" font-semibold leading-7 text-indigo-600">
                  Welcome to Our Online Learning Platform
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight dark:text-white text-black sm:text-4xl">
                  Enhance Your Skills, Anytime, Anywhere
                </p>
                <p className="mt-6 text-lg leading-8 dark:text-white text-black">
                  Our platform provides a wide range of courses and materials
                  for effective online learning. Regular testing and quizzes are
                  available to track your progress and enhance your learning
                  experience. Your data is safe with us as we ensure secure and
                  encrypted connections.
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
          </Reveal>
          <Reveal direction="left">
            <Image
              src={FeatureReview}
              alt="Product screenshot"
              className="w-[21rem] max-w-none rounded-xl shadow-xl border  ring-1 ring-gray-400/10 dark:ring-gray-100/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
