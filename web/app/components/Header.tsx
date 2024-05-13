import Link from "next/link";
import React from "react";
import { Settings } from "../types/schema";
import { _linkResolver } from "../utils/utils";
import Cart from "./shop/Cart";

type Props = {
  settings: Settings;
};

const Header = ({ settings }: Props) => {
  return (
    <header>
      <nav id='nav-primary'>
        <ul className='flex justify-between'>
          {settings.navPrimary?.map((item, i) => (
            <li key={i}>
              <Link href={_linkResolver(item.link)}>{item.label}</Link>
            </li>
          ))}
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
    </header>
  );
};

export default Header;
