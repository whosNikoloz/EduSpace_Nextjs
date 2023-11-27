"use client";

import React, { useState } from "react";
import { Avatar, Button, Input } from "@nextui-org/react";
import Authentication from "@/app/api/User/auth";
import toast from "react-hot-toast";
import { useUser } from "@/app/dbcontext/UserdbContext";

interface GeneralEditProps {
  userName: string;
  firstname: string;
  lastname: string;
  number: string;
  userid: number;
  onChange: (updatedInfo: {
    userName: string;
    firstname: string;
    lastname: string;
    number: string;
  }) => void;
}

function GeneralEdit({
  userName,
  firstname,
  lastname,
  number,
  userid,
  onChange,
}: GeneralEditProps) {
  const [GeneralProps, setGeneralProps] = useState({
    userName: userName,
    firstname: firstname,
    lastname: lastname,
    number: number,
  });

  const [error, setError] = useState({
    userNameError: "",
  });

  const pass_API = Authentication();

  const [isLoading, setIsLoading] = useState(false);

  const handelChangeGeneral = async () => {
    setIsLoading(true);
    setError({
      userNameError: "",
    });

    var errorMessage = await pass_API.handleChangeGeneral(
      userid,
      GeneralProps.userName,
      GeneralProps.firstname,
      GeneralProps.lastname,
      GeneralProps.number
    );
    if (errorMessage) {
      setError({ ...error, userNameError: "ასეთი სახელი უკვე არსებობს" });
      toast.error("ასეთი სახელი უკვე არსებობს");

      setIsLoading(false);
    } else {
      setError({
        userNameError: "",
      });
      onChange({
        userName: GeneralProps.userName,
        firstname: GeneralProps.firstname,
        lastname: GeneralProps.lastname,
        number: GeneralProps.number,
      });
      toast.success("წარმატებით შეიცვალა");
      setIsLoading(false);
    }
  };

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
            value={GeneralProps.userName}
            isInvalid={error.userNameError ? true : false}
            onClear={() => setGeneralProps({ ...GeneralProps, userName: "" })}
            errorMessage={error.userNameError ? error.userNameError : null}
            onChange={(e) =>
              setGeneralProps({
                ...GeneralProps,
                userName: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Input
            type="text"
            className="w-full"
            isClearable
            label="First name"
            value={GeneralProps.firstname}
            onClear={() => setGeneralProps({ ...GeneralProps, firstname: "" })}
            onChange={(e) =>
              setGeneralProps({
                ...GeneralProps,
                firstname: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Input
            type="text"
            className="w-full"
            isClearable
            label="Last name"
            value={GeneralProps.lastname}
            onClear={() => setGeneralProps({ ...GeneralProps, lastname: "" })}
            onChange={(e) =>
              setGeneralProps({
                ...GeneralProps,
                lastname: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            className="w-full"
            isClearable
            label="Phone Number"
            value={GeneralProps.number}
            onClear={() => setGeneralProps({ ...GeneralProps, number: "" })}
            onChange={(e) =>
              setGeneralProps({
                ...GeneralProps,
                number: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="text-start w-full">
        <Button
          color="primary"
          variant="shadow"
          size="sm"
          onClick={() => handelChangeGeneral()}
          isLoading={isLoading}
        >
          Change
        </Button>
      </div>
    </div>
  );
}

export default GeneralEdit;
