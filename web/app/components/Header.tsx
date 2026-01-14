"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Settings } from "../types/schema";
import { _linkResolver, getScrollingElement } from "../sanity-api/utils";
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
  const [direction, setDirection] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    _onScroll();
    window.addEventListener("scroll", _onScroll);

    return () => {
      window.removeEventListener("scroll", _onScroll);
    };
  }, []);

  const _onScroll = () => {
    const scroller = getScrollingElement();
    if (!scroller) return;

    const scrollTop =
      (window.pageYOffset || scroller.scrollTop) - (scroller.clientTop || 0);
    const lastscrollTop = scroller.dataset.lastscrollTop || 0;

    if (scrollTop === 0) {
      setDirection("");
      return;
    }
    if (lastscrollTop) {
      const direction =
        parseFloat(lastscrollTop) > scrollTop ? "scroll--up" : "scroll--down";
      setDirection(direction);
    }
  };

  const _isCurrent = (url: string) => {
    return url === pathname ? "is-current" : "";
  };

  const _isPublisherAndNotCurrent = (url: string) => {
    //&& !_isCurrent(url)
    return url.includes("publisher") ? "text-gray" : "";
  };

  return (
    <header className={direction}>
      <div className='header-mobile'>
        <div className='flex justify-between '>
          <button onClick={() => setOpen(!open)}>
            <span>{open ? "Fermer" : "Menu"}</span>
          </button>
          {settings.displayShop && <Cart />}
        </div>
        <div className={clsx("overlay", open && "is-open")}>
          <nav id='nav-primary'>
            <ul className='md:flex justify-between'>
              {settings &&
                settings.navPrimary &&
                settings.navPrimary?.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={_linkResolver(item.link)}
                      className={clsx(_isCurrent(_linkResolver(item.link)))}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Search />
              </li>
              {settings && settings.newsletterUrl && (
                <li>
                  <Mailchimp
                    action={settings.newsletterUrl}
                    field={{
                      name: "EMAIL",
                      placeholder: "NEWSLETTER",
                      type: "email",
                      required: true,
                    }}
                  />
                </li>
              )}
            </ul>
          </nav>
          <nav className='nav-publishers'>
            <ul className='md:flex'>
              {settings &&
                settings.displayShop &&
                settings.navPublishers?.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={_linkResolver(item.link)}
                      className={clsx(
                        _isCurrent(_linkResolver(item.link)),
                        _isPublisherAndNotCurrent(_linkResolver(item.link))
                      )}>
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className='header-desktop'>
        <nav id='nav-primary'>
          <ul className='flex justify-between'>
            {settings &&
              settings.navPrimary?.map((item, i) => (
                <li key={i}>
                  <Link
                    href={_linkResolver(item.link)}
                    className={_isCurrent(_linkResolver(item.link))}>
                    {item.label}
                  </Link>
                </li>
              ))}
            <li>
              <Search />
            </li>
            {settings && settings.newsletterUrl && (
              <li>
                <Mailchimp
                  action={settings.newsletterUrl}
                  field={{
                    name: "EMAIL",
                    placeholder: "NEWSLETTER",
                    type: "email",
                    required: true,
                  }}
                />
              </li>
            )}
            {settings.displayShop && (
              <li>
                <Cart />
              </li>
            )}
          </ul>
        </nav>
        <nav className='nav-publishers'>
          <ul className='flex'>
            {settings &&
              settings.displayShop &&
              settings.navPublishers?.map((item, i) => (
                <li key={i}>
                  <Link
                    href={_linkResolver(item.link)}
                    className={clsx(
                      _isCurrent(_linkResolver(item.link)),
                      _isPublisherAndNotCurrent(_linkResolver(item.link))
                    )}>
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
