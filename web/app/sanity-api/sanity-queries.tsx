import { groq } from "next-sanity";
import {
  Home,
  Infos,
  Product,
  Publisher,
  Settings,
  Tag,
} from "../types/schema";
import {
  moduleImage,
  moduleText,
  moduleTextImage,
  productCard,
  seo,
} from "./fragments";
import { PublisherExtend, TagExtend } from "../types/extend";
import { sanityFetch } from "./sanity.client";
// import { cache } from "react";

// const clientFetch = cache(client.fetch.bind(client));

/**
 * SETTINGS
 */
export const SETTINGS_QUERY = groq`*[_type == "settings"][0]{
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

    }`;
export async function getSettings(): Promise<Settings> {
  return sanityFetch({
    query: SETTINGS_QUERY,
    tags: ["settings"],
  });
}

/**
 * HOME
 */
export const HOME_QUERY = groq`*[_type == "home"][0]{
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
  return sanityFetch({
    query: HOME_QUERY,
    tags: ["home"],
  });
}

/**
 * Infos
 */

export const INFOS_QUERY = groq`*[_type == "infos"][0]{...,
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
  return sanityFetch({
    query: INFOS_QUERY,
    tags: ["infos"],
  });
}

/**
 * Product
 */
export const PRODUCT_QUERY = groq`*[_type == "product" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },
  preOrderByEmail,
	publisher->{
    title
  },
  imageCover{
    image{
      asset->
    }
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
  return sanityFetch({
    query: PRODUCT_QUERY,
    tags: ["product"],
    qParams: { slug: slug },
  });
}

export const ALL_PRODUCTS_QUERY = groq`*[_type == "product"]{
  ${productCard}
}`;

export async function getAllProducts(): Promise<Product[]> {
  return sanityFetch({
    query: ALL_PRODUCTS_QUERY,
    tags: ["all_products"],
  });
}

/**
 * Publisher
 */
export const PUBLISHER_QUERY = groq`*[_type == "publisher" && slug.current == $slug][0]{
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
  return sanityFetch({
    query: PUBLISHER_QUERY,
    tags: ["publisher"],
    qParams: { slug: slug },
  });
  // return client.fetch(publisherQ, { slug: slug });
}

/**
 * TAGS
 */
export const TAGS_QUERY = groq`*[_type == "tag" ]{
  ...
}`;
export async function getTags(): Promise<Tag[]> {
  return sanityFetch({
    query: TAGS_QUERY,
    tags: ["tags"],
  });
}

/**
 * TAG
 */
export const TAG_QUERY = groq`*[_type == "tag" && slug.current == $slug][0]{
  ...,
  "products": *[
    _type == "product"
    && $slug in tags[]->slug.current
  ] {
    ${productCard}
  }
}`;
export async function getTag(slug: string): Promise<TagExtend> {
  return sanityFetch({
    query: TAG_QUERY,
    tags: ["tag"],
    qParams: { slug: slug },
  });
}
