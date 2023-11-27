import React, { useState } from "react";

function MainSkeleton() {
  return (
    <>
      <div className="col-span-4 sm:col-span-9 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] animate-pulse">
        <div className=" bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[#1f1e1e] dark:shadow-black/20  backdrop-blur-[30px]shadow rounded-lg p-6 h-screen"></div>
      </div>
    </>
  );
}

export default MainSkeleton;
