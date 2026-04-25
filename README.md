# Wedcheese marketing site

This folder contains a lightweight static website for `www.wedcheese.com`.

## Files

- `index.html`: landing page
- `privacy-policy.html`: privacy policy
- `terms-of-service.html`: terms of service
- `support.html`: public support contact page
- `data-deletion.html`: public data deletion instructions
- `privacy/index.html`: compatibility route for `/privacy`
- `terms/index.html`: compatibility route for `/terms`
- `assets/`: shared CSS, JS, and image assets
- `CNAME`: GitHub Pages custom domain
- `.nojekyll`: disables Jekyll processing on GitHub Pages

## Local preview

Because this site uses root-relative links, preview it from the `marketing/` folder with a static server:

```bash
cd marketing
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages notes

GitHub Pages does not publish directly from an arbitrary subfolder on a branch. To deploy this
`marketing/` folder, use one of these approaches:

1. Publish the folder with a GitHub Actions workflow.
2. Copy the folder contents to a dedicated Pages repository.
3. Move the site contents to `/docs` later if you want branch-based Pages publishing without Actions.

## Before launch

- Replace the app screenshot placeholder in `assets/images/`.
- Swap placeholder app store URLs with real store links.
- Review and finalize the legal copy with your business or legal team.
