---
sidebar_position: 1
---

# Neo4j
One of the original graph databases.

## Introduction

Neo4j is a graph database management system developed by Neo4j, Inc. 
Neo4j is a graph database management system developed by Neo4j, Inc. 
Described by its developers as an ACID-compliant transactional database with native graph storage and processing, Neo4j is the most popular graph database according to DB-Engines ranking, and the 22nd most popular database overall.

Nodestream uses the official [Python Neo4j driver](https://neo4j.com/docs/getting-started/languages-guides/neo4j-python/) to connect to Neo4j databases. 

## Pre-requisites

To use Neo4j with Nodestream, you'll need to have a Neo4j database running and accessible from your Nodestream project.
Additionally, you'll need to have the [APOC library](https://neo4j.com/labs/apoc/) installed in your Neo4j database.
Internally, Nodestream uses the APOC library to perform various operations on the database, such as batch importing data.

## Compatability Matrix

Nodestream has been tested with the following versions of Neo4j:

| Nodestream Feature          | Neo4j Version | Supported |
| --------------------------- | ------------- | --------- |
| `nodestream copy`           | 4.4.X         | ✅         |
| `nodestream copy`           | 5.X.Y         | ✅         |
| `nodestream run`            | 4.4.X         | ✅         |
| `nodestream run`            | 5.X.Y         | ✅         |
| `nodestream migrations run` | 4.4.X         | ✅         |
| `nodestream migrations run` | 5.X.Y         | ✅         |

## Configuration Options

These configuration values are available for the Neo4j database and can be set in the `nodestream.yml` file in your `targets` section.

| Key                       | Description                                                                                                                                           | Required | Default |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `uri`                     | The URI of the Neo4j database.                                                                                                                        | ✅        | N/A     |
| `username`                | The username to use when connecting to the Neo4j database.                                                                                            | ✅        | N/A     |
| `password`                | The password to use when connecting to the Neo4j database.                                                                                            | ✅        | N/A     |
| `database_name`           | The name of the database to connect to.                                                                                                               | ❌        | `neo4j` |
| `use_enterprise_features` | Whether to use enterprise features of Neo4j.                                                                                                          | ❌        | `false` |
| "arbitrary values"        | Any other values that are valid for the [Python Neo4j driver](https://neo4j.com/docs/getting-started/languages-guides/neo4j-python/) can be set here. | ❌        | N/A  |

### Example Configurations


(1) A simple configuration for a local Neo4j database using Enterprise features and a custom database name:
```yaml
targets:
  my_neo4j_target:
    database: neo4j
    uri: bolt://localhost:7687
    username: my_username
    password: my_password
    database_name: my_database
    use_enterprise_features: true
```

(2) A more complex configuration for a remote Neo4j database using a custom driver arguments:
```yaml
targets:
  my_neo4j_target:
    database: neo4j
    uri: neo4j+s://my-neo4j-instance:7687
    username: my_username
    password: my_password
    database_name: my_database
    max_connection_lifetime: 3600
    max_connection_pool_size: 50
```

## Database Specifics

### Importing Data

Nodestream uses the APOC library to perform batch importing of data into Neo4j databases.
It uses a set of highly optimized Cypher queries to perform the import that are executed in parallel to maximize throughput.

### Database Migrations

This database supports migrations. 
Migrations are used to create indexes and constraints on the database and maintain a consistent schema.

As part of the migration process, the migrator will create `__NodestreamMigration__` nodes in the database. 
This node will have a name property that is set to the name of the migration.
Additionally, the plugin will create a `__NodestreamMigrationLock__` node in the database. 
This node will be exit when the migration process is running and will be deleted when the migration process is complete. 
This is used to prevent multiple migration processes from running at the same time.
