import ContentProduct from "@/app/components/ContentProduct";
import website from "@/app/config/website";
import { getProduct, PRODUCT_QUERY } from "@/app/sanity-api/sanity-queries";
import { getClient } from "@/app/sanity-api/sanity.client";
import { ProductExtend } from "@/app/types/extend";
import { Metadata, NextPage } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

// export const revalidate = 10; // revalidate every hour
// export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProduct(slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const ProductPage: NextPage<PageProps> = async ({ params }) => {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  let data: ProductExtend;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      PRODUCT_QUERY,
      { slug: slug }
    );
  } else {
    data = (await getProduct(slug)) as ProductExtend;
  }

  if (!data) return notFound();
  return (
    <div className='template template--product' data-template='product'>
      {data && <ContentProduct input={data} />}
    </div>
  );
};

export default ProductPage;
