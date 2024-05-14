"use client";
import React, { useEffect, useState } from "react";
import { _linkResolver } from "@/app/utils/utils";
import { usePathname } from "next/navigation";
import { Product, Publisher } from "@/app/types/schema";
import Link from "next/link";

import Figure from "./Figure";
import clsx from "clsx";
import Logo from "../Logo";

const variants = {
  active: { opacity: 1, y: 0 },
  inActive: { opacity: 1, y: "-100%" },
};

const transition = {
  ease: [0.775, 0, 0.17, 1.005],
  duration: 0.4,
};

type SearchResultItemProps = {
  input: Product | Publisher | any;
};

const SearchResultItem = ({ input }: SearchResultItemProps) => (
  <div className='tr mb-md text-md'>
    <Link href={_linkResolver(input)}>
      <div className='grid md:grid-cols-6'>
        <div className='col-span-2'>{input.title}</div>
        <div className='url col-span-3 text-sm-'>{_linkResolver(input)}</div>

        <div className='image col-span-1 hidden-sm '>
          {input.imageCover && (
            <Figure
              asset={input.imageCover.image.asset}
              alt={input.title}
              width={50}
            />
          )}
        </div>
      </div>
    </Link>
  </div>
);

type Props = {};
const Search = (props: Props) => {
  const [term, setTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Array<any>>([]);
  // const { searchResult, setSearchResult } = usePageContext();
  const pathname = usePathname();

  const getButtonMsg = () => {
    switch (status) {
      case "searching":
        return "...";

      case "error":
        return "ERROR";
      default:
        return "OK";
    }
  };

  // reset
  useEffect(() => {
    setTerm("");
    setSearchResult([]);
    setStatus("");
    setOpen(false);
    // if (setSearchResult) {
    //   setSearchResult([]);
    //   setStatus("");
    // }
  }, [pathname]);

  const _handleSearch = async () => {
    const body = { s: term };
    // console.log(body);
    // return;
    setStatus("searching");
    document.body.classList.add("is-fetching");
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data);
      // if (setSearchResult)
      setSearchResult(data);
      document.body.classList.remove("is-fetching");
      setStatus("");
      setOpen(true);
    } catch (error: any) {
      console.log(error);
      setStatus("error");
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setTerm(event.target?.value);
    } else {
      setTerm("");
      // if (setSearchResult)
      setSearchResult([]);
    }
  };

  const _handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.length > 0) {
      _handleSearch();
    }
  };

  return (
    <div className={clsx("search", open ? "is-open" : "")}>
      <form className='search' onSubmit={_handleSubmit}>
        <div className='form '>
          <input
            type='search'
            placeholder={"RECHERCHER"}
            name='term'
            // onChange={changeHandler}
            onInput={changeHandler}
            value={term}
            id='s'
            className='flex-2'
          />
          {term !== "" && (
            <button
              disabled={status === "searching" || status === "success"}
              type='submit'
              aria-label='submit'
              className={""}>
              <span>{getButtonMsg()}</span>
            </button>
          )}
        </div>
      </form>

      {searchResult && searchResult.length > 0 && open && (
        <div className='search--modal'>
          <button className='btn-close text-lg' onClick={() => setOpen(false)}>
            ×
          </button>
          <div className='inner'>
            {/* <div className='header'>
              <div className='h-lg'></div>
              <div className='grid md:grid-cols-10 gap-md'>
                <div className="'col col-span-2 md:col-start-5 flex justify-center"></div>
              </div>
            </div> */}
            <div className='body'>
              <div className='list'>
                {searchResult.map((item, i) => (
                  <SearchResultItem input={item} key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
