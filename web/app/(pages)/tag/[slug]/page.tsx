import React from "react";
import { Metadata } from "next";
import website from "@/app/config/website";
import { draftMode } from "next/headers";
import { TagExtend } from "@/app/types/extend";
import ContentTag from "@/app/components/ContentTag";
import { getTag, PUBLISHER_QUERY } from "@/app/sanity-api/sanity-queries";
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

  const data = await getTag(slug);
  return {
    title: `${data?.title || ""}`,
    // description: data?.seo?.metaDescription,
    openGraph: {
      images: website.image,
    },
  };
}

const Page: ({ params }: PageProps) => Promise<JSX.Element> = async ({
  params,
}) => {
  const { isEnabled } = await draftMode();
  const { slug } = await params;
  let data: TagExtend;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      PUBLISHER_QUERY,
      params
    );
  } else {
    data = await getTag(slug);
  }

  if (!data) return notFound();

  return (
    <div className='template template--tag' data-template='tag'>
      <ContentTag input={data} />
    </div>
  );
};

export default Page;
