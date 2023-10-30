import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";

export const FooterLesson = () => {
  return (
    <>
      <footer className="rounded-lg shadow">
        <hr className="my-4 md:my-6 lg:my-8 border-gray-200 dark:border-gray-700" />
        <div className="flex flex-row items-center justify-center md:gap-4 lg:gap-8">
          <Button className="w-full md:w-auto">Back</Button>
          <Button className="w-full md:w-auto">icon</Button>
          <Button className="w-full md:w-auto">Check/Continue</Button>
        </div>
      </footer>
    </>
  );
};
