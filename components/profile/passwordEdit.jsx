import React, { useState } from "react";
import { Avatar, Button, Input } from "@nextui-org/react";

function passwordEdit({}) {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="max-w-md">
          <h1 className="text-xl font-semibold text-start mb-6">
            Password information
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Input
                type="password"
                label="Current password"
                labelPlacement="outside"
              />
            </div>
            <div>
              <Input
                type="password"
                label="New password"
                labelPlacement="outside"
              />
            </div>
            <div className="sm:col-span-2 mb-4 ">
              <Input
                type="password"
                label="Confirm password"
                labelPlacement="outside"
              />
            </div>
          </div>

          <span className="text-md ">Password requirements:</span>
          <br />
          <span className="text-sm text-slate-500">
            Ensure that these requirements are met:
          </span>
          <br />

          <p className="text-xs ml-16 text-slate-500 max-w-md">
            At least 10 characters (and up to 100 characters) At least one
            lowercase character Inclusion of at least one special character,
            e.g., ! @ # ? Some text here zoltan
          </p>

          <br />

          <Button color="primary" variant="shadow" size="sm">
            Change
          </Button>
        </div>
      </div>
    </>
  );
}

export default passwordEdit;
