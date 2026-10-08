import type { MetadataRoute } from "next";
import { identity } from "@/content/identity";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${identity.siteUrl}/sitemap.xml`,
  };
}
