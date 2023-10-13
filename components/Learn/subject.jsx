import { useRef, useState } from "react";

const Subject = (props) => {
  const containerRefs = useRef([]);
  const [containerStates, setContainerStates] = useState(
    props.subjectList.containers.map(() => false)
  );

  const handleToggleContainer = (index) => {
    const newContainerStates = [...containerStates];
    newContainerStates[index] = !newContainerStates[index];
    setContainerStates(newContainerStates);
  };

  return (
    <div className="space-y-3 mt-5 overflow-hidden" key={props.idx}>
      <h4
        className="cursor-pointer pb-5 flex items-center justify-between text-lg text-white font-medium"
        onClick={() => handleToggleContainer(props.idx)}
      >
        {props.subjectList.q}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-white ml-2 transform transition-transform ${
            containerStates[props.idx] ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </h4>
      {props.subjectList.containers.map((container, index) => (
        <div
          key={index}
          className="duration-300"
          style={
            containerStates[props.idx]
              ? { height: "auto" }
              : { height: "0px", overflow: "hidden" }
          }
        >
          <div className=" container mx-auto px-4 border rounded-md">
            <p className="text-white">{container}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default () => {
  const subjectList = [
    {
      q: "What are some random questions to ask?",
      containers: [
        "1",
        "2",
        // Add more containers as needed
      ],
    },
    {
      q: "Do you include common questions?",
      containers: [
        "2",
        "2",
        // Add more containers as needed
      ],
    },
    {
      q: "Subject",
      containers: [
        "2",
        "2",
        // Add more containers as needed
      ],
    },
    {
      q: "Subject",
      containers: [
        "2",
        "2",
        // Add more containers as needed
      ],
    },
    // Add more questions with containers
  ];

  return (
    <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
      <div className="mt-14 max-w-2xl mx-auto">
        {subjectList.map((item, idx) => (
          <Subject idx={idx} subjectList={item} />
        ))}
      </div>
    </section>
  );
};
