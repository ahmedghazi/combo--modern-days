import website from "@/app/config/website";
import { SanityReference } from "@/app/types/schema";
import { urlFor } from "@/app/sanity-api/sanity-utils";
import Image from "next/image";
// import React, { useState } from "react";
import { SanityImageAsset } from "sanity-codegen";

type Props = {
  asset: SanityImageAsset | SanityReference<SanityImageAsset> | any;
  width?: number;
  alt?: string | any;
};

const Figure = ({ asset, width = 1000, alt = website.title }: Props) => {
  const src = urlFor(asset, width);

  return (
    <figure
      style={{
        aspectRatio: `${asset?.metadata?.dimensions.width} / ${asset?.metadata?.dimensions.height}`,
        width: "100%",
        height: "auto",
      }}>
      {/* {asset?.metadata?.dimensions.aspectRatio} */}
      {src && (
        <Image
          src={src}
          width={asset?.metadata?.dimensions.width || width}
          height={asset?.metadata?.dimensions.height || width}
          alt={alt || ""}
          sizes='100vw'
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: `${asset?.metadata?.dimensions.width} / ${asset?.metadata?.dimensions.height}`,
            // objectFit: "cover",
          }}
          blurDataURL={asset?.metadata?.lqip}
          placeholder='blur'
          // placeholder={asset?.metadata?.lqip}
          // onError={() => {
          //   setImgSrc(asset.url);
          // }}
        />
      )}
      {/* <div>
        {`${asset?.metadata?.dimensions.width} / ${asset?.metadata?.dimensions.height}`}
      </div> */}
    </figure>
  );
};

export default Figure;
