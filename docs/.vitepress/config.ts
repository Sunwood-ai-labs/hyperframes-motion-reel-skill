import { defineConfig } from "vitepress";

const siteTitle = "HyperFrames Motion Reel";
const siteDescription =
  "A Claude Code skill for showreel-grade, beat-synced motion graphics built with HyperFrames, GSAP, SVG and Canvas.";
const siteOrigin = "https://sunwood-ai-labs.github.io";
const siteBase = "/hyperframes-motion-reel-skill/";
const siteUrl = new URL(siteBase, siteOrigin).toString();
const ogImageUrl = new URL("ogp.svg", siteUrl).toString();
const repoUrl = "https://github.com/Sunwood-ai-labs/hyperframes-motion-reel-skill";

const socialLinks = [{ icon: "github", link: repoUrl }];

const footer = {
  message: "Released under the MIT License. Built on HyperFrames (Apache-2.0).",
  copyright: "Copyright (c) 2026 Sunwood AI Labs",
};

function toPagePath(page: string): string {
  if (page === "index.md") return "/";
  if (page.endsWith("/index.md")) return `/${page.replace(/\/index\.md$/, "")}/`;
  return `/${page.replace(/\.md$/, "")}`;
}

function toAbsoluteUrl(path: string): string {
  return new URL(path.replace(/^\/+/, ""), siteUrl).toString();
}

export default defineConfig({
  title: siteTitle,
  description: siteDescription,
  base: siteBase,
  lang: "en-US",
  cleanUrls: true,
  appearance: "dark",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: `${siteBase}favicon.svg` }],
    ["meta", { name: "theme-color", content: "#050505" }],
  ],
  sitemap: { hostname: siteUrl },
  transformHead({ page, title, description }) {
    const pageUrl = toAbsoluteUrl(toPagePath(page));
    const locale = page.startsWith("ja/") ? "ja_JP" : "en_US";
    return [
      ["link", { rel: "canonical", href: pageUrl }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:site_name", content: siteTitle }],
      ["meta", { property: "og:locale", content: locale }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:url", content: pageUrl }],
      ["meta", { property: "og:image", content: ogImageUrl }],
      ["meta", { property: "og:image:type", content: "image/svg+xml" }],
      ["meta", { property: "og:image:alt", content: "HyperFrames Motion Reel social card" }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: description }],
      ["meta", { name: "twitter:image", content: ogImageUrl }],
    ];
  },
  locales: {
    root: {
      label: "English",
      lang: "en-US",
      title: siteTitle,
      description: siteDescription,
      themeConfig: {
        logo: "/logo.svg",
        nav: [
          { text: "Home", link: "/" },
          { text: "Guide", link: "/guide/getting-started" },
          { text: "GitHub", link: repoUrl },
        ],
        sidebar: [
          {
            text: "Guide",
            items: [
              { text: "Getting Started", link: "/guide/getting-started" },
              { text: "Usage", link: "/guide/usage" },
              { text: "Architecture", link: "/guide/architecture" },
              { text: "Licensing", link: "/guide/licensing" },
            ],
          },
        ],
        socialLinks,
        footer,
      },
    },
    ja: {
      label: "日本語",
      lang: "ja-JP",
      title: siteTitle,
      description:
        "HyperFrames・GSAP・SVG・Canvas でショーリール級の拍同期モーショングラフィックスを作る Claude Code スキル。",
      themeConfig: {
        logo: "/logo.svg",
        nav: [
          { text: "ホーム", link: "/ja/" },
          { text: "ガイド", link: "/ja/guide/getting-started" },
          { text: "GitHub", link: repoUrl },
        ],
        sidebar: [
          {
            text: "ガイド",
            items: [
              { text: "はじめに", link: "/ja/guide/getting-started" },
              { text: "使い方", link: "/ja/guide/usage" },
              { text: "アーキテクチャ", link: "/ja/guide/architecture" },
              { text: "ライセンス", link: "/ja/guide/licensing" },
            ],
          },
        ],
        socialLinks,
        footer,
      },
    },
  },
  themeConfig: { socialLinks, footer },
});
