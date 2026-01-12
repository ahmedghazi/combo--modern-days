import React from "react";
import ContentPublisher from "@/app/components/ContentPublisher";
import { Metadata } from "next";
import website from "@/app/config/website";
import { draftMode } from "next/headers";
import { PublisherExtend } from "@/app/types/extend";
import { getPublisher, PUBLISHER_QUERY } from "@/app/sanity-api/sanity-queries";
import { getClient } from "@/app/sanity-api/sanity.client";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPublisher(slug);
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
  const { slug } = await params;

  const { isEnabled } = await draftMode();

  let data: PublisherExtend;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      PUBLISHER_QUERY,
      params
    );
  } else {
    data = await getPublisher(slug);
  }

  if (!data) return notFound();

  return (
    <div className='template template--publisher' data-template='publisher'>
      <ContentPublisher input={data} />
    </div>
  );
};

export default Page;
