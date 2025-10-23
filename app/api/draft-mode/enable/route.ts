import { client } from "@/sanity/lib/client";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

console.log(process.env.SANITY_VIEWER_TOKEN);

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
});
