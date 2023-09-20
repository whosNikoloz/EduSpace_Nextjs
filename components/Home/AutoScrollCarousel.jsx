"use client";

import React, { useEffect } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/react-splide/css/core";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import image1 from "@/public/next.svg";
import image2 from "@/public/log.svg";
import image3 from "@/public/register.svg";
import Image from "next/image";
import { Card, CardFooter, Button, CardBody } from "@nextui-org/react";

const AutoScrollCarousel = () => {
  useEffect(() => {
    const splide = new Splide(".splide", {
      type: "loop",
      drag: "free",
      gap: "1rem",
      focus: "center",
      perPage: 3,
      arrows: false,
      autoScroll: {
        speed: 1,
      },
    });

    // Mount the Splide instance.
    splide.mount({ AutoScroll });

    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <div className="splide">
      <div className="splide__track">
        <ul className="splide__list">
          <li className="splide__slide">
            <div className="slide-content">
              <Card shadow="sm">
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt="item"
                    className="w-full object-cover h-[140px]"
                    src={image2}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>"item"</b>
                  <p className="text-default-500">"item"</p>
                </CardFooter>
              </Card>
            </div>
          </li>
          <li className="splide__slide">
            <div className="slide-content">
              <Card shadow="sm">
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt="item"
                    className="w-full object-cover h-[140px]"
                    src={image2}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>"item"</b>
                  <p className="text-default-500">"item"</p>
                </CardFooter>
              </Card>
            </div>
          </li>
          <li className="splide__slide">
            <div className="slide-content">
              <Card shadow="sm">
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt="item"
                    className="w-full object-cover h-[140px]"
                    src={image2}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>"item"</b>
                  <p className="text-default-500">"item"</p>
                </CardFooter>
              </Card>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
