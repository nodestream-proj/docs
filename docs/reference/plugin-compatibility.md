---
sidebar_position: 7
---

# Plugin Compatibility Matrix

Reference table for plugin maturity, Python version requirements, and nodestream core compatibility.

## Official Plugins

| Plugin | PyPI Package | Maturity | Python | Nodestream |
|---|---|---|---|---|
| Akamai | `nodestream-plugin-akamai` | Beta | `>=3.11,<4.0` | `^0.14` |
| Dotenv | `nodestream-plugin-dotenv` | Stable | `^3.10` | `^0.14` |
| GitHub | `nodestream-plugin-github` | Stable | `^3.12` | `^0.14` |
| Kubernetes | `nodestream-plugin-k8s` | Pre-Alpha | `^3.10` | `^0.14` |
| Meta | `nodestream-plugin-meta` | Stable | `^3.10` | `^0.14` |
| Neo4j | `nodestream-plugin-neo4j` | Stable | `^3.10` | `^0.14` |
| Neptune | `nodestream-plugin-neptune` | Stable | `^3.10` | `^0.14` |
| Pedantic | `nodestream-plugin-pedantic` | Stable | `^3.10` | `^0.14` |
| SBOM | `nodestream-plugin-sbom` | Preview | `>=3.10,<4.0` | `^0.14` |
| Shell | `nodestream-plugin-shell` | In Development | `^3.10` | `^0.14` |

## Maturity Definitions

See the [Stability and Deprecation Policy](../contributing/stability-policy) for a full description of each maturity tier.

| Tier | Production Ready |
|---|---|
| Stable | Yes |
| Beta | With testing |
| Preview | No |
| In Development | No |
| Pre-Alpha | No |

## Notes

- **GitHub plugin** requires Python `^3.12` — the highest floor of any plugin. Ensure your environment meets this if you are using it alongside other plugins.
- **Akamai plugin** requires Python `>=3.11` — incompatible with Python 3.10 environments.
- All other plugins support Python 3.10+.
- The nodestream core package requires Python `^3.10`.
