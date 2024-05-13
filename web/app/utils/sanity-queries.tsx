import { groq } from "next-sanity";
import { client } from "./sanity-client";
import { Home, Infos, Product, Publisher, Settings } from "../types/schema";
import {
  moduleImage,
  moduleText,
  moduleTextImage,
  productCard,
  seo,
} from "./fragments";
import { PublisherExtend } from "../types/extend";
// import { cache } from "react";

// const clientFetch = cache(client.fetch.bind(client));

/**
 * SETTINGS
 */
export async function getSettings(): Promise<Settings> {
  return client.fetch(
    groq`*[_type == "settings"][0]{
      ...,

      navPrimary[]{
        ...,
        _type == 'linkInternal' => {
          ...,
          link->{
            _type,
            slug
          }
        }
      },
      navPublishers[]{
        ...,
        _type == 'linkInternal' => {
          ...,
          link->{
            _type,
            slug
          }
        }
      }

    }`
  );
}

/**
 * HOME
 */
export const homeQ = groq`*[_type == "home"][0]{
  ...,
  seo{
    ${seo}
  },
  slider[]{
    ...,
    image{
      asset->
    }
  },
  products[]->{
    ${productCard}
  },

}`;

export async function getHome(): Promise<Home> {
  return client.fetch(homeQ, {});
}

/**
 * Infos
 */

export const infosQ = groq`*[_type == "infos"][0]{...,
  ...,
  seo{
    ${seo}
  },

  modules[]{
    ...,
    items[]{
      ...,
      ${moduleText},
      ${moduleImage},
      ${moduleTextImage}
    }
  }
}`;
export async function getInfos(): Promise<Infos> {
  return client.fetch(infosQ, {});
}

/**
 * Product
 */
export const productQ = groq`*[_type == "product" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },
	publisher->{
    title
  },
  images[]{
    image{
      ...,
      asset->
    }
  },
  "related": *[
    _type == "product"
    && publisher->slug.current == ^.publisher->slug.current
  ] {
    ${productCard}
  }
}`;

export async function getProduct(slug: string): Promise<Product> {
  return client.fetch(productQ, { slug: slug });
}

/**
 * Publisher
 */
export const publisherQ = groq`*[_type == "publisher" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },
  modules[]{
    ...,
    ${moduleText},
    ${moduleImage},
    ${moduleTextImage}
  },
  "products": *[
    _type == "product"
    && publisher->slug.current == ^.slug.current
  ] {
    ${productCard}
  }
}`;

export async function getPublisher(slug: string): Promise<PublisherExtend> {
  return client.fetch(publisherQ, { slug: slug });
}
