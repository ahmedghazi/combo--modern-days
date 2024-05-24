"use client";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import portableTextComponents from "../utils/portableTextComponents";
import { Settings } from "../types/schema";
import { _linkResolver, getScrollingElement } from "../utils/utils";
import Link from "next/link";

type Props = {
  settings: Settings;
};

const Footer = ({ settings }: Props) => {
  const [perc, setPerc] = useState<number>(0);
  useEffect(() => {
    window.addEventListener("scroll", _handleScroll);
    return () => {
      window.removeEventListener("scroll", _handleScroll);
    };
  }, []);

  const _handleScroll = (evt: Event) => {
    const scroller = getScrollingElement();
    if (!scroller) return;

    const scrollTop =
      (window.pageYOffset || scroller.scrollTop) - (scroller.clientTop || 0);
    const scrollHeight = scroller.scrollHeight - window.innerHeight;
    const _perc = scrollTop / scrollHeight;
    console.log(_perc);
    setPerc(_perc);
  };

  return (
    <footer>
      <nav className='nav-publishers'>
        <ul className='md:flex'>
          {settings.navPublishers?.map((item, i) => (
            <li key={i}>
              <Link href={_linkResolver(item.link)}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='flex justify-between items-end'>
        <div
          className='image--left'
          style={
            {
              "--perc": perc,
            } as React.CSSProperties
          }>
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
        <div
          className='image--right'
          style={
            {
              "--perc": perc,
            } as React.CSSProperties
          }>
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
