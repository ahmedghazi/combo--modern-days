import React, { useEffect, useState } from "react";
import { Product } from "@/app/types/schema";
import { usePathname } from "next/navigation";

// import { _localizeField, _localizeText } from "@/app/utils/utils";
import { subscribe, unsubscribe } from "pubsub-js";
import clsx from "clsx";
import useShop from "./ShopContext";

type Props = {
  input: Product;
};
type EmptyObj = Record<PropertyKey, never | any>;

const AddToCart = ({ input }: Props) => {
  const { _id, title, price, weight, imageCover } = input;
  const pathname = usePathname();
  const [status, setStatus] = useState("addToCart");

  // const _getVariants = () => {
  //   if (!variants || variants.length === 0) return "";
  //   let itemCustomAttr: EmptyObj = {};
  //   variants.forEach((element, i) => {
  //     if (!element.items) return;
  //     const values = element.items
  //       .map((item, i) => item.title)
  //       .toString()
  //       .split(",")
  //       .join("|");

  //     itemCustomAttr[`data-item-custom${i + 1}-name`] = _localizeField(
  //       element.title
  //     );
  //     itemCustomAttr[`data-item-custom${i + 1}-options`] = values;
  //     if (variant) {
  //       itemCustomAttr[`data-item-custom${i + 1}-value`] = variant.title;
  //     }
  //   });
  //   // console.log(itemCustomAttr);
  //   return itemCustomAttr;
  // };

  // const hasVariants = variants && variants.length > 0;

  return (
    <div className='add-to-cart flex justify-center'>
      {/* {hasVariants &&
        variants.map((item, i) => (
          <VariantsList
            key={i}
            items={item.items}
            title={_localizeField(item.title)}
          />
        ))} */}
      {/* <div>Variant: {variant ? variant.title : "no variant"}</div> */}
      {/* {input.qty === 0 && (
        <button className='notice-soldout cartouche cartouche--accent disabled'>
          SOLD OUT
        </button>
      )} */}
      <button
        className={clsx(
          "snipcart-add-item btn btn--primary btn--lg"
          // hasVariants && !variant ? "disabled" : "",
          // input.qty === 0 && "disabled"
        )}
        data-item-id={_id}
        data-item-price={price}
        data-item-weight={weight}
        data-item-url={pathname}
        data-item-name={title}
        data-item-description={input.information}
        data-item-image={imageCover?.image?.asset.url}
        data-item-taxes={"TVA"}
        // {..._getVariants()}
      >
        <span className='pointer-events-none '>Acheter</span>
      </button>
    </div>
  );
};

export default AddToCart;
