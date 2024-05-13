import createImageUrlBuilder from "@sanity/image-url";
// import { definePreview } from 'next-sanity/preview'
import { sanityConfig } from "./sanity-client";
import {
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
} from "sanity-codegen";
// import { SanityAsset } from "@sanity/image-url/lib/types/types";

const imageBuilder = createImageUrlBuilder(sanityConfig);

type SanityImage = {
  _type: "image";
  assetId: string;
  asset: SanityImageAsset;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
};

export function urlFor(source: SanityImageAsset, maxWidth: number = 2000): any {
  // console.log(source.assetId);
  if (!source) {
    return "https://cdn.sanity.io/images/eqw7qn8w/production/9c8c23dfbc76b2f844ebfa78ea479f1473304871-1080x1350.webp?w=3000&fit=max&auto=format&dpr=2&w=3840&q=75";
  }
  // console.log("here after test");
  //7cbf348a36c255502fdd8b4d2ae93c902e2c2ba8-900x400.png?rect=215,0,378,400&w=2000&fit=max&auto=format&dpr=2
  // if (source.crop) {
  //   // console.log(source);

  //   const crop = source.crop;
  //   const { width, height } = source.asset.metadata?.dimensions;
  //   const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)));

  //   const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)));

  //   // compute the cropped image's position
  //   const left = Math.floor(width * crop.left);
  //   const top = Math.floor(height * crop.top);
  //   // gather into a url
  //   return imageBuilder
  //     ?.image(source.asset)
  //     .rect(left, top, croppedWidth, croppedHeight)
  //     .url();
  // }
  // console.log(source);
  return (
    imageBuilder
      ?.image(source)
      .width(maxWidth)
      // .format("webp")
      .auto("format")
      .fit("max")
      .dpr(2)
      .url()
  );
}

// export const usePreview = definePreview({
//   projectId: sanityConfig.projectId,
//   dataset: sanityConfig.dataset,
// })
