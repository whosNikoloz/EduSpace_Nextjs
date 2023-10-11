export const CustomTitle = ({ title1, title2, margin, direct }) => {
  const titleDirectionClass =
    direct === "right"
      ? "text-right mr-28"
      : direct === "left"
      ? "text-left ml-28" 
      : "text-center";
  const svgDirectionStyle =
    direct === "right"
      ? { float: "right", marginRight: "180px" }
      : direct === "left"
      ? { float: "left", marginLeft: "180px" }
      : {};

  return (
    <>
      <header
        className={`text-center mx-auto mb-${margin}`}
      >
        <h2
          className={`text-2xl leading-normal ${titleDirectionClass} mb-2 font-bold text-blue-600 dark:text-gray-100`}
        >
          {direct === "left" && (
            <>
              <span className="font-light ml-50">{title1}</span> {title2}
            </>
          )}
          {direct === "center" && (
            <>
              <span className="font-light">{title1}</span> {title2}
            </>
          )}
          {direct === "right" && (
            <>
              <span className="font-light">{title1}</span> {title2}
            </>
          )}
        </h2>
        <svg
          version="1.1"
          xmlns="http://w3.org/2000/svg"
          xmlnsXlink="http://w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 60"
          style={{ margin: "0 auto", height: "35px", ...svgDirectionStyle }}
          xmlSpace="preserve"
        >
          <circle
            cx="50.1"
            cy="30.4"
            r="5"
            className="stroke-primary"
            style={{
              fill: "transparent",
              strokeWidth: 2,
              strokeMiterlimit: 10,
            }}
          ></circle>
          <line
            x1="55.1"
            y1="30.4"
            x2="100"
            y2="30.4"
            className="stroke-primary"
            style={{ strokeWidth: 2, strokeMiterlimit: 10 }}
          ></line>
          <line
            x1="45.1"
            y1="30.4"
            x2="0"
            y2="30.4"
            className="stroke-primary"
            style={{ strokeWidth: 2, strokeMiterlimit: 10 }}
          ></line>
        </svg>
      </header>
    </>
  );
};
