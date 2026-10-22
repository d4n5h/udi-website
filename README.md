# Udi Shlomo website

Next.js static site for GitHub Pages. Requires Node.js 22 or later (the deployment workflow uses Node.js 24).

## Develop and preview

```sh
npm ci
npm run dev
```

For a production preview at `http://localhost:3000/udi-website/`:

```sh
npm run build:static
npm run check:static
npm start
```

The exported site is in `out/`. Serve it over HTTP; opening HTML files directly from disk does not support Next.js client navigation. `npm start` serves the export and automatically detects its base path. Google Fonts are downloaded during the build and included in the export, so building requires internet access.

## Deploy to GitHub Pages

1. Push this project's source files, including `.github/workflows/pages.yml` and `package-lock.json`, to the `main` branch of `d4n5h/udi-website`.
2. In the repository's **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**.
3. Open **Actions → Deploy to GitHub Pages**. The workflow runs on each push to `main`; it can also be started with **Run workflow**.

After the deployment completes, the default URL is <https://d4n5h.github.io/udi-website/>.

The workflow installs dependencies, builds and checks the static export, uploads `out/`, and deploys with GitHub's official Pages actions. It does not need API keys or a branch containing generated files. Commit `.npmrc` alongside `package-lock.json` so local and CI dependency resolution use the same settings. Keep `out/`, `.next-static/`, and the old `udi-shlomo-website/` export folder out of Git; they are ignored.

GitHub's workflow documentation: <https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages>.

## Base path and custom domains

`next/link` handles the configured base path for navigation; `src/lib/asset-path.ts` applies it to public images and icons. Trailing slashes produce directory indexes, so direct links and page refreshes work on Pages.

The workflow gets `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` from `actions/configure-pages`, so repository renames, user sites, and custom domains use the correct URLs on the next deployment. Configure a custom domain in **Settings → Pages**, then rerun the workflow. No `CNAME` file is needed for an Actions deployment.

For a manual build, `npm run build:static` defaults to `/udi-website` and `https://d4n5h.github.io/udi-website/`. Override both environment variables to build for another location. For example, in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/another-repository'
$env:NEXT_PUBLIC_SITE_URL = 'https://username.github.io/another-repository/'
npm run build:static
npm run check:static
```

For a domain root, set the base path to an empty string (use `$env:NEXT_PUBLIC_BASE_PATH = ''` in PowerShell 7.5+), and set the site URL to the full domain with a trailing slash. `npm run build` also exports the site, using a root base path by default.

## Contact form

GitHub Pages serves static files and cannot run the previous Mailgun/Turnstile API route. The contact form now validates the fields and opens a prefilled email draft addressed to `udi.shlomo.music@gmail.com`. The visitor sends that draft from their email app. A direct email link remains available if no email app is configured. The website does not report that a message has been sent.

Direct submission without an email app would require a separately hosted backend or a form service. No Mailgun or Turnstile secrets are used by this static site.
