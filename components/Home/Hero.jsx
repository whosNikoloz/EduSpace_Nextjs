import Link from "next/link";
import { Reveal } from "../RevealFramer";

export const Hero = () => {
  return (
    <>
      <div className="relative isolate px-6 pt-40 lg:px-8">
        <div className="mx-auto max-w-3xl ">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-gray-500 hover:ring-blue-600">
              Announcing our next round of funding.{" "}
              <Link
                href="#step-section"
                className="font-semibold text-blue-600 "
              >
                <span className="absolute inset-0" aria-hidden="true"></span>
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-left lg:mt-14 mt-3">
            <h1 className="text-5xl font-bold tracking-tight  lg:text-6xl text-white">
              Welcome to
              <Reveal direction="down">
                <Link href="user/auth">
                  <span className="bg-gradient-to-r from-blue-600 via-blue-600 text-5xl sm:text-7xl  to-white  text-transparent bg-clip-text ">
                    EduSpace
                  </span>
                </Link>
              </Reveal>
              Learn Programming Online
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-end lg:h-[35vh] h-[26vh] text-center">
        <div className="relative h-[30px] w-[19px] rounded-[15px] border-[2px] border-[#fff] border-[solid]">
          <div className="absolute bottom-[20px] left-[4px] top-[4px] w-[8px] animate-[scroller_1500ms_ease-out_infinite] rounded-[8px] bg-[#fff]"></div>
        </div>
        <span className="text-white">Scroll Down</span>
      </div>
    </>
  );
};
