import React, { useState } from "react";
import { Avatar, Button, Input } from "@nextui-org/react";

function NameEdit({ userName, firstname, lastname }) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <h1>Edit User Name</h1>
      <Input
        isClearable
        type="text"
        label="UserName"
        variant="bordered"
        placeholder="Enter your username"
        defaultValue={userName}
        onClear={() => console.log("input cleared")}
        className="max-w-xs"
      />
      <Input
        isClearable
        type="text"
        label="First Name"
        variant="bordered"
        placeholder="Enter your FirstName"
        defaultValue={firstname}
        onClear={() => console.log("input cleared")}
        className="max-w-xs"
      />
      <Input
        isClearable
        type="text"
        label="Last Name"
        variant="bordered"
        placeholder="Enter your LastName"
        defaultValue={lastname}
        onClear={() => console.log("input cleared")}
        className="max-w-xs"
      />

      <Button color="primary" variant="shadow" size="sm">
        Save
      </Button>
    </div>
  );
}

export default NameEdit;
