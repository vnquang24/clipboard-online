# Clipboard online

## Workspace dependencies

Use pnpm 11.5.3 for this monorepo. Run `pnpm install` from the root or a
workspace package directory. The root `pnpm-lock.yaml` is the shared lockfile;
do not generate package-level lockfiles or use `npm install` in child packages.

Workspace packages live in `app/*`, `packages/*`, and `infra`.

Dependency versions are defined in the root `pnpm-workspace.yaml`:

- `catalog` contains shared versions. Reference them as `"catalog:"` in
  `dependencies`, `devDependencies`, or `peerDependencies`.
- `catalogs.web` preserves the web app's TypeScript 5 and Node 20 typings.
  Reference these as `"catalog:web"`.
- `catalogMode: prefer` prefers catalog entries when adding dependencies.

For example, a package can declare:

```json
{
  "devDependencies": {
    "@types/node": "catalog:",
    "typescript": "catalog:"
  }
}
```

To update a shared version, edit its catalog entry and run `pnpm install`.
To add a dependency already in the default catalog to a package:

```sh
pnpm --filter api add hono@catalog:
pnpm --filter web add -D eslint@catalog:
```

For dependencies between local packages, use the `workspace:*` protocol.

## Shared UI provider

`packages/ui` owns Ant Design dependencies and the shared theme. Versions live
in the root catalog. Web apps depend on `@clipboard-online/ui` via `workspace:*`.
The package exports TypeScript source; Next.js compiles it with `transpilePackages`,
so no separate UI build is required.

For Next.js App Router, wrap children in the root layout:

```tsx
import { NextUIProvider } from "@clipboard-online/ui/next";

// Inside <body>:
<NextUIProvider>{children}</NextUIProvider>
```

This includes the server-rendered style registry, `ConfigProvider`, and Ant
Design's `App` context. For React apps without Next.js, use `UIProvider` from
`@clipboard-online/ui` instead.

Edit `packages/ui/theme.ts` to change shared theme defaults. Providers accept
Ant Design `ConfigProvider` props, including `theme` and `locale`; theme tokens
passed by an app override the shared defaults.

Use components, icons, and context-aware feedback APIs in Client Components:

```tsx
"use client";

import { Button } from "@clipboard-online/ui/antd";
import { CopyOutlined } from "@clipboard-online/ui/icons";
import { useUI } from "@clipboard-online/ui";

export function CopyButton() {
  const { message } = useUI();

  return (
    <Button icon={<CopyOutlined />} onClick={() => message.info("Ready to copy")}>
      Copy
    </Button>
  );
}
```

Call `useUI()` in components beneath the provider to access `message`,
`notification`, and `modal` with the current theme and locale.
