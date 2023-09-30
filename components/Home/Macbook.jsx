"use client";

import React, { useEffect } from "react";
import Spline from "@splinetool/react-spline";

export default function Macbook() {
  const splineContainerStyle = {
    position: "relative",
    width: "100%",
    height: "100vh", // Adjust the height as needed for your hero section
    overflow: "hidden", // Hide overflow to disable scroll wheel interaction
  };

  const heroTextStyle = {
    position: "absolute",
    top: "50%", // Adjust the top position to center the text vertically
    left: "50%", // Adjust the left position to center the text horizontally
    transform: "translate(-50%, -50%)", // Center the text within the container
    zIndex: 1, // Ensure the text is above the Spline scene
  };

  // Enable scroll events outside of the Spline container
  useEffect(() => {
    const splineContainer = document.getElementById("spline-container");

    const preventScroll = (e) => {
      const isMouseOverSpline = e.target.closest(".spline-container") !== null;

      if (!isMouseOverSpline) {
        return; // Allow scroll outside of the Spline container
      }

      e.preventDefault();
    };

    splineContainer.addEventListener("wheel", preventScroll);

    return () => {
      splineContainer.removeEventListener("wheel", preventScroll);
    };
  }, []);

  // Add a hover interaction to the Spline scene
  const hoverInteraction = {
    type: "Hover",
    props: {
      color: "#ff0000",
    },
  };

  return (
    <div
      style={splineContainerStyle}
      id="spline-container"
      className="spline-container"
    >
      <div style={heroTextStyle}>
        <h1>Your Hero Text Goes Here</h1>
        <p>Additional content for your hero section</p>
      </div>
      <Spline
        scene="https://draft.spline.design/JWegw6c8ueLBIkWD/scene.splinecode"
        interactions={[hoverInteraction]}
        lock={false}
      />
    </div>
  );
}
