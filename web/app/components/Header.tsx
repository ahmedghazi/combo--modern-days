import Link from "next/link";
import React from "react";
import { Settings } from "../types/schema";
import { _linkResolver } from "../utils/utils";
import Cart from "./shop/Cart";
import Mailchimp from "./ui/Mailchimp";
import Search from "./ui/Search";

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
    </header>
  );
};

export default Header;
