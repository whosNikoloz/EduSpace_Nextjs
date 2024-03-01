import { Button } from "@nextui-org/react";
import { IconCheck } from "../icons";

export const InputLoadingBtn = ({
  loading,
  success,
}: {
  loading: boolean;
  success: boolean;
}) => {
  if (loading) {
    return (
      <Button
        className="bg-transparent"
        isIconOnly
        isLoading={loading}
      ></Button>
    );
  }
  if (success) return <IconCheck color="#00FF00" size={20} />;

  return <></>;
};
