import React from "react";
import ProductCard from "./ProductCard";
import { Publisher } from "../types/schema";
import { PublisherExtend } from "../types/extend";
import Modules from "./modules";

type Props = {
  input: PublisherExtend;
};

const ContentPublisher = ({ input }: Props) => {
  return (
    <div className='content-publisher px-md md:px-lg'>
      <section className='products mb-lg'>
        <div className='grid md:grid-cols-4 gap-md'>
          {input.products &&
            input.products.map((item, i) => (
              <ProductCard input={item} key={i} />
            ))}
        </div>
      </section>
      <h1 className='titraille-sep mb-md'>{input.title}</h1>
      <div className='body'>
        {input.modules && <Modules input={input.modules} />}
      </div>
    </div>
  );
};

export default ContentPublisher;
