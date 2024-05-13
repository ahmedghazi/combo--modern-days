import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
import portableTextComponents from "../utils/portableTextComponents";
import { Settings } from "../types/schema";

type Props = {
  settings: Settings;
};

const Footer = ({ settings }: Props) => {
  return (
    <footer>
      <div className='flex justify-between items-end'>
        <div>
          <Image
            src={`/logo-jouuue-grid.svg`}
            width={154}
            height={136}
            alt={""}
            sizes='100vw'
          />
        </div>
        <div className='text'>
          {settings.footerText && (
            <PortableText
              value={settings.footerText}
              components={portableTextComponents}
            />
          )}
        </div>
        <div>
          <Image
            src={`/logo-editions-grid.svg`}
            width={140}
            height={136}
            alt={""}
            sizes='100vw'
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
