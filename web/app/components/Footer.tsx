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
  // const [perc, setPerc] = useState<number>(0);
  // useEffect(() => {
  //   window.addEventListener("scroll", _handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", _handleScroll);
  //   };
  // }, []);

  // const _handleScroll = (evt: Event) => {
  //   const scroller = getScrollingElement();
  //   if (!scroller) return;

  //   const scrollTop =
  //     (window.pageYOffset || scroller.scrollTop) - (scroller.clientTop || 0);
  //   const scrollHeight = scroller.scrollHeight - window.innerHeight;
  //   const _perc = scrollTop / scrollHeight;
  //   console.log(_perc);
  //   setPerc(_perc);
  // };

  return (
    <footer>
      <nav className='nav-publishers mb-md'>
        <ul className='flex'>
          {settings.navPublishers?.map((item, i) => (
            <li key={i}>
              <Link href={_linkResolver(item.link)}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='row'>
        <div className='col-md-4 col-xs-12'>
          <div className='text '>
            {settings.footerText && (
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
              src={`/logo-combo-editions.svg`}
              width={207}
              height={112}
              alt={""}
              sizes='100vw'
            />
          </div>
        </div>
        <div className='col-md-4 col-xs-12'>
          <div className='text  md:text-right  '>
            {settings.footerTextCarteDeVisite && (
              <PortableText
                value={settings.footerTextCarteDeVisite}
                components={portableTextComponents}
              />
            )}
          </div>
        </div>
      </div>
      {/* <div className='flex justify-between md:items-end'>
        <div className='text '>
          {settings.footerText && (
            <PortableText
              value={settings.footerText}
              components={portableTextComponents}
            />
          )}
        </div>
        <div
          className='image--center  '
          style={
            {
              "--perc": perc,
            } as React.CSSProperties
          }>
          <Image
            src={`/logo-combo-editions.svg`}
            width={207}
            height={112}
            alt={""}
            sizes='100vw'
          />
        </div>
        <div className='text  md:text-right  '>
          {settings.footerTextCarteDeVisite && (
            <PortableText
              value={settings.footerTextCarteDeVisite}
              components={portableTextComponents}
            />
          )}
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
