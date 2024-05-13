"use client";
import React from "react";
import dynamic from "next/dynamic";
const ModuleTextUI = dynamic(() => import("./ModuleTextUI"), { ssr: false });
const ModuleImageUI = dynamic(() => import("./ModuleImageUI"), { ssr: false });
const ModuleTextImageUI = dynamic(() => import("./ModuleTextImageUI"), {
  ssr: false,
});

import "./index.scss";

const Modules = ({ input }: any) => {
  // console.log(input);
  const _renderModules = () => {
    const _modules = input.map((module: any, i: number) => {
      // console.log(module._type);
      switch (module._type) {
        case "textUI":
          return <ModuleTextUI key={module._key} input={module} />;
        case "imageUI":
          return <ModuleImageUI key={module._key} input={module} />;
        case "textImageUI":
          return <ModuleTextImageUI key={module._key} input={module} />;

        default:
          return null;
      }
    });
    return _modules;
  };

  return <div className='modules flex flex-wrap '>{_renderModules()}</div>;
};

export default Modules;
