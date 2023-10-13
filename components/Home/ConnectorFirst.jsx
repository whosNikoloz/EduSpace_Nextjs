export const ConnectorFirst = ({ text }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-2/6 h-10 md:h-36 lg:h-56 md:w-1/2 lg:w-4/6 border-blue-600 border-dashed border-l-4 Connector relative">
        <span className="absolute bottom-2 text-center w-full text-sm sm:text-2xl">
          {text}
        </span>
      </div>
      <div className="w-2/6 border-b-4 md:w-1/2 lg:w-4/6 border-blue-600 border-dashed Connector"></div>
      <div className="w-2/6 h-10 lg:h-56 md:h-36 md:w-1/2 lg:w-4/6 border-blue-600 border-r-4 border-dashed Connector"></div>
    </div>
  );
};
