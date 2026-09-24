# Loft Maker London

Marketing website for Loft Maker London, a residential construction company (loft conversions, extensions, GRP roofing, structural steel) serving London and Essex. Next.js App Router site with a Sanity CMS-backed gallery and blog, an embedded Sanity Studio, and a Resend-powered contact form.

## Live URLs

- Production domain configured in `data/site.js`: `https://www.lmlbuild.uk/`
- Repository: `https://github.com/hectord8/loftmaker0.1`
- No CI config or automation is committed to this repo (see Deployment).

## Features

- Marketing site: hero, services, current-project showcase, gallery preview, and contact form on the home page
- Sanity CMS content: gallery documents and blog posts, rendered with ISR (60-second revalidate)
- Embedded Sanity Studio at `/studio` (desk tool only, no custom preview)
- Contact form → email via Resend, with a honeypot field, server-side field validation, and error states
- SEO: `sitemap.xml`, `robots.txt`, JSON-LD `LocalBusiness` schema, Open Graph/Twitter cards, web app manifest
- Analytics: Google Analytics (opt-in via env var), Vercel Analytics, Vercel Speed Insights
- Locally served Google Sans Flex font via `next/font`
- Sticky phone call button; footer contact/office-hours block

## Tech stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.4 |
| UI | React / React DOM | 19.2.3 |
| CMS | Sanity (Studio + client) | sanity 5.5.0, @sanity/client 7.14.0 |
| Sanity integration | next-sanity | 12.0.14 |
| Rich text | @portabletext/react | 6.0.2 |
| Image URLs | @sanity/image-url | 2.0.3 |
| Email | resend | 6.20.0 |
| Analytics | @vercel/analytics | 2.0.1 |
| Speed monitoring | @vercel/speed-insights | 2.0.0 |
| Env loading (scripts only) | dotenv | 17.4.2 |
| Linting | ESLint + eslint-config-next | ESLint 9.39.2 / eslint-config-next 16.1.4 |
| Runtime | Node.js | 20.9+ required by Next 16 (verified on v22.14.0) |

## Repository layout

```
app/
  (site)/             # public site group: home, gallery, posts/[slug]; header/footer layout
  api/contact/        # POST /api/contact route handler (Resend)
  studio/[[...index]] # embedded Sanity Studio route
  layout.js           # root layout: font, optional GA script, Vercel analytics/speed
  globals.css, fonts/ # global styles + Google Sans Flex woff2
  robots.js, sitemap.js, manifest.js  # SEO + PWA metadata routes
Components/           # React components (Hero, Services, ContactForm, GalleryPreview, …)
data/                 # static site data: site.js, services.js, projects.js
sanity/
  lib/                # next-sanity client + image URL builder
  schemaTypes/        # Sanity document schemas (post, gallery; project defined but unregistered)
scripts/              # bulk-import-gallery.js (Sanity asset upload)
public/               # images, icons, logo
sanity.config.js      # Studio config (basePath "/studio", desk tool)
next.config.mjs       # empty default config
eslint.config.mjs     # flat config, eslint-config-next core-web-vitals
jsconfig.json         # "@/*" path alias
```

## Quick start

No Docker setup exists for this project, so the fastest path is npm:

```bash
cp .env.local.example .env.local   # if you have an example; otherwise create one (see below)
npm install
npm run dev
```

Open `http://localhost:3000`. The Sanity Studio runs at `http://localhost:3000/studio`.

## Manual local dev

1. **Install** — `npm install`
2. **Env file** — create `.env.local` (it is git-ignored; no template is committed). Minimal working copy:

   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   RESEND_API_KEY=your_resend_key
   ```

3. **Run** — `npm run dev` (development) or `npm run build && npm start` (production)
4. **Lint** — `npm run lint`
5. **Bulk-import gallery images** (one-off script):

   ```bash
   node scripts/bulk-import-gallery.js ./path/to/images
   ```

   Requires `SANITY_TOKEN` (write token from manage.sanity.io) plus the two `NEXT_PUBLIC_SANITY_*` vars in `.env.local`. It uploads every image in the directory, creates one `gallery` document titled "Gallery", and flags the first six images as `featured`.

## Configuration reference

All env vars are read from `.env.local` in local development and must be set in the deploy platform's project settings for production. `NEXT_PUBLIC_*` vars are inlined at build time.

| Variable | Required | Default / fallback | Used by | Effect if missing |
|---|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | none | `sanity/lib/client.js`, `sanity.config.js` | Client is created with `undefined` projectId and every Sanity fetch fails; Studio falls back to `""` and won't load |
| `NEXT_PUBLIC_SANITY_DATASET` | No | `"production"` (in `sanity.config.js` only) | client, Studio | Site renders against dataset `production`; client itself has no default |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | `"2024-10-01"` | `sanity/lib/client.js` | Falls back via `\|\| "2024-10-01"` in the client |
| `NEXT_PUBLIC_GA_ID` | No | none | `app/layout.js` | GA tags are only injected when set (`{gaId && …}`); absent → no GA |
| `RESEND_API_KEY` | Yes (for contact form) | none | `app/api/contact/route.js` | POST `/api/contact` returns 503 "enquiry service temporarily unavailable" |
| `RESEND_FROM_EMAIL` | No | `"Loft Maker London <onboarding@resend.dev>"` | contact route | Resend fallback sender is used (must verify your domain to send from a custom address) |
| `CONTACT_EMAIL` | No | `site.email` → `loftmaker@live.co.uk` | contact route | Enquiries go to the fallback recipient |
| `SANITY_TOKEN` | Only for `scripts/` | none | `scripts/bulk-import-gallery.js` | Import script exits with a usage message |

## API overview

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/contact` | none (honeypot field) | Validates JSON `{name, email, phone, projectType, location, message, company}`; replies `200 {success:true}`, `400` validation, `503` no API key, `502` Resend error, `500` other. Filling the hidden `company` field silently returns success (bot trap). Emails subject `New <projectType> enquiry from <name>` with `replyTo` set to the submitter |
| GET | `/` | public | Home page (static) |
| GET | `/gallery` | public | Gallery documents from Sanity (ISR, revalidate 60 s) |
| GET | `/posts/[slug]` | public | Blog post from Sanity (dynamic) |
| GET | `/studio/[[...index]]` | Sanity Studio login | Embedded Sanity Studio |
| GET | `/manifest.webmanifest` | public | Web app manifest |
| GET | `/robots.txt` | public | Allow all + sitemap URL |
| GET | `/sitemap.xml` | public | Lists the home page only |

## Database schema

Sanity dataset with two registered document types:

| Document type | Fields |
|---|---|
| `post` | `title` (required), `slug` (required, source title), `publishedAt` (required datetime), `image`, `body` (portable text blocks) |
| `gallery` | `title`, `images[]` of `{image (hotspot), caption, featured (bool, default false)}` |

Note: `sanity/schemaTypes/project.js` defines a `project` document (title, slug, summary, coverImage) but it is **not** exported from `sanity/schemaTypes/index.js`, so it is not registered with the Studio. The "current project" showcase on the home page is static data in `data/projects.js`, not a Sanity document.

## Checks & CI

- **Lint** — `npm run lint` (runs `eslint`). Currently `0 errors, 6 warnings` (inline `<img>` tags ×4, anonymous default exports ×2).
- **Build** — `npm run build`. Verified passing. Route report:
  ```
  ○ /                    (static)
  ○ /gallery             1m revalidate
  ƒ /posts/[slug]        (dynamic)
  ƒ /studio/[[...index]] (dynamic)
  ƒ /api/contact         (dynamic)
  ```
- **No test suite** exists.
- **No CI** — there is no `.github/` directory or workflow file in the repo.

## Deployment

- No Dockerfile, no `vercel.json`, and no CI workflows are committed.
- The project is built for **Vercel**: it depends on `@vercel/analytics` and `@vercel/speed-insights`, `.vercel` is git-ignored, and the previously committed README referenced the Vercel platform.
- Vercel runs `npm run build` on the Node runtime; set the env vars from Configuration reference in the Vercel project settings (public `NEXT_PUBLIC_*` vars must be present at build time because Sanity-backed pages are prerendered during build).
- Production domain configured in code: `https://www.lmlbuild.uk/`.

## Troubleshooting gotchas

- **Contact form returns 503** — `RESEND_API_KEY` is unset at request time. Set it in `.env.local` (local) and in the platform's env settings.
- **Sanity fetches fail / Studio blank** — `NEXT_PUBLIC_SANITY_PROJECT_ID` missing. The client passes `undefined` straight to `createClient`; there is no guard, so pages that fetch render errors.
- **CDN never used** — `sanity/lib/client.js` computes `useCdn` from `NODE_ENV` but hardcodes `useCdn: false`, so the cached dataset is never activated even in production.
- **`project` document type is unusable** — schema file exists but isn't registered in `sanity/schemaTypes/index.js`; you can't create project documents in Studio.
- **Blog posts are hard to reach** — `LatestPosts` is commented out of the home page (commit `9326452`), so posts are only reachable from the "recent posts" sidebar on another post page. There's no archive listing route.
- **`sitemap.xml` only contains `/`** — `app/sitemap.js` hardcodes a single entry; galleries and posts aren't listed.
- **Build-time deprecation warnings** — `@sanity/image-url`'s default export is deprecated; use the named `createImageUrlBuilder` export.
- **`.gitignore` uses `.env*`** — this ignores `.env.local` (where real keys currently live) and would also ignore any `.env.example` you create; there is no committed env template, so a fresh clone needs its env vars created manually.
- **Unrelated uncommitted work** — the working tree has changes to `Components/ContactForm/ContactForm.js` (label markup restructure plus trailing whitespace on line 16) that are not part of the README commit.