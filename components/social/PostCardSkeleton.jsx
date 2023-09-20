"use client";

import React, { useState } from "react";
import { Button, Link, user } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/react";

function PostCardSkeleton() {
  return (
    <>
      <br />
      <div className="flex items-center justify-center ">
        <div className="px-5 py-4 bg-white dark:bg-gray-800 shadow justif rounded-lg   w-[800px] mb-4">
          <div className="flex  mb-4">
            <Skeleton className="flex rounded-full w-12 h-12" />
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
          <br />
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="flex justify-between items-center mt-5">
            <div className="flex"></div>
            <Link>
              <button className="ml-1 text-gray-500 dark:text-gray-400 font-light">
                კომენტარი
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCardSkeleton;
