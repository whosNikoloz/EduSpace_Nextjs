import Ilustration from "@/public/ProgiLust3.png";
import Image from "next/image";

export const Hero = ({ userEmail }) => {
  return (
    <>
      <div className="flex flex-wrap md:mt-36">
        {/* Image for small screens */}
        <div className="w-full md:hidden">
          <div className="mx-auto flex items-center justify-center bounce-img">
            <Image src={Ilustration} alt="error" />
          </div>
        </div>

        {/* Title and content for medium screens and above */}
        <div className="w-full md:w-1/2 p-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl dark:text-white">
              Awesome <span className="text-blue-600">!</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              პაროლის აღდგენა წარმატებით დასრულდა,{" "}
              <span className="text-blue-600">{userEmail}!</span>
              <br />
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
                თქვენი პაროლი წარმატებით გადაკეთდა EduSpace-ზე.
                <br />
              </p>
            </p>
          </div>
        </div>
        {/* Image for medium screens and above */}
        <div className="hidden md:block w-1/2">
          <div className="mx-auto flex items-center justify-center bounce-img">
            <Image src={Ilustration} alt="error" />
          </div>
        </div>
      </div>
    </>
  );
};
