#!/usr/bin/env node
/** Generates marketing/blog/index.html and sitemap.xml from manifest.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MARKETING = path.resolve(__dirname, '..');
const manifest = JSON.parse(
  fs.readFileSync(path.join(MARKETING, 'blog', '_content', 'manifest.json'), 'utf8')
);

const CATEGORY_ORDER = [
  { key: 'ai', label: 'AI Wedding Planning' },
  { key: 'checklist', label: 'Wedding Checklist & Timeline' },
  { key: 'budget', label: 'Budget & Costs' },
  { key: 'rsvp', label: 'Guest List & RSVP' },
  { key: 'decor', label: 'Decor & Style' },
  { key: 'vendors', label: 'Vendors & Supplier Emails' },
  { key: 'etiquette', label: 'Etiquette & Awkward Messages' },
];

const articles = manifest.filter((a) => !a.redirectTo);
const featured = articles.filter((a) => a.featured).sort((a, b) => (a.priority || 99) - (b.priority || 99));

function card(a) {
  const excerpt = a.metaDescription.length > 155 ? a.metaDescription.slice(0, 152) + '…' : a.metaDescription;
  return `            <a class="blog-card" href="/blog/${a.slug}/">
              <div class="blog-card__meta">${a.category} · ${a.dateLabel || 'June 2026'}</div>
              <h3 class="blog-card__title">${a.h1}</h3>
              <p class="blog-card__excerpt">${excerpt}</p>
            </a>`;
}

function categorySection(cat) {
  const items = articles
    .filter((a) => a.categoryKey === cat.key)
    .sort((a, b) => (a.priority || 99) - (b.priority || 99));
  if (!items.length) return '';
  return `
          <section class="blog-category" id="category-${cat.key}" aria-labelledby="heading-${cat.key}">
            <h2 class="blog-category__heading" id="heading-${cat.key}">${cat.label}</h2>
            <div class="blog-list blog-list--category">
${items.map(card).join('\n')}
            </div>
          </section>`;
}

const categoryNav = CATEGORY_ORDER.map(
  (c) => `            <a class="blog-category-nav__link" href="#category-${c.key}">${c.label}</a>`
).join('\n');

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wedding Planning Blog: AI Checklists, Budget, Guest List &amp; RSVP Guides | WedCheese</title>
    <meta name="description" content="Practical wedding planning guides for couples who want less spreadsheet chaos. Checklists, budgets, guest lists, RSVPs, decor, vendors, and AI planning with WedCheese." />
    <link rel="canonical" href="https://www.wedcheese.com/blog/" />
    <link rel="alternate" hreflang="en-gb" href="https://www.wedcheese.com/blog/" />
    <link rel="alternate" hreflang="x-default" href="https://www.wedcheese.com/blog/" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.wedcheese.com/blog/" />
    <meta property="og:title" content="WedCheese Wedding Planning Blog" />
    <meta property="og:description" content="AI wedding planner guides—checklists, budgets, guest lists, RSVPs, decor, and vendor tips." />
    <meta property="og:image" content="https://www.wedcheese.com/assets/images/og-cover.png" />
    <meta property="og:site_name" content="WedCheese" />
    <meta property="og:locale" content="en_GB" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Wedding Planning Blog | WedCheese" />
    <meta name="twitter:description" content="Checklists, budgets, RSVPs, decor, vendors—and how AI keeps your plan organised." />
    <meta name="twitter:image" content="https://www.wedcheese.com/assets/images/og-cover.png" />
    <link rel="icon" href="/favicon.ico" sizes="48x48" />
    <link rel="icon" href="/assets/images/wedcheese-logo.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto+Serif:wght@500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/css/styles.css?v=12" />
    <script src="../assets/js/site.js?v=9" defer></script>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "WedCheese Wedding Planning Blog",
        "description": "Articles on AI wedding planning, wedding checklists, budgets, guest lists, RSVPs, decor, and vendor tips.",
        "url": "https://www.wedcheese.com/blog/",
        "publisher": { "@type": "Organization", "name": "Orienjo Ltd.", "url": "https://www.wedcheese.com/" }
      }
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-0ETTR3L6HK"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-0ETTR3L6HK');</script>
  </head>
  <body>
    <div class="page-shell">
      <header class="site-header">
        <div class="container site-header__inner">
          <a class="brand" href="/" aria-label="WedCheese home">
            <img class="brand-logo" src="../assets/images/wedcheese-logo.svg" alt="" aria-hidden="true" />
            <span class="brand__name">WedCheese</span>
          </a>
          <button type="button" class="site-nav__toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">
            <span class="site-nav__toggle-bar" aria-hidden="true"></span>
            <span class="site-nav__toggle-bar" aria-hidden="true"></span>
            <span class="site-nav__toggle-bar" aria-hidden="true"></span>
          </button>
          <nav id="primary-nav" class="site-nav" aria-label="Primary">
            <a href="/" data-nav-link="/">Home</a>
            <a href="/blog" data-nav-link="/blog">Blog</a>
            <a href="/support.html" data-nav-link="/support.html">Support</a>
            <div class="nav-dropdown">
              <button class="nav-dropdown__trigger" aria-expanded="false" aria-haspopup="true">Legal<svg class="nav-dropdown__caret" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              <div class="nav-dropdown__menu">
                <a href="/privacy-policy.html" data-nav-link="/privacy-policy.html">Privacy Policy</a>
                <a href="/terms-of-service.html" data-nav-link="/terms-of-service.html">Terms of Service</a>
                <a href="/data-deletion.html" data-nav-link="/data-deletion.html">Data Deletion</a>
                <a href="/app-disclaimer.html" data-nav-link="/app-disclaimer.html">App Disclaimer</a>
                <a href="/third-party-disclosure.html" data-nav-link="/third-party-disclosure.html">Third-Party Disclosure</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main class="blog-main">
        <div class="container">
          <header class="blog-hero">
            <span class="eyebrow">Blog</span>
            <h1>Wedding Planning Blog: AI Checklists, Budget, Guest List &amp; RSVP Guides</h1>
            <p class="section-intro">
              Practical wedding planning guides for couples who want less spreadsheet chaos. Learn how to build your checklist, manage your budget, organise your guest list, collect RSVPs, plan decor, compare vendors, and use AI to stay on track.
            </p>
          </header>

          <nav class="blog-category-nav" aria-label="Blog categories">
${categoryNav}
          </nav>

          <section class="blog-list blog-list--featured" aria-label="Featured articles">
            <h2 class="blog-list__heading">Start here</h2>
${featured.map(card).join('\n')}
          </section>
${CATEGORY_ORDER.map(categorySection).join('\n')}

          <aside class="blog-post-cta blog-post-cta--end" aria-label="Download WedCheese">
            <div class="blog-post-cta__inner">
              <img class="blog-post-cta__logo" src="/assets/images/apple-touch-icon.png" alt="WedCheese wedding planner app" width="56" height="56" />
              <div class="blog-post-cta__content">
                <h2 class="blog-post-cta__title">Plan your wedding with WedCheese</h2>
                <p class="blog-post-cta__text">Plan your wedding with less chaos. Download WedCheese to manage your checklist, budget, guests, RSVPs, vendors, decor, and AI planner in one app.</p>
                <div class="store-badges" aria-label="App download options">
                  <a class="store-button store-button--apple" href="https://apps.apple.com/us/app/wedcheese-ai-wedding-planner/id6760207985" target="_blank" rel="noopener noreferrer" aria-label="Download WedCheese on the Apple App Store"><span class="store-button__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.17 12.5c.03 2.61 2.29 3.48 2.31 3.49-.02.06-.36 1.23-1.18 2.43-.71 1.03-1.45 2.06-2.61 2.08-1.14.02-1.51-.68-2.82-.68-1.31 0-1.72.66-2.8.7-1.12.04-1.98-1.12-2.69-2.14-1.46-2.11-2.58-5.97-1.08-8.58.74-1.3 2.06-2.13 3.49-2.15 1.09-.02 2.11.73 2.82.73.7 0 2.02-.9 3.4-.77.58.02 2.23.23 3.29 1.78-.09.06-1.96 1.14-1.93 3.11Z" fill="currentColor"/><path d="M14.44 4.73c.59-.71 1-1.7.89-2.68-.85.03-1.87.57-2.48 1.28-.55.64-1.03 1.66-.9 2.64.95.07 1.9-.48 2.49-1.24Z" fill="currentColor"/></svg></span><span class="store-button__text"><span class="store-button__eyebrow">Download on the</span><span class="store-button__label">App Store</span></span></a>
                  <a class="store-button store-button--google" href="https://play.google.com/store/apps/details?id=com.orienjo.wedcheese" target="_blank" rel="noopener noreferrer" aria-label="Download WedCheese on Google Play"><span class="store-button__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3.75 13.57 12 3 20.25V3.75Z" fill="#00C2FF"/><path d="M13.57 12 17.26 8.93 21 11.08c1 .56 1 1.28 0 1.84l-3.74 2.15L13.57 12Z" fill="#FFD54F"/><path d="M3 3.75 17.26 8.93 13.57 12 3 3.75Z" fill="#34A853"/><path d="M3 20.25 13.57 12 17.26 15.07 3 20.25Z" fill="#EA4335"/></svg></span><span class="store-button__text"><span class="store-button__eyebrow">Get it on</span><span class="store-button__label">Google Play</span></span></a>
                </div>
                <p class="blog-post-cta__secondary">Start free. Upgrade when you need more AI planning help.</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer class="site-footer">
        <div class="container site-footer__inner">
          <div class="site-footer__note">&copy; <span data-current-year>2026</span> Orienjo Ltd. WedCheese.</div>
          <nav class="site-footer__links" aria-label="Footer navigation">
            <a href="/blog/">Blog</a><a href="/support.html">Support</a><a href="/privacy-policy.html">Privacy Policy</a>
            <a href="/terms-of-service.html">Terms of Service</a><a href="/data-deletion.html">Data Deletion</a>
            <a href="/app-disclaimer.html">App Disclaimer</a><a href="/third-party-disclosure.html">Third-Party Disclosure</a>
          </nav>
        </div>
        <div class="container"><p class="site-footer__boilerplate">WedCheese is a free AI-powered wedding planning app available on iOS and Android. It features an intelligent AI assistant, an automated budget tracker, a digital guest list and RSVP manager, and a dynamic day-of timeline builder.</p></div>
      </footer>
    </div>
  </body>
</html>`;

fs.writeFileSync(path.join(MARKETING, 'blog', 'index.html'), indexHtml);

// Sitemap
const staticPages = [
  { loc: 'https://www.wedcheese.com/', priority: '1.0', changefreq: 'weekly' },
  { loc: 'https://www.wedcheese.com/blog/', priority: '0.9', changefreq: 'weekly', lastmod: '2026-06-13' },
  { loc: 'https://www.wedcheese.com/support.html', priority: '0.5', changefreq: 'monthly' },
  { loc: 'https://www.wedcheese.com/privacy-policy.html', priority: '0.4', changefreq: 'yearly' },
  { loc: 'https://www.wedcheese.com/terms-of-service.html', priority: '0.4', changefreq: 'yearly' },
];

const blogUrls = manifest.map((a) => ({
  loc: `https://www.wedcheese.com/blog/${a.slug}/`,
  lastmod: a.dateModified || a.datePublished || '2026-06-13',
  priority: a.redirectTo ? '0.3' : a.featured ? '0.8' : '0.7',
  changefreq: 'monthly',
}));

const allUrls = [...staticPages, ...blogUrls];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : '<lastmod>2026-06-13</lastmod>'}
    <changefreq>${u.changefreq || 'monthly'}</changefreq>
    <priority>${u.priority || '0.6'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync(path.join(MARKETING, 'sitemap.xml'), sitemap);
console.log(`Generated blog index (${articles.length} articles) and sitemap (${allUrls.length} URLs)`);
