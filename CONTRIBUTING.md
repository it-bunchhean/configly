#### Contributing to Configly

Thanks for your interest in contributing to Configly a browser-based configuration file converter built with Next.js. This document explains how to set up the project locally and how to submit changes.

#### Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Adding a New Config Format](#adding-a-new-config-format)

#### Code of Conduct

Be respectful and constructive. Assume good intent, give clear and actionable feedback, and keep discussions focused on the project.

#### Getting Started

1. **Fork** the repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/configly.git
   cd configly
   ```

2. **Install dependencies** (Bun is recommended since the repo ships a `bun.lock`, npm works too):

   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the dev server:**

   ```bash
   bun dev
   # or
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) and go to `/tools` to work with the converter.

#### Development Workflow

1. Create a new branch off `main` for your change:

   ```bash
   git checkout -b type/short-description
   ```

   Examples: `feat/add-ini-format`, `fix/toml-array-parsing`, `docs/update-readme`.

2. Make your changes.
3. Run lint before committing:

   ```bash
   bun run lint
   # or
   npm run lint
   ```

4. Verify a production build still works:

   ```bash
   bun run build
   ```

5. Push your branch and open a pull request against `main`.

#### Coding Guidelines

- **TypeScript:** Keep types explicit for exported functions (see `lib/converter.ts` and `types/index.ts` for existing patterns). Avoid `any` where a real type is easy to express.
- **Components:** Follow the existing folder split — `components/ui` for generic/reusable primitives, `components/feature` for converter-specific pieces, `components/sections` for landing-page sections, `components/layout` for Navbar/Footer.
- **Styling:** Use Tailwind CSS utility classes and existing `shadcn/ui` / Base UI patterns rather than introducing a new styling approach. Reuse `lib/utils.ts` (`cn`) for conditional classNames.
- **Static content:** Copy such as FAQs, features, and use cases lives in `data/*.ts` — update it there rather than hardcoding strings in components.
- **Formatting:** Match the existing code style in the file you're editing. Run `bun run lint` and fix any warnings before opening a PR.
- **No server round-trips for conversion:** Configly's core promise is that config data never leaves the browser. Any new conversion logic should stay client-side.

#### Commit Messages

Use short, imperative commit messages, ideally following [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add INI format support
fix: correct nested array flattening in properties output
docs: clarify local setup steps
refactor: simplify XML root-tag handling
```

#### Submitting a Pull Request

- Keep PRs focused — one feature or fix per PR is easier to review than a bundle of unrelated changes.
- Fill out the [pull request template](./.github/PULL_REQUEST_TEMPLATE.md) completely, including how you tested your change.
- Link any related issue (e.g. `Closes #12`).
- Make sure `bun run lint` and `bun run build` both pass locally before requesting review.
- Be responsive to review feedback — small follow-up commits are fine, you don't need to force-push for every change.

#### Reporting Bugs

When filing a bug report, please include:

- Steps to reproduce (ideally with a sample config snippet)
- The source format and target format involved
- What you expected to happen vs. what actually happened
- Browser/OS, if it seems relevant

#### Suggesting Features

Feature requests are welcome, especially:

- Support for additional config formats (INI, HCL, .plist, etc.)
- Improvements to conversion accuracy for edge cases (nested arrays, comments, type coercion)
- UI/UX improvements to the `/tools` converter page

Open an issue describing the use case before starting significant work, so we can align on the approach first.

#### Adding a New Config Format

Most format work happens in [`lib/converter.ts`](./lib/converter.ts):

1. Add the new format to the `FormatLanguage` type.
2. Implement a `parseX` function that converts the raw text into a plain JS object.
3. Add an `objectToX` (or inline branch) that converts a plain JS object back into that format's text.
4. Wire both directions into `convertFormat()`.
5. Add the format to the UI (`components/feature/InputField.tsx` and related dropdowns) and to `data/faqs.ts` / `data/reference.ts` if applicable.
6. Test round-trip conversion (format → JSON → format) with a realistic sample file, including nested objects and arrays.

---

Thanks again for contributing — even small fixes (typos, docs, edge-case bugs) are genuinely appreciated!
