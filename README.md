# GHFRC Website

**English** | [简体中文](README.zh-CN.md) | [繁體中文（香港）](README.zh-Hant.md)

**The public website codebase and reusable team-site template for GHFRC — every long-lived branch is deployed live.**

[**Stable site**](https://frc-leomotive.github.io/gh-sites/) ·
[Preview site](https://frc-leomotive.github.io/gh-sites/preview/) ·
[Template demo](https://frc-leomotive.github.io/gh-sites/template/) ·
[Production website](https://ghfrc.pages.dev)

GHFRC Website is the public website codebase and a reusable website template. Framework development, skins, branches, Pull Requests, Issues, and engineering history are maintained in this repository.

The repository contains only replaceable example content. GHFRC's real website content is maintained separately in a private repository and is not part of this project.

## Project Structure

- `framework/`: page structure, components, navigation behavior, and content interfaces.
- `skins/`: replaceable visual themes and design tokens.
- `content/`: public example content that can be replaced with another team's content.
- `engineering-logs/`: project-wide same-day goals and completed work.
- `docs/`: implementation specifications and cross-module documentation.

## Branches and Deployments

The example content of each long-lived branch is published automatically to GitHub Pages whenever that branch changes:

| Branch | Deployment |
| --- | --- |
| `stable` | <https://frc-leomotive.github.io/gh-sites/> |
| `preview` | <https://frc-leomotive.github.io/gh-sites/preview/> |
| `template` | <https://frc-leomotive.github.io/gh-sites/template/> |

The `stable` site is served directly at the Pages root; `/gh-sites/stable/` remains available as an alias. A single workflow, `.github/workflows/deploy-github-pages.yml` (kept identical on all three branches), rebuilds all three sites on every push and publishes them together. The framework resolves internal links, media, and favicon paths through the configured Astro base path, so the same source renders correctly both at a domain root and under a sub-path.

The production website at `https://ghfrc.pages.dev` (custom domain `ghfrc.org`) is built separately: a trusted GitHub Actions workflow in the private content repository combines the latest public `stable` framework with the latest private `stable` content, then uploads only the generated static output to Cloudflare Pages. A public `stable` update securely triggers that private workflow, while a private `stable` update starts it directly.

The complete sanitized legacy framework and skin history is connected to the `preview` branch. The public history excludes GHFRC's real content. Use a regular Merge commit when merging `preview` into `stable`; do not use Squash and merge or Rebase and merge if the legacy topology must remain visible.

Changes to `stable` must be introduced through a Pull Request. The `Stable pull request checks` workflow validates Astro content and code, runs the automated tests, builds the public example website, and rejects internal reference media before the Pull Request can be merged.

## Use as a Template

1. Download or fork this repository.
2. Replace the files inside `content/` with your own text and media while keeping the documented structure.
3. Install dependencies and start the local development server.

```bash
npm install
npm run dev
```

The local website is available at `http://localhost:4321` by default. The project requires Node.js 24.

## Content Source Priority

The build selects one complete content source in the following order:

1. `GH_FRC_CONTENT_DIR`, when explicitly configured.
2. The public example `content/` folder in this repository.

This keeps public and preview builds on the replaceable example content by default, even when GHFRC's private content repository exists beside the project locally. Set `GH_FRC_CONTENT_DIR` explicitly when a trusted build needs the private content. The selected source must contain both `config/site.yaml` and the required media files; the build does not mix files from different content sources.

## Verification

```bash
npm test
npm run check
npm run build
```

## License

The public website code and example content are released under the [MIT License](LICENSE). GHFRC's private content repository and brand assets are not included.
