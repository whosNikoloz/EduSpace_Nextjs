import EduSpaceLogo from "@/public/EduSpaceLogo.png";
import Image from "next/image";

export const EduSpace = ({ width = 40, height = 40 }) => (
  <Image
    src={EduSpaceLogo}
    height={height}
    width={width}
    alt="logo"
    priority={true}
  />
);
