import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Home
 *
 *
 */
export interface Home extends SanityDocument {
  _type: "home";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Titre — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   * Click on generate, Semantic URL based on title (no space no char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Slider — `array`
   *
   *
   */
  slider?: Array<SanityKeyed<Figure>>;

  /**
   * about — `blockContent`
   *
   *
   */
  about?: BlockContent;

  /**
   * products — `array`
   *
   *
   */
  products?: Array<SanityKeyedReference<Product>>;
}

/**
 * Infos
 *
 *
 */
export interface Infos extends SanityDocument {
  _type: "infos";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   * ne pas éditer
   */
  slug?: { _type: "slug"; current: string };

  /**
   * modules — `array`
   *
   *
   */
  modules?: Array<SanityKeyed<ModulesGroup>>;

  /**
   * label à propos — `string`
   *
   *
   */
  titleAbout?: string;

  /**
   * Modules À propos — `array`
   *
   * Zone de contenu Modulaire (image, texte, embed)
   */
  modulesAbout?: Array<
    SanityKeyed<ImageUI> | SanityKeyed<TextUI> | SanityKeyed<TextImageUI>
  >;

  /**
   * label contact — `string`
   *
   *
   */
  titleContact?: string;

  /**
   * ModulesContact — `array`
   *
   * Zone de contenu Modulaire (image, texte, embed)
   */
  modulesContact?: Array<
    SanityKeyed<ImageUI> | SanityKeyed<TextUI> | SanityKeyed<TextImageUI>
  >;
}

/**
 * Réglages (header, footer, ...)
 *
 *
 */
export interface Settings extends SanityDocument {
  _type: "settings";

  /**
   * Nom du site — `string`
   *
   *
   */
  siteName?: string;

  /**
   * Afficher le shop — `boolean`
   *
   *
   */
  displayShop?: boolean;

  /**
   * Logo — `image`
   *
   *
   */
  logo?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Naviguation Primary — `array`
   *
   *
   */
  navPrimary?: Array<SanityKeyed<LinkInternal> | SanityKeyed<LinkExternal>>;

  /**
   * Naviguation Publishers — `array`
   *
   *
   */
  navPublishers?: Array<SanityKeyed<LinkInternal>>;

  /**
   * newsletterUrl — `string`
   *
   *
   */
  newsletterUrl?: string;

  /**
   * footerText — `blockContent`
   *
   *
   */
  footerText?: BlockContent;

  /**
   * footerTextCarteDeVisite — `blockContent`
   *
   *
   */
  footerTextCarteDeVisite?: BlockContent;

  /**
   * Page de mentions légales — `linkInternal`
   *
   *
   */
  legalsUrl?: LinkInternal;

  /**
   * Message 404 — `blockContent`
   *
   *
   */
  message404?: BlockContent;

  /**
   * customCss — `text`
   *
   *
   */
  customCss?: string;
}

/**
 * Tag
 *
 *
 */
export interface Tag extends SanityDocument {
  _type: "tag";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   * Click on generate, Semantic URL based on title (no space no char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };
}

/**
 * product
 *
 *
 */
export interface Product extends SanityDocument {
  _type: "product";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * preOrderByEmail — `boolean`
   *
   * Activer la précommande par email, remplace le comportement snipcart
   */
  preOrderByEmail?: boolean;

  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   * Click on generate, Semantic URL based on title (no space no char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * imageCover — `figure`
   *
   *
   */
  imageCover?: Figure;

  /**
   * images — `array`
   *
   * slider
   */
  images?: Array<SanityKeyed<Figure>>;

  /**
   * publisher — `reference`
   *
   *
   */
  publisher?: SanityReference<Publisher>;

  /**
   * tags — `array`
   *
   *
   */
  tags?: Array<SanityKeyedReference<Tag>>;

  /**
   * SKU — `string`
   *
   * default sku if no variants
   */
  sku?: string;

  /**
   * price — `number`
   *
   *
   */
  price?: number;

  /**
   * Prix barré (optionnel) — `number`
   *
   *
   */
  priceCrossed?: number;

  /**
   * weight — `number`
   *
   *
   */
  weight?: number;

  /**
   * productCategory — `reference`
   *
   *
   */
  productCategory?: SanityReference<Tag>;

  /**
   * description — `blockContent`
   *
   *
   */
  description?: BlockContent;

  /**
   * information — `text`
   *
   *
   */
  information?: string;

  /**
   * contributors — `blockContent`
   *
   *
   */
  contributors?: BlockContent;
}

/**
 * Publisher
 *
 *
 */
export interface Publisher extends SanityDocument {
  _type: "publisher";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   * Click on generate, Semantic URL based on title (no space no char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Modules — `array`
   *
   * Zone de contenu Modulaire (image, texte, embed)
   */
  modules?: Array<
    SanityKeyed<ImageUI> | SanityKeyed<TextUI> | SanityKeyed<TextImageUI>
  >;
}

export type BlockContent = Array<
  SanityKeyed<SanityBlock> | SanityKeyed<Figure>
>;

export type LinkExternal = {
  _type: "linkExternal";
  /**
   * Label — `string`
   *
   *
   */
  label?: string;

  /**
   * Link — `string`
   *
   *
   */
  link?: string;
};

export type LinkInternal = {
  _type: "linkInternal";
  /**
   * label — `string`
   *
   *
   */
  label?: string;

  /**
   * link — `reference`
   *
   *
   */
  link?: SanityReference<Home | Product | Publisher | Infos>;
};

export type Seo = {
  _type: "seo";
  /**
   * Meta title — `string`
   *
   *
   */
  metaTitle?: string;

  /**
   * Meta description — `string`
   *
   *
   */
  metaDescription?: string;

  /**
   * Meta image — `image`
   *
   *
   */
  metaImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type Figure = {
  _type: "figure";
  /**
   * Image — `image`
   *
   * jpg, 1400px de large, 72dpi
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alt Description — `string`
     *
     *
     */
    alt?: string;
  };

  /**
   * Caption — `string`
   *
   *
   */
  caption?: string;
};

export type KeyVal = {
  _type: "keyVal";
  /**
   * Clef — `string`
   *
   *
   */
  key?: string;

  /**
   * Valeur — `blockContent`
   *
   *
   */
  val?: BlockContent;
};

export type Variant = {
  _type: "variant";
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * sku — `string`
   *
   *
   */
  sku?: string;

  /**
   * price — `number`
   *
   *
   */
  price?: number;

  /**
   * stock — `number`
   *
   *
   */
  stock?: number;

  /**
   * images — `array`
   *
   *
   */
  images?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;

  /**
   * size — `string`
   *
   *
   */
  size?: "XS" | "S" | "M" | "L" | "XL" | "XXL";

  /**
   * color — `string`
   *
   *
   */
  color?: "Red" | "Blue" | "Green" | "Yellow" | "Black" | "White";
};

export type ModulesGroup = {
  _type: "modulesGroup";
  /**
   * Title — `string`
   *
   * Title
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<
    SanityKeyed<ImageUI> | SanityKeyed<TextUI> | SanityKeyed<TextImageUI>
  >;
};

export type ImageUI = {
  _type: "imageUI";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alt Text — `string`
     *
     *
     */
    alt?: string;
  };

  /**
   * width — `number`
   *
   * Size in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com
   */
  width?: number;

  /**
   * Offset — `number`
   *
   * Indent in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com
   */
  offset?: number;
};

export type TextUI = {
  _type: "textUI";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * Text — `blockContent`
   *
   *
   */
  text?: BlockContent;

  /**
   * width — `number`
   *
   * Size in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com
   */
  width?: number;

  /**
   * Offset — `number`
   *
   * Indent in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com
   */
  offset?: number;

  /**
   * columns — `number`
   *
   * 1 columns text, 2, default 1
   */
  columns?: number;
};

export type TextImageUI = {
  _type: "textImageUI";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * Text — `blockContent`
   *
   *
   */
  text?: BlockContent;

  /**
   * image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * width — `number`
   *
   * Size in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com
   */
  width?: number;

  /**
   * Offset — `number`
   *
   * Indent in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com
   */
  offset?: number;
};

export type Documents = Home | Infos | Settings | Tag | Product | Publisher;
