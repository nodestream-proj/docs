---
sidebar_position: 2
---

# Stability and Deprecation Policy

This page describes what users can rely on, how breaking changes are communicated, and how deprecations are handled across the nodestream project.

## Stability Tiers

Every plugin and feature in nodestream carries one of the following stability designations:

| Tier | Meaning |
|---|---|
| **Stable** | Public API is considered stable. Breaking changes require a major version bump and a full deprecation cycle. |
| **Beta** | API is functional and tested but may change in a minor release. Changes will be documented in the changelog. |
| **Preview** | Early access feature. API may change at any time. Not recommended for production. |
| **In Development** | Incomplete or experimental. Expect breaking changes without notice. |
| **Pre-Alpha** | Placeholder or prototype. No stability guarantees whatsoever. |

Plugin pages in this documentation show the current maturity level under the **Maturity** heading.

## What Counts as a Breaking Change

The following are considered breaking changes and require a major version bump or a deprecation cycle before removal:

- Removing or renaming a CLI command or flag
- Removing or renaming a YAML configuration key in `nodestream.yaml` or pipeline files
- Removing or renaming a public Python class or function exported by a plugin
- Changing the required Python version floor in a way that drops a currently supported version
- Changing the behavior of an existing feature in a way that alters output or requires pipeline changes

The following are **not** considered breaking changes:

- Adding new optional CLI flags or YAML keys with sensible defaults
- Adding new node or relationship types to a plugin's data model
- Internal implementation changes with no user-visible effect
- Bug fixes that correct clearly incorrect behavior

## Deprecation Process

When a stable feature is scheduled for removal:

1. A deprecation notice is added to the relevant documentation page
2. The feature emits a `DeprecationWarning` at runtime (where applicable)
3. The deprecation is noted in `CHANGELOG.md` under `Deprecated`
4. The feature is removed no sooner than the **next minor release** after the deprecation was announced

Example changelog entry:

```markdown
## [Unreleased]
### Deprecated
- `--old-flag` on the `run` command is deprecated. Use `--new-flag` instead. Will be removed in 0.15.0.
```

## Version Support

| Component | Supported versions |
|---|---|
| nodestream (core) | Latest minor (0.14.x) |
| Plugins | Latest minor matching core |

Older minor versions do not receive bug fixes or security patches. Users are encouraged to stay on the latest release.

## Semantic Versioning

All nodestream packages follow [Semantic Versioning](https://semver.org/):

- **Patch** (`0.14.x`) — bug fixes, no breaking changes
- **Minor** (`0.x.0`) — new features, deprecations announced, no breaking changes
- **Major** (`x.0.0`) — breaking changes, removal of previously deprecated features
