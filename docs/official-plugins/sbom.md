---
sidebar_position: 4
---

# Software Bill of Materials (SBOM)

An opinionated plugin for loading Software Bill of Materials (SBOM)

## Introduction

Nodestream plugin to import SBOM files in JSON formatted [CycloneDX](https://cyclonedx.org/) and [SPDX](https://spdx.dev/) into an opinionated graph data model in a graph database. Nodestream is a developer friendly Python framework for materializing and working with graph databases.

## Maturity

This plugin is currently is **PREVIEW** and should not be for production without sufficient testing.

## Pre-requisites

There are no pre-requisites to use the SBOM plugin aside from having a project to use it with.

## Features

The SBOM plugin currently supports the following features:

- [x] An opinionanted graph data model for SBOM data analysis
- [x] Support for JSON formatted [CycloneDX](https://cyclonedx.org/) and [SPDX](https://spdx.dev/) data files
- [x] Automated download of SBOM files from Github and import them into a graph
- [x] Automated export of SBOM files from [Amazon Inspector](https://aws.amazon.com/inspector/) and import them into a graph

## Installation

To install the SBOM plugin, run the following command:

```bash
pip install nodestream-plugin-sbom
```

## Configuration

The SBOM plugin comes with three pre-configured pipelines:

- `sbom` - This will import SBOM files from a local directory
- `sbom_github` - This will export SBOM files from the provided Github repo and import them into a graph database
- `sbom_amazon_inspector` - This will export SBOM files using [Amazon Inspector](https://aws.amazon.com/inspector/) and import them into a graph database

Once installed you will need to add some configuration depending on which pipeline you want to run:

### Local SBOM files

`nodestream.yaml` configuration

```
plugins:
- name: sbom
  config:
    paths: <The local directory or file with SBOM files to import>

targets:
  my-db:
    database: neptune
    graph_id: <YOUR GRAPH ID>
    mode: analytics
```

To run the pipeline:

```
nodestream run sbom --target my-db -v
```

### Github Repositories

`nodestream.yaml` configuration

```
plugins:
- name: sbom
  config:
    repos: [A list of owner/repos to import e.g. nodestream-proj/nodestream]

targets:
  my-db:
    database: neptune
    graph_id: <YOUR GRAPH ID>
    mode: analytics
```

To run the pipeline:

```
nodestream run sbom_github --target my-db -v
```

### Using it with Amazon Inspector

To use this the Amazon Inspector pipeline you must provide

`nodestream.yaml` configuration

```
plugins:
- name: sbom
  config:
    bucketName: <S3 Bucket Name>
    keyPrefix: <S3 Bucket Key Prefix>
    kmsKeyArn: <KMS Key ARN>

targets:
  my-db:
    database: neptune
    graph_id: <YOUR GRAPH ID>
    mode: analytics
```

## Usage

To run the pipeline:

```
nodestream run sbom --target my-db -v
```
