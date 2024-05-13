import { draftMode } from "next/headers";
import Image from "next/image";
import { Metadata } from "next";
import website from "./config/website";
import ContentHome from "./components/ContentHome";
import { getClient } from "./utils/sanity-client";
import { getHome, homeQ } from "./utils/sanity-queries";
import { Home } from "./types/schema";

export const revalidate = 3600; // revalidate every hour
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getHome();
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
  let data: Home;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      homeQ,
      params
    );
  } else {
    data = (await getHome()) as Home;
  }

  if (!data) return <div>please edit page</div>;
  return (
    <div className='template template--home' data-template='home'>
      <ContentHome input={data} />
    </div>
  );
};

export default Page;
