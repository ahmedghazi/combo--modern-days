import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "../types/schema";
import { _linkResolver } from "../utils/utils";
import Figure from "./ui/Figure";

type Props = {
  input: Product;
};

const ProductCard = ({ input }: Props) => {
  return (
    <article className='product-card'>
      <Link href={_linkResolver(input)}>
        {input.imageCover && (
          <Figure asset={input.imageCover.image?.asset} width={640} />
        )}
        <div className='infos pt-md'>
          <h2>{input.title}</h2>
          <div className='publisher'>({input.publisher?.title})</div>
          <div className='price text-blue'>{input.price}€</div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
