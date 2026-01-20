import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "./sanity-utils";
import Image from "next/image";
import ReactPlayer from "react-player";

const portableTextComponents: PortableTextComponents = {
  // block(props) {
  //   console.log(props)
  //   switch (props.node?.style) {
  //     case "h2":
  //       return <h2>{props.children}</h2>
  //     case "text-lg":
  //       return <p className="text-lg">{props.children}</p>
  //     case "text-xl":
  //       return <p className="text-xl">{props.children}</p>
  //     default:
  //       return <p>{props.children}</p>
  //   }
  // },
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    "text-lg": ({ children }) => (
      <p className='text-md md:text-lg'>{children}</p>
    ),
    // align_center: ({ children }) => <p className="text-center">{children}</p>,
  },
  types: {
    // image: ({ value }) => {
    //   console.log(value)
    //   return <img src={urlFor(value.asset)} alt="some image" />
    // },
    textIcon: ({ value }) => {
      return (
        <Image
          src={urlFor(value.icon.asset, 60)}
          alt='icon'
          width={60}
          height={60}
        />
      );
    },
    embed: ({ value }) => {
      const { url } = value;
      if (!url) return null;

      const playerConfig = {
        youtube: {
          playerVars: {
            controls: 1,
            disablekb: 1,
            enablejsapi: 1,
            iv_load_policy: 3,
            modestbranding: 1,
            cc_load_policy: 0,
            showinfo: 0,
            rel: 0,
          },
          embedOptions: {
            host: 'https://www.youtube-nocookie.com',
          },
        },
      };

      return (
        <div className="my-6">
          <ReactPlayer
            url={url}
            config={playerConfig}
            width="100%"
            height="auto"
            controls
          />
        </div>
      );
    },
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a href={value.href} rel={rel}>
          {children}
        </a>
      );
    },
    linkExternal: ({ children, value }) => {
      return (
        <a href={value.href} rel={"noreferrer noopener"} target='_blank'>
          {children}
        </a>
      );
    },
    align_left: ({ children, value }) => (
      <p className='text-left'>{children}</p>
    ),
    align_center: ({ children, value }) => (
      <p className='text-center'>{children}</p>
    ),
    align_right: ({ children, value }) => (
      <p className='text-right'>{children}</p>
    ),
  },
};

export default portableTextComponents;
