"use client";
import React, { useEffect, useState } from "react";
import Figure from "./ui/Figure";
import { PortableText } from "next-sanity";
import Image from "next/image";
import ProductsRelated from "./ProductsRelated";
import Slider from "./ui/slick-slider";
import { subscribe, unsubscribe } from "pubsub-js";
import { Product } from "../types/schema";
import { urlFor } from "../utils/sanity-utils";
import portableTextComponents from "../utils/portableTextComponents";
import { ProductExtend } from "../types/extend";
import AddToCart from "./shop/AddToCart";

type Props = {
  input: ProductExtend;
};

const ContentProduct = ({ input }: Props) => {
  const [slideIndex, setSlideIndex] = useState<number>(1);

  useEffect(() => {
    const token = subscribe("SLIDER_CHANGE", (e, d) => {
      console.log(d);
      setSlideIndex(d);
    });

    return () => {
      unsubscribe(token);
    };
  }, []);

  const slides = ["/hero.png", "/livre2.jpg"];
  console.log(input);
  return (
    <article className='content-product'>
      <div className='hero-slider'>
        <Slider settingsOverride={{}}>
          {input.images &&
            input.images.map((item, i) => (
              <div className='slide' key={i}>
                {item.image?.asset && (
                  <Image
                    src={urlFor(item.image?.asset)}
                    width={1440}
                    height={809}
                    alt={""}
                    sizes='100vw'
                  />
                )}
              </div>
            ))}
        </Slider>
      </div>
      <div className='header'>
        <div className='grid md:grid-cols-3'>
          <div className='slider-pager'>
            {input.images && (
              <span>
                Image {slideIndex}/{input.images.length}
              </span>
            )}
          </div>
          <h1 className='text-lg'>
            {input.title} ({input.publisher?.title})
          </h1>
          <div className='price text-blue'>{input.price}€</div>
        </div>
        <div className='atc-wrapper'>
          {/* <button
            className='snipcart-add-item btn btn--primary btn--lg'
            data-item-id='39623800-e6d2-4384-a577-921afab868ec'
            data-item-price='35'
            data-item-weight='100'
            data-item-url='/product/5'
            data-item-name='5'
            data-item-description='Softcover - 2023 - 64 pages -  24 x 17 cm'
            data-item-image='https://cdn.sanity.io/images/eqw7qn8w/production/11674a4cd03ba5dbf4325eaa7414ff9f24ca8e0a-1200x1409.jpg'
            data-item-taxes='TVA Livres'>
            <span className='pointer-events-none '>Acheter</span>
          </button> */}
          <AddToCart input={input} />
        </div>
      </div>
      <div className='body'>
        <div className='grid md:grid-cols-2 gap-md'>
          <div className=' grid grid-cols-6'>
            <div className='col-span-2 label'>Description</div>
            <div className='col-span-4'>
              <div className='text'>
                {input.description && (
                  <PortableText
                    value={input.description}
                    components={portableTextComponents}
                  />
                )}
              </div>
            </div>
          </div>

          <div className='col-infos'>
            <div className='infos'>
              <div className='flex justify-between mb-lg'>
                <div className='w-4/6 '>
                  <div className='text text-md'>
                    {/* {input.information && (
                      <PortableText
                        value={input.information}
                        components={portableTextComponents}
                      />
                    )} */}
                    {input.information}
                  </div>
                </div>
                <div className='label'>Informations</div>
              </div>
              <div className='flex justify-between'>
                <div className='w-4/6 '>
                  <div className='text'>
                    {input.contributors && (
                      <PortableText
                        value={input.contributors}
                        components={portableTextComponents}
                      />
                    )}
                  </div>
                </div>
                <div className='label'>Contributeurs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {input.related && <ProductsRelated input={input.related} />}
      {/* <PortableText value={_localizeField(input.text)} /> */}
    </article>
  );
};

export default ContentProduct;
