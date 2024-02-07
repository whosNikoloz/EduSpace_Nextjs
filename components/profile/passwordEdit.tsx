import React, { useState } from "react";
import { Avatar, Button, Input } from "@nextui-org/react";
import Authentication from "@/app/api/User/auth";
import toast from "react-hot-toast";
import { Card, CardBody } from "@nextui-org/react";

interface PasswordEditProps {
  oauth: boolean;
  userid: number;
}

function PasswordEdit({ oauth, userid }: PasswordEditProps) {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    oldpasswordError: "",
    newpasswordError: "",
    confirmpasswordError: "",
  });

  const pass_API = Authentication();

  const [isLoading, setIsLoading] = useState(false);

  const handelChange = async () => {
    setIsLoading(true);
    setError({
      oldpasswordError: "",
      newpasswordError: "",
      confirmpasswordError: "",
    });

    if (
      !password.currentPassword ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      toast.error("All fields must be filled");
      setIsLoading(false);
      return;
    }

    if (password.newPassword.length < 6) {
      setError({
        ...error,
        newpasswordError: "Password must be at least 6 characters long",
      });
      setIsLoading(false);
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      setError({
        ...error,
        confirmpasswordError:
          "ახალი პაროლი და დადასტურებული პაროლი არ ემთხვევა",
      });
      setIsLoading(false);
      toast.error("ახალი პაროლი და დადასტურებული პაროლი არ ემთხვევა");
      return;
    }

    var errorMessage = await pass_API.handleChangePassowrd(
      userid,
      password.currentPassword,
      password.newPassword,
      password.confirmPassword
    );
    if (errorMessage) {
      setError({ ...error, oldpasswordError: "პაროლი არასწორია" });
      toast.error("პაროლი არასწორია");
      setIsLoading(false);
    } else {
      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("წარმატებით შეიცვალა");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card
        isBlurred
        className="border-none  bg-background/60 dark:bg-black-100/50 max-w-[680px] justify-center items-center sm:h-[410px]"
        shadow="sm"
      >
        <CardBody>
          <div className="flex items-center justify-center lg:h-80 ">
            <div className="max-w-md">
              <h1 className="text-xl font-semibold text-start mb-8 mt-10">
                Password information
              </h1>

              {oauth && (
                <>
                  <span className="text-md ">Oauth Provider:</span>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mt-4">
                    <div>
                      <Input
                        type="password"
                        isDisabled
                        label="Current password"
                        labelPlacement="outside"
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        isDisabled
                        label="New password"
                        labelPlacement="outside"
                      />
                    </div>
                    <div className="sm:col-span-2 mb-4 ">
                      <Input
                        type="password"
                        isDisabled
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

                  <p className="text-xs ml-8 lg:ml-16 text-slate-500 max-w-md">
                    At least 10 characters (and up to 100 characters) At least
                    one lowercase character Inclusion of at least one special
                    character, e.g., ! @ # ? Some text here zoltan
                  </p>

                  <br />
                </>
              )}

              {!oauth && (
                <>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <Input
                        type="password"
                        isClearable
                        label="Current password"
                        labelPlacement="outside"
                        isInvalid={error.oldpasswordError ? true : false}
                        value={password.currentPassword}
                        onClear={() =>
                          setPassword({ ...password, currentPassword: "" })
                        }
                        errorMessage={
                          error.oldpasswordError ? error.oldpasswordError : null
                        }
                        onChange={(e) =>
                          setPassword({
                            ...password,
                            currentPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        isClearable
                        label="New password"
                        labelPlacement="outside"
                        isInvalid={error.newpasswordError ? true : false}
                        value={password.newPassword}
                        errorMessage={
                          error.newpasswordError ? error.newpasswordError : null
                        }
                        onClear={() =>
                          setPassword({ ...password, newPassword: "" })
                        }
                        onChange={(e) =>
                          setPassword({
                            ...password,
                            newPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="sm:col-span-2 mb-4 ">
                      <Input
                        type="password"
                        isClearable
                        label="Confirm password"
                        labelPlacement="outside"
                        isInvalid={error.confirmpasswordError ? true : false}
                        value={password.confirmPassword}
                        onClear={() =>
                          setPassword({ ...password, confirmPassword: "" })
                        }
                        errorMessage={
                          error.confirmpasswordError
                            ? error.confirmpasswordError
                            : null
                        }
                        onChange={(e) =>
                          setPassword({
                            ...password,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <span className="text-md ">Password requirements:</span>
                  <br />
                  <span className="text-sm text-slate-500">
                    Ensure that these requirements are met:
                  </span>
                  <br />

                  <p className="text-xs ml-8 lg:ml-16 text-slate-500 max-w-md">
                    At least 10 characters (and up to 100 characters) At least
                    one lowercase character Inclusion of at least one special
                    character, e.g., ! @ # ? Some text here zoltan
                  </p>

                  <br />

                  <Button
                    color="primary"
                    variant="shadow"
                    size="sm"
                    isLoading={isLoading}
                    onClick={() => {
                      handelChange();
                    }}
                  >
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default PasswordEdit;
