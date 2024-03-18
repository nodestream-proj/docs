---
sidebar_position: 2
---

# Amazon Neptune

A managed graph database service built by AWS.

## Introduction

Amazon Neptune is a fully managed graph database service developed by AWS. Amazon Neptune offers two graph systems, Neptune Database and Neptune Analytics. Nodestream supports both Neptune Database property graphs (RDF graphs are currently not supported) and Neptune Analytics.

Nodestream uses the official [AWS SDK for Python (Boto3)](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) to connect to Amazon Neptune.

## Pre-requisites

To use Neptune with Nodestream, you'll need to have a Neptune Database cluster or a Neptune Analytics graph running and accessible from your Nodestream project. If your Neptune Database cluster or Neptune Analytics graph requires IAM authentication, then you must [configure credentials](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#configuring-credentials). If Neptune Analytics with a private endpoint, or Neptune Database, then Nodestream must be run from an [environment with access to your VPC](https://docs.aws.amazon.com/neptune/latest/userguide/get-started-connecting.html#get-started-connect-ways).

## Compatibility Matrix

Nodestream support for Neptune is currently in a preview state and not all functions are supported.

### Neptune Database

Nodestream has been tested with the following versions of Neptune Database:

| Nodestream Feature          | Neptune Engine Version | Supported  |
| --------------------------- |------------------------|------------|
| `nodestream copy`           | 1.2.1.0                | ❌          |
| `nodestream copy`           | 1.3.0.0                | ❌          |
| `nodestream run`            | 1.2.1.0                | ✅          |
| `nodestream run`            | 1.3.0.0                | ✅          |
| `nodestream migrations run` | 1.2.1.0                | ❌          |
| `nodestream migrations run` | 1.3.0.0                | ❌          |

### Neptune Analytics

Nodestream is tested against the latest version of Neptune Analytics:

| Nodestream Feature          | Supported  |
| --------------------------- |------------|
| `nodestream copy`           | ❌          |
| `nodestream run`            | ✅          |
| `nodestream migrations run` | ❌          |

## Configuration Options

These configuration values are available for the Neo4j database and can be set in the `nodestream.yml` file in your `targets` section.

| Key                       | Description                                                                                                          | Required            | Default |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|---------------------|---------|
| `mode`                    | Either `database` or `analytics`, select which type of Amazon Neptune to target.                                     | ✅                   | N/A     |
| `host`                    | The cluster or instance endpoint and port to use when connecting to the Neptune database.                            | If `mode=database`  | N/A     |
| `graph_id`                | The graph identifier to use when connecting to Neptune Analytics.                                                    | If `mode=analytics` | N/A     |
| "arbitrary values"        | Any other values that are valid for the boto3 [Neptune Database](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/neptunedata.html) or [Neptune Analytics](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/neptune-graph.html) clients can be set here. | ❌        | N/A  |

## Database Specifics

(1) A simple configuration for an Amazon Neptune Database cluster:
```yaml
targets:
  my-neptune-database:
    database: neptune
    mode: database
    host: https://my-example-neptune.cluster-xxxxxxxxxxxx.region.neptune.amazonaws.com:8182
```

(1) A simple configuration for an Amazon Neptune Analytics graph:
```yaml
targets:
  my-neptune-analytics:
    database: neptune
    mode: analytics
    graph_id: g-xxxxxxxxxx
```

### Importing Data

Nodestream batches nodes and relationships into large parameterized OpenCypher queries, which are executed in parallel to perform the import into Amazon Neptune.

Nodestream for Amazon Neptune currently supports integer, floating-point, string, and boolean datatypes. Datetimes are automatically converted into POSIX-timestamps.

### Database Migrations

Migrations are currently not supported for Amazon Neptune.

### Limitations in Neptune Preview

#### Large ingests into Neptune Analytics

The current preview version of Neptune support for Nodestream is not suitable for large loads into Neptune Analytics. Large loads currently may lead to ConflictError's being thrown due to concurrent modification of data.
