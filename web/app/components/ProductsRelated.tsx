import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/schema";

type Props = {
  input: Product[];
};

const ProductsRelated = ({ input }: Props) => {
  return (
    <div className='related'>
      <h2 className='titraille-sep mb-md'>Du même éditeur</h2>
      <div className='grid md:grid-cols-4 gap-md'>
        {input && input.map((item, i) => <ProductCard input={item} key={i} />)}
      </div>
    </div>
  );
};

export default ProductsRelated;
