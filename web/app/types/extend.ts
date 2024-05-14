import { Product, Publisher, Tag } from "./schema";

export interface ProductExtend extends Product {
  related: Product[];
}

export interface PublisherExtend extends Publisher {
  products: Product[];
}

export interface TagExtend extends Tag {
  products: Product[];
}
