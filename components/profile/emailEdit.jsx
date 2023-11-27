import React, { useState } from "react";
import { Avatar, Button, Input } from "@nextui-org/react";

function EmailEdit({ Email, oauth }) {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-full">
        <h1 className="text-xl font-semibold text-start mb-4">
          Email information
        </h1>

        {oauth && (
          <>
            <p className="text-start text-gray-500">Oauth Provider</p>
            <div className="flex flex-col gap-4 mt-4 mb-4 w-full">
              <Input
                type="email"
                className="w-full"
                label="Email"
                value={Email}
                isDisabled
                classNames="w-max"
              />
            </div>

            <Button color="primary" variant="shadow" size="sm" isDisabled>
              Change
            </Button>
          </>
        )}

        {!oauth && (
          <>
            <div className="flex flex-col gap-4 w-full mt-4 mb-4">
              <Input
                type="email"
                isClearable
                className="w-full"
                label="Email"
                value={Email}
              />
            </div>

            <span className="text-md ">Email requirements:</span>
            <br />
            <span className="text-sm text-slate-500">
              Ensure that these requirements are met:
            </span>
            <br />

            <p className="text-xs ml-8 lg:ml-16 text-slate-500 max-w-md">
              At least 10 characters (and up to 100 characters) At least one
              lowercase character Inclusion of at least one special character,
              e.g., ! @ # ? Some text here zoltan
            </p>

            <br />

            <div className="text-start w-full mt-6">
              <Button color="primary" variant="shadow" size="sm">
                Change
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EmailEdit;
