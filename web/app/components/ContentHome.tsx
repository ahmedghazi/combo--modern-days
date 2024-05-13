import React from "react";
import { Home } from "../types/schema";
import Image from "next/image";
import ProductCard from "./ProductCard";
import Slider from "./ui/slick-slider";
import Figure from "./ui/Figure";
import { urlFor } from "../utils/sanity-utils";

type Props = {
  input: Home;
};

const ContentHome = ({ input }: Props) => {
  return (
    <div className='content-home'>
      <section className='hero-slider'>
        <Slider settingsOverride={{}}>
          {input.slider?.map((iten, i) => (
            <div className='slide w-screen bg-black' key={i}>
              {iten.image && (
                <Image
                  src={urlFor(iten.image.asset)}
                  width={1440}
                  height={809}
                  alt={""}
                  sizes='100vw'
                  style={{
                    width: "100vw",
                    height: "calc(var(--vh) * 100 - var(--header-height))",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>
          ))}
        </Slider>
      </section>
      <section className='products p-lg'>
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

export default ContentHome;
