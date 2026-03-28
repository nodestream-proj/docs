---
sidebar_position: 1
---

# Open Source Best Practices

Recommendations for aligning the nodestream project with open source industry standards.

## Changelog

**Recommendation: Adopt [Keep a Changelog](https://keepachangelog.com/) format.**

Each plugin repository should maintain a `CHANGELOG.md` at the root with a consistent structure:

```markdown
## [Unreleased]

## [0.14.17] - 2025-03-01
### Added
- ...
### Fixed
- ...
### Deprecated
- ...
### Removed
- ...
```

Currently `neo4j-aura-sdk` has a `CHANGELOG.md` but most plugin repositories do not. A consistent changelog across all repos makes it easier for users to understand what changed between versions without reading commit history.

## Versioned Documentation

**Recommendation: Enable Docusaurus versioned docs.**

Docusaurus has built-in support for versioned documentation snapshots. When a major or minor release is cut, a snapshot of the current docs can be frozen:

```bash
yarn docusaurus docs:version 0.14
```

This creates a `versioned_docs/version-0.14/` directory. Users on older versions can then access docs for their installed version. Given that nodestream has active API evolution (migrations, interpreters, CLI flags), versioned docs would significantly reduce support burden.

See the [Docusaurus versioning documentation](https://docusaurus.io/docs/versioning) for setup instructions.

## Stability and Deprecation Policy

**Recommendation: Define and document a public API stability policy.**

Users building on nodestream need to know which interfaces are stable, which are experimental, and how much notice will be given before breaking changes. A short policy page covering:

- What constitutes a breaking change (CLI flags, YAML schema, Python import paths)
- How deprecations are communicated (deprecation warnings in code, changelog entries)
- Minimum notice period before removal (e.g., one minor version for deprecations)

Many mature open source projects use a simple three-tier model: **Stable**, **Beta**, **Experimental**.

## Issue and Pull Request Templates

**Recommendation: Add GitHub issue and PR templates to `.github/`.**

The `.github` repository in the org controls default community health files. Adding the following templates reduces issue noise and speeds up triage:

```
.github/
  ISSUE_TEMPLATE/
    bug_report.md
    feature_request.md
  pull_request_template.md
```

A minimal bug report template should capture: steps to reproduce, expected behavior, actual behavior, nodestream version, Python version, and database type. This information is almost always needed and currently has to be requested manually.

## Contributing Guide

**Recommendation: Add a `CONTRIBUTING.md` to each plugin repo (or link to a central one).**

The core `nodestream` repo has a `CODE_OF_CONDUCT.md` but most plugin repos lack contribution instructions. A `CONTRIBUTING.md` should cover:

- How to set up a local development environment (`poetry install`, `make test`)
- How to run the test suite
- Commit signing requirement (already enforced but not prominently documented)
- What a good PR looks like (linked issue, test coverage, changelog entry)
- How plugins are released and who has merge/release access

Alternatively, a single central contributing guide can live in the docs site and be linked from each plugin's README.

## README Badges

**Recommendation: Add standard badges to each plugin README.**

Badges give users an instant health signal before reading further. Recommended set:

```markdown
![PyPI version](https://badge.fury.io/py/nodestream-plugin-example.svg)
![Python versions](https://img.shields.io/pypi/pyversions/nodestream-plugin-example)
![CI status](https://github.com/nodestream-proj/nodestream-plugin-example/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/github/license/nodestream-proj/nodestream-plugin-example)
```

This is especially important given that Python version requirements vary significantly across plugins (3.10 through 3.12).

## Security Policy

**Recommendation: Add a `SECURITY.md` to each plugin repo.**

The core `nodestream` repo has a `SECURITY.md`. Plugin repos should either have their own or explicitly reference the core one. At minimum it should state:

- How to report a vulnerability (private disclosure channel or email)
- Expected response time
- Which versions receive security fixes

## Plugin Compatibility Matrix

**Recommendation: Add a compatibility table to the docs.**

With 10+ plugins at varying maturity levels and different Python version floors, a single reference table would reduce confusion:

| Plugin | Maturity | Python | Nodestream |
|---|---|---|---|
| nodestream-plugin-akamai | Beta | >=3.11 | ^0.14 |
| nodestream-plugin-dotenv | Stable | ^3.10 | ^0.14 |
| nodestream-plugin-github | Stable | ^3.12 | ^0.14 |
| nodestream-plugin-k8s | Pre-Alpha | ^3.10 | ^0.14 |
| nodestream-plugin-meta | Stable | ^3.10 | ^0.14 |
| nodestream-plugin-pedantic | Stable | ^3.10 | ^0.14 |
| nodestream-plugin-sbom | Preview | ^3.10 | ^0.14 |
| nodestream-plugin-shell | In Development | ^3.10 | ^0.14 |

This table should live on the main plugins landing page and be kept in sync with `pyproject.toml` files across repos.

## Release Automation

**Recommendation: Automate releases with GitHub Actions and `semantic-release` or `release-please`.**

Manual releases are error-prone and slow. Both `semantic-release` and Google's `release-please` can automatically:

- Parse conventional commits to determine the next version
- Generate a changelog entry
- Create a GitHub release with release notes
- Publish to PyPI via trusted publishing (no stored API tokens)

PyPI [Trusted Publishing](https://docs.pypi.org/trusted-publishers/) via OIDC is the current best practice — it eliminates long-lived PyPI API tokens from CI secrets entirely.
