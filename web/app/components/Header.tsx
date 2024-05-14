"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Settings } from "../types/schema";
import { _linkResolver } from "../utils/utils";
import Cart from "./shop/Cart";
import Mailchimp from "./ui/Mailchimp";
import Search from "./ui/Search";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type Props = {
  settings: Settings;
};

const Header = ({ settings }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header>
      <div className='header-mobile'>
        <div className='flex justify-between '>
          <button onClick={() => setOpen(!open)}>
            <span>{open ? "Fermer" : "Menu"}</span>
          </button>
          <Cart />
        </div>
        <div className={clsx("overlay", open && "is-open")}>
          <nav id='nav-primary'>
            <ul className='md:flex justify-between'>
              {settings.navPrimary?.map((item, i) => (
                <li key={i}>
                  <Link href={_linkResolver(item.link)}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Search />
              </li>
              <li>
                <Mailchimp
                  action='https://club.us11.list-manage.com/subscribe/post?u=7ec729474c5f3671662bdeda0&id=5530cd0b9b&f_id=00fdafe0f0&tags=123'
                  field={{
                    name: "EMAIL",
                    placeholder: "NEWSLETTER",
                    type: "email",
                    required: true,
                  }}
                />
              </li>
            </ul>
          </nav>
          <nav id='nav-publishers'>
            <ul className='md:flex'>
              {settings.navPublishers?.map((item, i) => (
                <li key={i}>
                  <Link href={_linkResolver(item.link)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className='header-desktop'>
        <nav id='nav-primary'>
          <ul className='flex justify-between'>
            {settings.navPrimary?.map((item, i) => (
              <li key={i}>
                <Link href={_linkResolver(item.link)}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Search />
            </li>
            <li>
              <Mailchimp
                action='https://club.us11.list-manage.com/subscribe/post?u=7ec729474c5f3671662bdeda0&id=5530cd0b9b&f_id=00fdafe0f0&tags=123'
                field={{
                  name: "EMAIL",
                  placeholder: "NEWSLETTER",
                  type: "email",
                  required: true,
                }}
              />
            </li>
            <li>
              <Cart />
            </li>
          </ul>
        </nav>
        <nav id='nav-publishers'>
          <ul className='flex'>
            {settings.navPublishers?.map((item, i) => (
              <li key={i}>
                <Link href={_linkResolver(item.link)}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
