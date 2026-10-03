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
Packages with no dependencies, such as `packages/ui`, do not need catalog
references until dependencies are added.
