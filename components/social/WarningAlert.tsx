import React from "react";

interface WarningAlertProps {
  title: string;
  message: string;
  onCancel: () => void;
  onAgree: () => void;
}

const WarningAlert: React.FC<WarningAlertProps> = ({
  title,
  message,
  onCancel,
  onAgree,
}) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => onCancel()}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg dark:bg-gray-800">
          <div className="py-3 sm:flex">
            <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto">
              <svg
                height="200px"
                width="200px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 473.931 473.931"
                xmlSpace="preserve"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <circle
                    style={{ fill: "#E84849" }}
                    cx="236.966"
                    cy="236.966"
                    r="236.966"
                  ></circle>
                  <path
                    style={{ fill: "#EDC92C" }}
                    d="M409.266,333.9L246.676,71.853c-1.893-3.057-5.231-4.913-8.823-4.913 c-3.596,0-6.933,1.86-8.827,4.913L65.997,334.618c-1.987,3.203-2.088,7.233-0.251,10.526c1.83,3.293,5.31,5.336,9.074,5.336h326.072 h0.045c5.736,0,10.383-4.651,10.383-10.383C411.313,337.772,410.553,335.632,409.266,333.9z"
                  ></path>
                  <path d="M225.819,242.111l-3.371-50.439c-0.632-9.83-0.943-16.887-0.943-21.167c0-5.826,1.527-10.372,4.576-13.635 c3.053-3.274,7.079-4.902,12.06-4.902c6.039,0,10.08,2.088,12.112,6.264c2.032,4.18,3.053,10.204,3.053,18.058 c0,4.636-0.247,9.347-0.733,14.11l-4.531,51.917c-0.49,6.181-1.542,10.918-3.162,14.222c-1.616,3.296-4.288,4.943-8.004,4.943 c-3.794,0-6.425-1.59-7.895-4.789C227.503,253.504,226.448,248.64,225.819,242.111z M237.508,311.401 c-4.284,0-8.026-1.381-11.214-4.153c-3.195-2.769-4.789-6.649-4.789-11.633c0-4.355,1.527-8.06,4.576-11.117 c3.053-3.053,6.795-4.58,11.218-4.58c4.426,0-3.053,4.913-1.579,8.771-4.745,11.581C245.403,309.997,241.721,311.401,237.508,311.401z"></path>
                </g>
              </svg>
            </div>

            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                {title}
              </h4>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-500 dark:text-white">
                {message}
              </p>
              <div className="items-center gap-2 mt-3 sm:flex">
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={() => onAgree()}
                >
                  კი
                </button>
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 dark:text-white"
                  onClick={() => onCancel()}
                >
                  არა
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningAlert;
