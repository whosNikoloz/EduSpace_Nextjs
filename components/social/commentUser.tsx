import React from "react";
import { User } from "@nextui-org/react";
import {
  Dropdown,
  Link,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { DotsIcon } from "@/components/social/DotsIcon";
import { useUser } from "@/app/context/UserDbContext";

interface CommentProps {
  commentId: string;
  username: string;
  videoUrl: string;
  pictureUrl: string;
  commentText: string;
  createdAt: string;
  avatarUrl: string;
  userid: number;
}

function formatTimeAgo(timestamp: string | number | Date) {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);
  const currentTime = currentDate.getTime(); // Convert currentDate to timestamp
  const inputTime = inputDate.getTime(); // Convert inputDate to timestamp
  const timeDifferenceInSeconds = Math.floor((currentTime - inputTime) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return "ახლა ხანს";
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes} წუთის${minutes > 1 ? "" : ""} წინ`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours} საათის${hours > 1 ? "" : ""} წინ`;
  } else {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `${days} დღის${days > 1 ? "" : ""} წინ`;
  }
}

const Comment: React.FC<CommentProps> = ({
  userid,
  commentId,
  username,
  createdAt,
  videoUrl,
  pictureUrl,
  commentText,
  avatarUrl,
}) => {
  const formattedTimeAgo = formatTimeAgo(createdAt);
  const { user } = useUser();

  return (
    <div className="flex items-center bg-white dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
        <div>
          <User
            name
            avatarProps={{
              src: avatarUrl,
            }}
          />
        </div>
        <div className="ml-3">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5 mb-2">
            <div className="font-semibold text-sm leading-relaxed">
              {username}
            </div>
            <div className="text-normal leading-snug md:leading-normal">
              {commentText}
            </div>
          </div>
          {pictureUrl != null ? (
            <div className="text-sm mt-0.5 text-gray-500 dark:text-gray-400 ">
              <img className="rounded-lg" src={pictureUrl} alt="" />
            </div>
          ) : videoUrl != null ? (
            <div className="text-sm mt-0.5 text-gray-500 dark:text-gray-400 rounded">
              <video className="rounded-lg" src={videoUrl}></video>
            </div>
          ) : (
            <></>
          )}
          <div className="text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400">
            {formattedTimeAgo}
          </div>
        </div>
        {user && userid === user.userId && (
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <DotsIcon
                  size={35}
                  filled={undefined}
                  height={undefined}
                  width={undefined}
                  label={undefined}
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Static Actions">
              <DropdownItem key="new">პოსტის რედაქტირება</DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                //onClick={confirmDelete}
              >
                კომენტარის წაშლა
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Comment;
