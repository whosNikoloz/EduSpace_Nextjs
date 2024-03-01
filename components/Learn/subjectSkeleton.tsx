import { Button, Link } from "@nextui-org/react";
import { Vector, Run, Locked, Quiz } from "@/components/icons";

function SubjectSkeleton() {
  return (
    <>
      <div className="mt-14 w-full max-w-2xl mx-auto ">
        <section className="leading-relaxed w-full max-w-screen-xl  mx-auto px-4 md-px-8 ">
          <h4
            className={`cursor-pointer pb-5 flex items-center justify-between text-lg dark:text-white text-black  font-medium `}
          >
            <div className="flex items-center gap-2">
              <Run height={25} width={25} size={0} />
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48  animate-pulse"></div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 dark:text-white text-black ml-2 transform transition-transform`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </h4>

          <div
            className={`px-5 py-4 bg-white dark:bg-gray-800 shadow justify-between rounded-lg mb-4 `}
          >
            <div className="flex flex-row justify-between ">
              <div className="flex flex-row items-center gap-4">
                <Quiz size={25} height={0} width={0} />
                <div className="flex flex-col gap-1 ">
                  <p className="text-slate-400 text-[8px] lg-text-[10px]">
                    გაკვეთილი
                  </p>
                  <p className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 animate-pulse"></p>
                </div>
              </div>
              <Vector size={30} height={0} width={0} />
            </div>
          </div>

          <div
            className={`px-5 py-4 bg-white dark:bg-gray-800 shadow justify-between rounded-lg mb-4`}
          >
            <div className="flex flex-row justify-between ">
              <div className="flex flex-row items-center gap-4">
                <Quiz size={25} height={0} width={0} />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1 ">
                    <p className="text-slate-400 text-[8px] lg-text-[10px]">
                      გაკვეთილი
                    </p>
                    <p className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 animate-pulse"></p>
                  </div>
                  <div className="rounded-2xl font-medium border lg:w-12 lg:h-6 w-10 h-5 flex items-center justify-center">
                    <p className="text-slate-400 text-[8px] lg-text-[10px]">
                      XP + 10
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link className="w-full">
              <Button
                className="bg-blue-600 w-full text-white mt-4"
                color="primary"
                variant="ghost"
                isLoading={true}
              >
                სწავლა
              </Button>
            </Link>
          </div>

          <div
            className={`px-5 py-4 bg-white dark:bg-gray-800 shadow justify-between rounded-lg mb-4`}
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-4">
                <Quiz size={25} height={0} width={0} />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1 ">
                    <p className="text-slate-400 text-[8px] lg-text-[10px]">
                      გაკვეთილი
                    </p>
                    <p className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 animate-pulse"></p>
                  </div>
                  <div className="rounded-2xl font-medium border lg:w-12 lg:h-6 w-10 h-5 flex items-center justify-center">
                    <p className="text-slate-400 text-[8px] lg-text-[10px]">
                      XP + 10
                    </p>
                  </div>
                </div>
              </div>
              <Locked size={25} height={0} width={0} />
            </div>
          </div>
        </section>
        <section className="leading-relaxed w-full max-w-screen-xl  mx-auto px-4 md-px-8 ">
          <h4
            className={`cursor-pointer pb-5 flex items-center justify-between text-lg dark:text-white text-black  font-medium `}
          >
            <div className="flex items-center gap-2">
              <Locked height={25} width={25} size={0} />
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48  animate-pulse"></div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 dark:text-white text-black ml-2 transform transition-transform`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </h4>
          <div
            className={`px-5 py-4 bg-white dark:bg-gray-800 shadow justify-between rounded-lg mb-4`}
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-4">
                <Quiz size={25} height={0} width={0} />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1 ">
                    <p className="text-slate-400 text-[8px] lg-text-[10px]">
                      გაკვეთილი
                    </p>
                    <p className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 animate-pulse"></p>
                  </div>
                  <div className="rounded-2xl font-medium border lg:w-12 lg:h-6 w-10 h-5 flex items-center justify-center">
                    <p className="text-slate-400 text-[8px] lg-text-[10px]">
                      XP + 10
                    </p>
                  </div>
                </div>
              </div>
              <Locked size={25} height={0} width={0} />
            </div>
          </div>

          <div
            className={`px-5 py-4 bg-white dark:bg-gray-800 shadow justify-between rounded-lg mb-4`}
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-4">
                <Quiz size={25} height={0} width={0} />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1 ">
                    <p className="text-slate-400 text-[8px] lg-text-[10px]">
                      გაკვეთილი
                    </p>
                    <p className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 animate-pulse"></p>
                  </div>
                  <div className="rounded-2xl font-medium border lg:w-12 lg:h-6 w-10 h-5 flex items-center justify-center">
                    <p className="text-slate-400 text-[8px] lg-text-[10px]">
                      XP + 10
                    </p>
                  </div>
                </div>
              </div>
              <Locked size={25} height={0} width={0} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default SubjectSkeleton;
