// import { client } from "@/app/utils/sanity-client";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-08-29",
  useCdn: true,
  withCredentials: true,
  token: process.env.SANITY_API_READ_TOKEN,
});

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "INVALID_METHOD" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json(); // res now contains body
  const { s } = body;

  const query = `*[_type in ['publisher', 'product']
    && !(_id in path("drafts.**"))
    && (
      title match $s + "*"
      || description[].children[].text match $s + "*"
      || contributors[].children[].text match $s + "*"
      || information match $s + "*"
      || publisher->title match $s + "*"
      )
    ]
    {
      _type, slug, title, imageCover{...,image{asset->}}
    } | order(title desc) | order(_createdAt desc)
    `;

  // const params = { s: s };

  try {
    const res = await client.fetch(query, { s: s });
    console.log(query);
    console.log(res);
    return new NextResponse(JSON.stringify(res), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    const error_response = {
      status: "error",
      message: error.message,
      raw: error,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
