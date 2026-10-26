<a href="https://configly.site">
  <img alt="Configly logo" src="https://configly.site/assets/image/cf-logo.png" width="48">
</a>

## Configly
 
**Convert configuration files without sending them anywhere.**
 
Configly is a browser-based converter for **JSON**, **YAML**, **XML**, **TOML**, **Java Properties**, and **ENV**. Every conversion runs on your device, so there are no uploads and no account, which makes it safe for files that contain secrets.
 
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
 
[Try it online](https://configly.site/tools) · [Quick start](#getting-started) · [Limitations](#conversion-behavior-and-limitations) · [Contributing](./CONTRIBUTING.md)




## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Supported Formats](#supported-formats)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Conversion Behavior and Limitations](#conversion-behavior-and-limitations)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Continuous Integration](#continuous-integration)
- [Contributing](#contributing)
- [License](#license)

## Overview

Configly converts configuration files between common formats without sending anything to a server. Configuration files often hold secrets such as API keys, database credentials, and tokens, so every conversion runs client-side in the browser. There is no account, no upload, and no backend conversion endpoint.

Typical uses:

- Migrating a Spring Boot `application.properties` file to `application.yaml`.
- Turning a `.env` file into JSON or TOML for another stack.
- Moving settings between Kubernetes, Docker, and CI/CD tooling that expect different formats.

## Features

- **Private by design.** Conversion logic is a pure client-side function. Your data never leaves the browser.
- **Live output.** The result updates as you type, with errors shown inline.
- **Six formats, any direction.** 30 source-to-target pairs, each with its own statically generated page.
- **Editor-style UI.** Side-by-side panes, line and column indicator, swap button, sample inputs, copy to clipboard, and download of the converted file.
- **Deep links.** Open a specific conversion directly, for example `/tools/yaml-to-json`.
- **SEO-ready.** Per-conversion metadata, canonical URLs, Open Graph and Twitter tags, a generated `sitemap.xml`, and `robots.txt`.

## Supported Formats

| Format          | File extension | Parser           | Writer                  |
| --------------- | -------------- | ---------------- | ----------------------- |
| JSON            | `.json`        | `JSON.parse`     | `JSON.stringify`        |
| YAML            | `.yaml`        | `js-yaml`        | `js-yaml`               |
| XML             | `.xml`         | `fast-xml-parser`| `fast-xml-parser`       |
| TOML            | `.toml`        | `smol-toml`      | `smol-toml`             |
| Java Properties | `.properties`  | custom           | custom (flattened keys) |
| ENV             | `.env`         | `dotenv` + custom| custom                  |

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) and [React 19](https://react.dev/)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4, [shadcn/ui](https://ui.shadcn.com/), [Base UI](https://base-ui.com/), `tw-animate-css`
- **Icons:** [lucide-react](https://lucide.dev/)
- **Conversion engine:** `js-yaml`, `fast-xml-parser`, `smol-toml`, `dotenv`
- **Tooling:** ESLint 9, Bun (lockfile: `bun.lock`)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended, the repository ships a `bun.lock`), or
- Node.js 20.9 or newer with npm

### Installation

```bash
git clone https://github.com/it-chhean/configly.git
cd configly

# install dependencies
bun install
# or
npm install
```

### Run the development server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The converter lives at [`/tools`](http://localhost:3000/tools).

### Production build

```bash
bun run build
bun run start
```

No environment variables are required to build or run the project.

## Usage

### In the browser

1. Go to `/tools`.
2. Choose the **Source** and **Target** formats.
3. Paste your configuration into the left pane. The converted output appears on the right immediately.
4. Use the toolbar to **swap** formats, **copy** the output, or **download** it as `config.<ext>`.

### Direct conversion URLs

Every ordered pair of formats has a dedicated route of the form `/tools/<from>-to-<to>`:

```text
/tools/properties-to-yaml
/tools/yaml-to-json
/tools/json-to-toml
/tools/env-to-json
```

Valid slugs are `properties`, `yaml`, `xml`, `json`, `toml`, and `env`.

The `/tools` page also accepts query parameters. Values are case-sensitive and use the internal format names (`Property`, `Yaml`, `Xml`, `Json`, `Toml`, `Env`):

```text
/tools?from=Yaml&to=Json
```

### Using the converter as a module

The conversion logic is framework-independent and lives in [`lib/converter.ts`](./lib/converter.ts):

```ts
import { convertFormat } from "@/lib/converter";

const { success, result, error } = convertFormat(
  "server:\n  port: 8080",
  "Yaml",
  "Json",
);

if (success) {
  console.log(result);
  // {
  //   "server": {
  //     "port": 8080
  //   }
  // }
} else {
  console.error(error);
}
```

Signature:

```ts
type FormatLanguage = "Property" | "Yaml" | "Xml" | "Json" | "Toml" | "Env";

function convertFormat(
  input: string,
  fromLang: FormatLanguage,
  toLang: FormatLanguage,
): { success: boolean; result: string; error?: string };
```

### Example

Input (Properties):

```properties
server.port=8080
spring.datasource.username=dbadmin
spring.datasource.hikari.maximum-pool-size=10
```

Output (YAML):

```yaml
server:
  port: 8080
spring:
  datasource:
    username: dbadmin
    hikari:
      maximum-pool-size: 10
```

## Conversion Behavior and Limitations

Every conversion goes through the same pipeline: **source text, then a plain JavaScript object, then target text.** This keeps the six formats interoperable, but it also means some format-specific features do not survive a round trip.

- **Comments are not preserved.** Comments in the source are dropped.
- **Identical formats are a pass-through.** If source and target are the same, the input is returned unchanged.
- **Empty input returns empty output** without an error.
- **Type coercion (Properties and ENV).** The values `true`, `false`, `null`, and numeric strings are converted to booleans, `null`, and numbers. Surrounding quotes are stripped.
- **Properties keys.** Dots become nested objects (`a.b.c=1` becomes `{ a: { b: { c: 1 } } }`). On output, nested objects are flattened back to dot notation and arrays use index suffixes such as `list[0]`. Index suffixes in *input* keys are not expanded into arrays.
- **ENV keys.** Keys are lowercased and split on `_` into nested objects, so `SERVER_PORT` becomes `server.port`. This split is lossy for names that already contain underscores or hyphens: `SERVER_SERVLET_CONTEXT_PATH` becomes `server.servlet.context.path`, not `server.servlet.context-path`. On output, nested keys are joined with `_`, camelCase is split into `SNAKE_CASE`, and values containing whitespace, `#`, `=`, or quotes are quoted.
- **XML.** Attributes use the `@_` prefix. If the object has more than one top-level key, the output is wrapped in a `<configuration>` root element. XML values are read as strings or numbers by the parser, not as arbitrary types.
- **JSON input** must be an object or an array. A bare string or number is rejected.
- **Errors.** Parse failures are caught and returned as `{ success: false, error }`. The UI shows the message above the editors.

## Architecture

```text
┌───────────────┐   text   ┌──────────────────────┐   object   ┌───────────────┐   text
│  Source pane  │ ───────▶ │  parse (per format)  │ ─────────▶ │ write (target)│ ───────▶ Output pane
└───────────────┘          └──────────────────────┘            └───────────────┘
                         all in lib/converter.ts, running in the browser
```

- `components/feature/InputField.tsx` is a client component. It holds the editor state and calls `convertFormat` in an effect whenever the input or the selected formats change.
- `app/tools/[conversion]/page.tsx` pre-renders all 30 `from-to-to` routes with `generateStaticParams` and sets per-route SEO metadata. Invalid slugs return a 404.
- `app/sitemap.ts` generates the sitemap, including every conversion route.

## Project Structure

```text
configly/
├── app/
│   ├── layout.tsx              # Root layout and global metadata
│   ├── page.tsx                # Landing page
│   ├── globals.css
│   ├── sitemap.ts              # Generated sitemap
│   ├── not-found.tsx
│   ├── documents/page.tsx      # Format reference and resources
│   └── tools/
│       ├── page.tsx            # Converter (default pair)
│       └── [conversion]/page.tsx   # Converter for /tools/<from>-to-<to>
├── components/
│   ├── ui/                     # Generic primitives (accordion, link, background)
│   ├── feature/                # Converter-specific components (InputField, cards, ...)
│   ├── sections/               # Landing page sections
│   └── layout/                 # Navbar and Footer
├── data/                       # Static copy: FAQs, features, use cases, references
├── lib/
│   ├── converter.ts            # Conversion engine (start here)
│   └── utils.ts                # `cn` class-name helper
├── types/index.ts              # Shared TypeScript types
├── public/                     # Fonts, images, robots.txt
├── .github/                    # CI workflow and PR template
├── CONTRIBUTING.md
└── package.json
```

## Available Scripts

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `bun dev`       | Start the development server        |
| `bun run build` | Create a production build           |
| `bun run start` | Serve the production build          |
| `bun run lint`  | Run ESLint over the project         |

`npm run <script>` works equally well. There is currently no automated test suite. Type checking is done with `bunx tsc --noEmit`.

## Continuous Integration

The CI definition is [`.github/workflow/ci.yaml`](./.github/workflow/ci.yaml). It is configured to run on pull requests and pushes to `main` (ignoring Markdown, license, and `.gitignore` changes): install dependencies with a frozen lockfile, then lint, type check, and build.

> **Note:** GitHub Actions only discovers workflows under `.github/workflows/` (plural). The folder is currently named `workflow`, so rename it for this pipeline to run automatically.

Run the same checks locally before opening a pull request:

```bash
bun install --frozen-lockfile
bun run lint
bunx tsc --noEmit
bun run build
```

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first. It covers local setup, coding conventions, commit message style, the PR process, and a step-by-step guide to adding a new config format.

When adding or changing conversion behavior, keep it client-side. Configly's core promise is that configuration data never leaves the browser.

## License

No license file is included in this repository yet. Until one is added, all rights are reserved by the author. Please get in touch before reusing or redistributing this code.