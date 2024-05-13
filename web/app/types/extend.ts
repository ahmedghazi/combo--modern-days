import { Product, Publisher } from "./schema";

export interface ProductExtend extends Product {
  related: Product[];
}

export interface PublisherExtend extends Publisher {
  products: Product[];
}
