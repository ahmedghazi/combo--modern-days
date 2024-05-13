import ContentProduct from "@/app/components/ContentProduct";
import website from "@/app/config/website";
import { ProductExtend } from "@/app/types/extend";
import { Product } from "@/app/types/schema";
import { getClient } from "@/app/utils/sanity-client";
import { getProduct, productQ } from "@/app/utils/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import React from "react";

export const revalidate = 3600; // revalidate every hour
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getProduct(params.slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

type PageProps = {
  params: {
    slug: string;
  };
};

const Page: ({ params }: PageProps) => Promise<JSX.Element> = async ({
  params,
}) => {
  const { isEnabled: preview } = draftMode();
  let data: ProductExtend;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      productQ,
      params
    );
  } else {
    data = (await getProduct(params.slug)) as ProductExtend;
  }

  if (!data) return <div>please edit page</div>;
  return (
    <div className='template template--product' data-template='product'>
      {data && <ContentProduct input={data} />}
    </div>
  );
};

export default Page;
