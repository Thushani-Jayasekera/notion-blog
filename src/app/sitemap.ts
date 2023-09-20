import { MetadataRoute } from 'next';

import { getAllPostsFromNotion } from '@/services/posts';
import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

export default async function sitemap() {
  const allPosts = await getAllPostsFromNotion();
  const sitemap: MetadataRoute.Sitemap = [];

  for (const post of allPosts) {
    sitemap.push({
      url: `${process.env.SITE_URL || publicRuntimeConfig.SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.lastEditedAt),
    });
  }

  return sitemap;
}
