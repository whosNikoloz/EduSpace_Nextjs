import { Button } from "@nextui-org/react";
import Ilustration from "@/public/ProgiLust3.png";
import Image from "next/image";
import Link from "next/link";

export const Hero = ({ userEmail, userName }) => {
  return (
    <>
      <div className="flex flex-wrap md:mt-20">
        {/* Title and content for medium screens and above */}
        <div className="w-full md:w-1/2 p-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl dark:text-white">
              Good Job, <span className="text-blue-600">{userName}!</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              რეგისტრაცია წარმატებულად EduSpace-ზე გაიარე!
              <br />
              ელფოსტა გაიგზავნა {userEmail} ანგარიშზე პროფილის დასადასტურებლად.
              გთხოვთ, შეამოწმოთ თქვენი ელფოსტა და დააჭიროთ დამადასტურებელ ბმულზე
              თქვენი ანგარიშის გასააქტიურებლად.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="https://mail.google.com/">
                <Button className="bg-blue-600 text-white">გააქტიურება</Button>
              </Link>
              <p
                href="#"
                className="text-sm font-semibold leading-6 text-black dark:text-white"
              >
                ბმულის თაივდან გაგზვნა <span aria-hidden="true">→</span>
              </p>
            </div>
          </div>
        </div>

        {/* Image for small screens */}
        <div className="w-full md:w-1/2">
          <div className="mx-auto flex items-center justify-center bounce-img">
            <Image src={Ilustration} alt="error" />
          </div>
        </div>
      </div>
    </>
  );
};
