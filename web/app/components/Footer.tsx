"use client";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import portableTextComponents from "../sanity-api/portableTextComponents";
import { Settings } from "../types/schema";
import { _linkResolver, getScrollingElement } from "../sanity-api/utils";
import Link from "next/link";

type Props = {
  settings: Settings;
};

const Footer = ({ settings }: Props) => {
  return (
    <footer>
      {/* <nav className='nav-publishers mb-md'>
        <ul className='flex'>
          {settings &&
            settings.navPublishers?.map((item, i) => (
              <li key={i}>
                <Link href={_linkResolver(item.link)}>{item.label}</Link>
              </li>
            ))}
        </ul>
      </nav> */}
      <div className='row'>
        <div className='col-md-4 col-xs-12'>
          <div className='text '>
            {settings && settings.footerText && (
              <PortableText
                value={settings.footerText}
                components={portableTextComponents}
              />
            )}
          </div>
        </div>
        <div className='col-md-4 col-xs-12'>
          <div
            className='image--center  '
            style={
              {
                // "--perc": perc,
              } as React.CSSProperties
            }>
            <Image
              src={`/logo-modern-days.svg`}
              width={259.49}
              height={95.4}
              alt={"logo modern days"}
              sizes='100vw'
            />
          </div>
        </div>
        <div className='col-md-4 col-xs-12'>
          <div className='text  md:text-right  '>
            {settings && settings.footerTextCarteDeVisite && (
              <PortableText
                value={settings.footerTextCarteDeVisite}
                components={portableTextComponents}
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
