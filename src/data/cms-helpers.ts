/**
 * Simulates a headless CMS client.
 * In production, these would be API calls to Sanity/similar.
 * For this exercise, they read from the local JSON file.
 */
import cmsData from './cms.json';

export interface BlogPost {
  id: string;
  slug: string;
  title: string | null;
  author: string | null;
  publishedAt: string | null;
  category: string | null;
  excerpt: string | null;
  body: ContentBlock[] | null;
  seo: SeoData | null;
  _deleted?: boolean;
}

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'link';
  text: string;
  level?: number;
  reference?: string; // ID of another content document
  href?: string; // External URL
  external?: boolean;
}

export interface SeoData {
  title: string;
  description: string;
}

export interface LandingPage {
  id: string;
  slug: string;
  title: string;
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  seo: SeoData;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export function getAllBlogPosts(): BlogPost[] {
  return cmsData.blogPosts as BlogPost[];
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return cmsData.blogPosts.find((p) => p.slug === slug) as BlogPost | undefined;
}

export function getBlogPostById(id: string): BlogPost | undefined {
  return cmsData.blogPosts.find((p) => p.id === id) as BlogPost | undefined;
}

export function getLandingPageBySlug(slug: string): LandingPage | undefined {
  return cmsData.landingPages.find((p) => p.slug === slug) as LandingPage | undefined;
}

export function getSiteNav(): NavItem[] {
  return cmsData.site.nav as NavItem[];
}

export function getSiteInfo() {
  return cmsData.site;
}
