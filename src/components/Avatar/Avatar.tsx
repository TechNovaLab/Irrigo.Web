import { AvatarProps } from "./Avatar.types";

const Avatar: React.FC<AvatarProps> = ({ firstName, lastName, roleName }) => {
  const getInitials = (): string => {
    var text = `${firstName} ${lastName}`;
    return text
      .split(" ")
      .filter((word) => word.trim() !== "")
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  return (
    <div className="p-2 text-lg font-bold">
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-10 h-10 bg-teal-500 bg-opacity-90 text-white rounded font-bold shadow-md">
          {getInitials()}
        </span>
        <div className="font-medium dark:text-white">
          <div>{roleName}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {firstName} {lastName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
