import clsx from "clsx";
import React, { ReactNode } from "react";
import SlickSlider from "./slick-slider/index";

type Props = {
  children: ReactNode;
};

const Slider = ({ children }: Props) => {
  return (
    <div className='slider'>
      <SlickSlider settingsOverride={{}}>{children}</SlickSlider>
    </div>
  );
};

export default Slider;
