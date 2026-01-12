import React from "react";
import { Metadata } from "next";
import website from "@/app/config/website";
import { draftMode } from "next/headers";
import { Infos } from "@/app/types/schema";
import ContentInfos from "@/app/components/ContentInfos";
import { getInfos, INFOS_QUERY } from "@/app/sanity-api/sanity-queries";
import { getClient } from "@/app/sanity-api/sanity.client";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getInfos();
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const Page: ({ params }: PageProps) => Promise<JSX.Element> = async ({
  params,
}) => {
  const { isEnabled } = await draftMode();
  let data: Infos;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      INFOS_QUERY,
      params
    );
  } else {
    data = await getInfos();
  }

  if (!data) return notFound();
  return (
    <div className='template template--publisher' data-template='publisher'>
      <ContentInfos input={data} />
    </div>
  );
};

export default Page;
