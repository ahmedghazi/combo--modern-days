import { draftMode } from "next/headers";
import { Metadata, NextPage } from "next";
import website from "./config/website";
import ContentHome from "./components/ContentHome";
import { Home } from "./types/schema";
import { getHome, getTags, HOME_QUERY } from "./sanity-api/sanity-queries";
import { getClient } from "./sanity-api/sanity.client";
import { notFound } from "next/navigation";

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

const HomePage: NextPage<PageProps> = async ({ params }) => {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  let data: Home;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      HOME_QUERY
    );
  } else {
    data = (await getHome()) as Home;
  }

  const tags = await getTags();

  if (!data) notFound();
  return (
    <div className='template template--home' data-template='home'>
      <ContentHome input={data} tags={tags} />
    </div>
  );
};

export default HomePage;
