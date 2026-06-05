#!/usr/bin/env node

/**
 * IndexNow notification script for www.wedcheese.com
 *
 * Reads marketing/sitemap.xml (or accepts explicit URLs) and POSTs them to the
 * IndexNow API so Bing, Yandex, and other participating engines re-crawl fast.
 *
 * Usage:
 *   # Notify all SEO-priority URLs from sitemap.xml (priority >= 0.5)
 *   node marketing/scripts/notify-indexnow.js
 *
 *   # Notify specific URLs
 *   node marketing/scripts/notify-indexnow.js \
 *     https://www.wedcheese.com/blog/new-post/ \
 *     https://www.wedcheese.com/blog/updated-post/
 *
 *   # Dry-run (prints payload, skips POST)
 *   DRY_RUN=1 node marketing/scripts/notify-indexnow.js
 *
 * Environment variables:
 *   INDEXNOW_KEY  – override the default key (optional; falls back to the
 *                   key baked into the repo verification file)
 *   DRY_RUN       – set to any truthy value to skip the actual HTTP call
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'www.wedcheese.com';
const KEY = process.env.INDEXNOW_KEY || '84f610dccfa72616579872656bc59a95';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const DRY_RUN = Boolean(process.env.DRY_RUN);

// Minimum sitemap priority to include when auto-reading (skips low-value legal pages)
const MIN_PRIORITY = 0.5;

function parseSitemapUrls(sitemapPath) {
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [];
  const urlBlockRegex = /<url>([\s\S]*?)<\/url>/g;
  const locRegex = /<loc>(.*?)<\/loc>/;
  const priorityRegex = /<priority>(.*?)<\/priority>/;

  let match;
  while ((match = urlBlockRegex.exec(xml)) !== null) {
    const block = match[1];
    const locMatch = block.match(locRegex);
    const prioMatch = block.match(priorityRegex);
    if (!locMatch) continue;

    const url = locMatch[1].trim();
    const priority = prioMatch ? parseFloat(prioMatch[1]) : 0.5;

    if (priority >= MIN_PRIORITY) {
      urls.push(url);
    }
  }

  // Deduplicate (sitemap had a duplicate wedding-budget-breakdown entry)
  return [...new Set(urls)];
}

function postIndexNow(urlList) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    });

    const url = new URL(INDEXNOW_ENDPOINT);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body });
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  let urls;

  // If explicit URLs were passed as CLI args, use those
  const cliUrls = process.argv.slice(2).filter((a) => a.startsWith('http'));
  if (cliUrls.length > 0) {
    urls = cliUrls;
  } else {
    // Auto-read from sitemap.xml (resolve relative to this script's location)
    const sitemapPath = path.resolve(__dirname, '..', 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      console.error(`Sitemap not found at ${sitemapPath}`);
      process.exit(1);
    }
    urls = parseSitemapUrls(sitemapPath);
  }

  if (urls.length === 0) {
    console.log('No URLs to notify.');
    return;
  }

  console.log(`IndexNow: notifying ${urls.length} URL(s) for ${HOST}`);
  urls.forEach((u) => console.log(`  ${u}`));

  if (DRY_RUN) {
    console.log('\n[DRY RUN] Payload that would be sent:');
    console.log(JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }, null, 2));
    return;
  }

  try {
    const { statusCode, body } = await postIndexNow(urls);
    if (statusCode >= 200 && statusCode < 300) {
      console.log(`IndexNow accepted (HTTP ${statusCode})`);
    } else {
      console.error(`IndexNow returned HTTP ${statusCode}: ${body}`);
      process.exit(1);
    }
  } catch (err) {
    console.error('IndexNow request failed:', err.message);
    process.exit(1);
  }
}

main();
