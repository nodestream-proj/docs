---
title: Migrating Data from Neo4j to Neptune with Nodestream 
authors: [zprobst]
tags: [neptune, nodestream, neo4j]
---

# Migrating Data from Neo4j to Neptune with Nodestream 

One of nodestream's chief missions is to make it easy to decouple yourself from any particular graph database. 
This is especially important when you are working with a cloud-native architecture, where you may want to use a different graph database for different use cases or even migrate from one graph database to another and prevent the dreaded vendor lock-in.

In this post, we're exploring how to migrate data between two graph database technologies. 
In this case, we're migrating data from Neo4j to Amazon Neptune however the same principles apply in reverse or to other graph databases.

## Strategy 

Nodestream has two major features that make the migration process easier:

- **Migrations** - Nodestream has a built-in migration system that allows you to refine your database schema over time.
- **copy** - `nodestream copy` is a command that allows you to copy data from one graph database to another.

## Configuring Our Databases 

To get started, we need to configure our databases.
In nodestream, we do this via the `targets` section in the `nodestream.yaml` file.
Since we're exploring a migration from Neo4j to Neptune, we'll need to configure both databases.

In a real-world scenario, you likely already have a neo4j database configured similar to this:

```yaml
targets:
   my-neo4j-database:
     database: neo4j
     uri: bolt://localhost:7687
     username: neo4j
     password: password
```

So we can create a neptune database configuration like this:

```yaml
targets:
   my-neptune-database:
    database: neptune
    mode: database
    host: https://my-example-neptune.cluster-xxxxxxxxxxxx.region.neptune.amazonaws.com:8182
```

Note: neptune supports both a `database` mode, which is a transactional graph database, 
and a `analytics` mode, which is a analytically optimized graph database for graph data science algorithms.

## Applying Migrations 

Now that we have our databases configured, we can use the `nodestream migrates run` command to apply our migrations to the target database.

```bash
nodestream migrations run --target my-neptune-database
```

This will apply any changes nessary to the target database to make it compatible with the source database. 
In the case of neptune, where indexes and constraints are not as explicit as in neo4j, this is a no-op for most changes 
and therefore should complete rather quickly.

## Copying Data

Now that we have our databases configured, we can use the `nodestream copy` command to copy data from Neo4j to Neptune.
If you simply want to copy everything, wholesale, you can use the `--all` flag.

```bash
nodestream copy --source my-neo4j-database --target my-neptune-database --all
```

If you want to copy only a subset of the data, you can use the `--node` and `--relationship` flags to specify which nodes and relationships to copy.

```bash
nodestream copy --source my-neo4j-database --target my-neptune-database --node Person --relationship KNOWS
```

And you can copy more than one node or relationship at a time by separating them by repeating the flag.

```bash
nodestream copy --source my-neo4j-database --target my-neptune-database --node Person --node Movie --relationship KNOWS --relationship ACTED_IN
```

Depending on the size of your database, this process may take some time. 
If you are doing this in a real-world scenario, you may want to consider the following changes:

1. Copy single nodes and relationships at a time to reduce the load on the target database. 
2. Quiese writes to the target database to prevent missing some data or long copy times.
3. Use `--json` to get nice structured logging from the copy process.

## Conclusion

In this post, we explored how to migrate data from Neo4j to Amazon Neptune using Nodestream.
We covered how to configure our databases, apply migrations, and copy data.
Using nodestream to ingest, manage, and migrate your data will help you decouple yourself from any particular graph database and prevent vendor lock-in.
