---
sidebar_position: 7
---

# GitHub

Automatically build a graph of your GitHub repositories and teams.

## Introduction

The GitHub Nodestream plugin extracts data from the GitHub REST API and ingests it into a graph database via nodestream pipelines. It is useful for building an inventory of your GitHub organization's repositories, teams, and membership relationships.

The plugin supports both GitHub.com and GitHub Enterprise Server (GHES).

## Maturity

This plugin is currently **STABLE** and is suitable for production use.

## Pre-requisites

To use the GitHub plugin you will need:

- Python `^3.12`
- A GitHub Personal Access Token (or GitHub App user access token) with read access to the organization resources you want to ingest
- A nodestream project with a graph database target configured

### Creating an Access Token

Follow the GitHub documentation to create a token:

- [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [GitHub App user access token](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)

The token value will be referenced as `GITHUB_ACCESS_TOKEN` in the configuration below.

## Features

The GitHub plugin currently supports ingesting and graphing the following resources:

- [x] Repositories (public and private, configurable)
- [x] Teams and team membership
- [x] GitHub Enterprise Server (GHES) support via custom hostname
- [x] Configurable pagination (`per_page`) and rate limiting (`rate_limit_per_minute`)

## Installation

To install the GitHub plugin, run the following command:

```bash
pip install nodestream-plugin-github
```

## Configuration

Add the following to your `nodestream.yaml` file:

```yaml
plugins:
  - name: github
    config:
      github_hostname: github.com          # Use your GHES hostname for Enterprise, e.g. github.example.com
      auth_token: !env GITHUB_ACCESS_TOKEN
      user_agent: my-nodestream-project
      per_page: 100
      collecting:
        all_public: true
      rate_limit_per_minute: 225
    targets:
      - my-db
```

### Configuration Options

| Key | Required | Default | Description |
|---|---|---|---|
| `github_hostname` | No | `github.com` | Hostname of your GitHub instance. Set to your GHES hostname for Enterprise. |
| `auth_token` | Yes | — | Personal access token or app token for authentication. |
| `user_agent` | Yes | — | User-agent string sent with API requests. Must be non-empty. |
| `per_page` | No | `30` | Number of results to fetch per API page (max 100). |
| `collecting.all_public` | No | `false` | When `true`, ingests all public repositories in the organization. |
| `rate_limit_per_minute` | No | `60` | Maximum number of API requests per minute. Set lower if you hit rate limit errors. |

## Usage

Set your access token in the environment:

```bash
export GITHUB_ACCESS_TOKEN=ghp_yourtoken
```

Verify the plugin has registered its pipelines:

```bash
nodestream show
```

The plugin provides two pre-configured pipelines:

- `github_repos` — ingests repository data
- `github_teams` — ingests team and membership data

Run them individually:

```bash
nodestream run github_repos --target my-db
nodestream run github_teams --target my-db
```
