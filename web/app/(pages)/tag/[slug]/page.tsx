import React from "react";
import ContentPublisher from "@/app/components/ContentPublisher";
import { Metadata } from "next";
import { getPublisher, getTag, publisherQ } from "@/app/utils/sanity-queries";
import website from "@/app/config/website";
import { draftMode } from "next/headers";
import { getClient } from "@/app/utils/sanity-client";
import { PublisherExtend, TagExtend } from "@/app/types/extend";
import ContentTag from "@/app/components/ContentTag";

export const revalidate = 3600; // revalidate every hour
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getTag(params.slug);
  return {
    title: `${data?.title || ""}`,
    // description: data?.seo?.metaDescription,
    openGraph: {
      images: website.image,
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
  let data: TagExtend;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      publisherQ,
      params
    );
  } else {
    data = await getTag(params.slug);
  }

  if (!data) return <div>please edit page {params.slug}</div>;
  return (
    <div className='template template--tag' data-template='tag'>
      <ContentTag input={data} />
    </div>
  );
};

export default Page;
