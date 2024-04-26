# Nodestream Neptune Support

The recent release of Nodestream 0.12 has introduced support for Amazon Neptune as the first step towards broader multi-database support. Nodestream provides a flexible tool to perform bulk ETL into Amazon Neptune Database and Amazon Neptune Analytics.

This post will give a quick overview of the new Amazon Neptune support, offer some examples to get started, and list some features planned for future releases.

## Overview

Support for AWS Neptune is split into two modes, DB and Analytics. Both modes leverage the AWS SDK to load data via batched openCypher queries. Nodestream is compatible with Neptune DB engine version 1.2.1.1 or higher, as well as Neptune Analytics.

## Capabilities

Nodestream with Neptune currently supports standard ETL pipelines as well as time to live (TTL) pipelines. ETL pipelines enable bulk data ingestion into Neptune from a much broader range of data sources and formats than have previously been possible in Neptune.

Nodestream's TTL mechanism also enables new capabilities not previously available in Neptune. By annotating ingested graph elements with timestamps, Nodestream is able to create pipelines which automatically expire and remove data that has passed a configured lifespan.

## Usage

### Prerequisites

Neptune must be reachable from whichever environment you intend to run Nodestream. Both Neptune Database, as well as Neptune Analytics with a private endpoint, are restricted to VPC-only access. If you intend to use a Neptune Analytics graph with a public endpoint, no special considerations are required.

Check out the [Neptune User-Guide](https://docs.aws.amazon.com/neptune/latest/userguide/get-started-connecting.html) for more information about connecting to a VPC-only host. You can test the connection with this curl command:

```shell
curl https://<NEPTUNE_ENDPOINT>:<PORT>/openCypher/status
```

### IAM Auth

Nodestream fully supports IAM Authentication when connecting to Amazon Neptune, as long as credentials are properly configured. See the [boto3 credentials guide](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#configuring-credentials) for more instruction on correctly configuring credentials.

### Configuration Examples

The connection configuration for Neptune contains a switch between two modes: `db` and `analytics`. Neptune DB mode will connect using a Neptune Database cluster or instance endpoint, while Neptune Analytics will connect via the graph identifier.

#### Neptune Database:

```yaml
targets:
  db-one:
    database: neptune
    mode: database
    host: https://<NEPTUNE_ENDPOINT>:<PORT>
```

#### Neptune Analytics:

```yaml
targets:
  db-one:
    database: neptune
    mode: analytics
    graph_id: <GRAPH_IDENTIFIER>
```

Check out the [Nodestream basics tutorial](../../../../../docs/category/tutorial---basics) for a complete guide to getting started with Nodestream and Neptune.

## Future Roadmap

We have several new features planned to bring additional functionality in upcoming releases.

One feature we are excited to bring to the Nodestream Neptune plugin is support for the new Nodestream Migrations API. Some migrations are not applicable in Neptune as it does not use user-defined indices. However, support for applicable migrations, such as renaming properties, will be added in an upcoming release.

We are additionally planning to add expanded datatype support. Currently, the Neptune plugin supports string, boolean, and numeric types. Datetime types are automatically converted into epoch timestamps. We aim to expand this list such that any extracted types which are supported by Neptune can be loaded without casting or conversion.

Our future work will also include further performance assessments and optimizations. We will continue to optimize the generated queries in order to maximize the performance and scalability of Nodestream with Neptune.

## Get Involved

The inclusion of new features is heavily dependent on community feedback, if there are any additional features or configurations which you would find valuable, please create an issue on [GitHub](https://github.com/nodestream-proj/nodestream-plugin-neptune/issues) with the request.
