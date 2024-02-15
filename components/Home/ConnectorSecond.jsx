import { Reveal } from "../RevealFramer";

export const ConnectorSecond = ({ text, color }) => {
  switch (color) {
    case "blue":
      color = "border-blue-600";
      break;
    case "white":
      color = "border-white";
      break;
    default:
      color = "border-blue-600";
      break;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-2/6 md:w-1/2 lg:w-4/6 relative">
        <Reveal direction="down" once={true}>
          <div className={`h-10 md:h-36 lg:h-56 ${color} border-r-4  w-full `}>
            <span className="absolute bottom-2 text-center w-full text-sm sm:text-lg font-mono font-bold">
              {text}
            </span>
          </div>
        </Reveal>
      </div>

      <div className={`w-2/6 border-b-4 lg:w-4/6 md:w-1/2 ${color}`}></div>

      <div className="w-2/6 md:w-1/2 lg:w-4/6">
        <Reveal direction="down" once={true}>
          <div
            className={`h-10 md:h-36 lg:h-56  ${color} border-l-4 w-full`}
          ></div>
        </Reveal>
      </div>
    </div>
  );
};
