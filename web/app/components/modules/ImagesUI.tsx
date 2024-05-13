import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { _localizeField } from "@/app/utils/utils";
import { ModuleImages } from "@/app/types/schema";
import portableTextComponents from "@/app/utils/portableTextComponents";
import { PortableText } from "@portabletext/react";

type Props = {
  input: ModuleImages;
};

const ImageUI = ({ input }: Props): JSX.Element => {
  return (
    <section className={clsx("module module--images mb-xl")}>
      <div className='row'>
        {/* <pre>{JSON.stringify(input, null, 2)}</pre> */}
        {input.images &&
          input.images.map((item, i) => (
            <div
              key={i}
              className={clsx(
                "mb-md md:mb-0",
                `col-md-${item.width || 6} col-md-offset-${
                  item.offset || 0
                } col-xs-${item.width || 6}`,
                "col-xs-12 col-xs-offset-0"
              )}>
              {item.image && (
                <Image
                  src={item.image.asset.url}
                  width={item?.image.asset.metadata?.dimensions.width}
                  height={item?.image.asset.metadata?.dimensions.height}
                  alt={"alt"}
                  sizes='100vw'
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  blurDataURL={item?.image.asset.metadata?.lqip} //automatically provided
                  placeholder='blur' // Optional blur-up while loading
                />
              )}
              {item.image && item.caption && (
                <figcaption className='text-xs md:text-sm text-right py-xs text-muted'>
                  <PortableText
                    value={_localizeField(item.caption)}
                    components={portableTextComponents}
                  />
                </figcaption>
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default ImageUI;
