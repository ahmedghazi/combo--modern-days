"use client";
import React, { useState } from "react";
import { Infos } from "../types/schema";
import Modules from "./modules";

type Props = {
  input: Infos;
};

const ContentInfos = ({ input }: Props) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const tabBody = input.modules ? input.modules[currentTab] : null;
  return (
    <div className='content-infos px-lg'>
      <nav className='nav-infos'>
        <ul className=''>
          {input.modules &&
            input.modules.map((item, i) => (
              <li key={item._key}>
                <button onClick={() => setCurrentTab(i)}>{item.title}</button>
              </li>
            ))}
        </ul>
      </nav>
      <div className='body py-md'>
        {tabBody && <Modules input={tabBody.items} />}
      </div>
    </div>
  );
};

export default ContentInfos;
