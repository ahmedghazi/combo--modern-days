import React from "react";
import ProductCard from "./ProductCard";
import { TagExtend } from "../types/extend";
import Modules from "./modules";

type Props = {
  input: TagExtend;
};

const ContentTag = ({ input }: Props) => {
  return (
    <div className='content-tag px-md md:px-lg'>
      <h1 className='titraille-sep mb-md'>{input.title}</h1>
      <section className='products mb-lg'>
        <div className='grid md:grid-cols-4 gap-md'>
          {input.products &&
            input.products.map((item, i) => (
              <ProductCard input={item} key={i} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default ContentTag;
