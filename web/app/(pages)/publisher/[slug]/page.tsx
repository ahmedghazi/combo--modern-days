import React from "react";
import ContentPublisher from "@/app/components/ContentPublisher";
import { Metadata } from "next";
import { getPublisher, publisherQ } from "@/app/utils/sanity-queries";
import website from "@/app/config/website";
import { draftMode } from "next/headers";
import { getClient } from "@/app/utils/sanity-client";
import { PublisherExtend } from "@/app/types/extend";

export const revalidate = 3600; // revalidate every hour
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getPublisher(params.slug);
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
  let data: PublisherExtend;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      publisherQ,
      params
    );
  } else {
    data = await getPublisher(params.slug);
  }

  if (!data) return <div>please edit page</div>;
  return (
    <div className='template template--publisher' data-template='publisher'>
      {/* <pre>{JSON.stringify(data, null)}</pre> */}
      <ContentPublisher input={data} />
    </div>
  );
};

export default Page;
