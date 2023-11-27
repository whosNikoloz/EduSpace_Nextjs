import React, { useState } from "react";
import { Avatar, Button, Input } from "@nextui-org/react";

function GeneralEdit({ userName, firstname, lastname, number }) {
  return (
    <div className="flex items-center flex-col justify-center w-full ">
      <h1 className="text-xl text-start font-semibold  mb-6">
        General information
      </h1>

      <div className="flex flex-col gap-4 w-full">
        <div>
          <Input
            type="text"
            isClearable
            className="w-full"
            label="Username"
            value={userName}
          />
        </div>
        <div>
          <Input
            type="text"
            className="w-full"
            isClearable
            label="First name"
            value={firstname}
          />
        </div>
        <div>
          <Input
            type="text"
            className="w-full"
            isClearable
            label="Last name"
            value={lastname}
          />
        </div>
        <div className="mb-4">
          <Input
            type="number"
            className="w-full"
            isClearable
            label="Phone Number"
            value={number}
          />
        </div>
      </div>

      <div className="text-start w-full">
        <Button color="primary" variant="shadow" size="sm">
          Change
        </Button>
      </div>
    </div>
  );
}

export default GeneralEdit;
