import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";

export const FooterLesson = () => {
  return (
    <>
      <footer className="rounded-lg shadow">
        <hr className="my-4 md:my-6 lg:my-8 border-gray-200 dark:border-gray-700" />
        <div className="flex flex-row items-center justify-center gap-4 md:gap-6 lg:gap-9">
          <Button
            color="primary"
            variant="ghost"
            radius="sm"
            className="w-auto"
          >
            Back
          </Button>
          <Button
            radius="sm"
            variant="shadow"
            color="primary"
            className="w-full md:w-auto"
          >
            icon
          </Button>
          <Button
            radius="sm"
            variant="shadow"
            color="primary"
            className="w-full md:w-auto"
          >
            Check
          </Button>
        </div>
      </footer>
    </>
  );
};
