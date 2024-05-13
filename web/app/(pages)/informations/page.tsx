import React from "react";
import { Metadata } from "next";
import { getInfos, infosQ } from "@/app/utils/sanity-queries";
import website from "@/app/config/website";
import { draftMode } from "next/headers";
import { getClient } from "@/app/utils/sanity-client";
import { Infos } from "@/app/types/schema";
import ContentInfos from "@/app/components/ContentInfos";

export const revalidate = 3600; // revalidate every hour
export const dynamic = "force-dynamic";

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

type PageProps = {
  params: {
    slug: string;
  };
};

const Page: ({ params }: PageProps) => Promise<JSX.Element> = async ({
  params,
}) => {
  const { isEnabled: preview } = draftMode();
  let data: Infos;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      infosQ,
      params
    );
  } else {
    data = await getInfos();
  }

  if (!data) return <div>please edit page</div>;
  return (
    <div className='template template--publisher' data-template='publisher'>
      <ContentInfos input={data} />
    </div>
  );
};

export default Page;
