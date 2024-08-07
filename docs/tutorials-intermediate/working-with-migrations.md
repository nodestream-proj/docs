---
sidebar_position: 6
---

# Working With Migrations

Learn how to manage database changes in nodestream.

## Introduction

In nodestream, migrations are used to manage changes to the database schema.
Migrations are defined in a YAML file and are executed in order to bring the database schema up to date.
However, users do not generally need to write migrations directly.
Instead, nodestream provides a set of commands to generate migrations based on changes to the node and relationship definitions.

## Generating Migrations

To generate a migration, use the `nodestream migrations make` command.
This command will generate a migration file in the `migrations` directory of your project.
The migration file will contain the changes to the schema that are needed to bring the database up to date based on the current state of your project schema and what migrations have already been generated.
If you do not have a `migrations` directory, nodestream will create one for you
and generate a migration file that will create the current schema.

For example, if you add a new node definition to one of your pipelines, you can generate a migration to create the new node by running the following command:

```bash
nodestream migrations make
```

This will generate a migration file in the `migrations` directory of your project.

Note that not all possible changes to the schema are currently supported by migrations.
Nodestream currently supports the following types of changes:

- Adding a new node type
- Adding a new relationship type
- Adding a new property to a node type
- Adding a new property to a relationship type
- Adding a new index to a node type
- Adding a new index to a relationship type
- Removing a node type
- Removing a relationship type
- Removing a property from a node type
- Removing a property from a relationship type
- Removing an index from a node type
- Removing an index from a relationship type
- Extending the key of a node type
- Extending the key of a relationship type
- Renaming a node type
- Renaming a relationship type
- Renaming a property of a node type
- Renaming a property of a relationship type

:::note

Depending on the underlying graph database, some of these changes may not be supported or do nothing. See the documentation for your specific graph database for more information [here](../../category/database-support).

:::

## Running Migrations

To run the migrations, use the `nodestream migrations run` command.
This command will execute any migrations that have not yet been run.
You must specify what databases to target with the `--target` option.
For example, to run the migrations on the `default` database, you would run the following command:

```bash
nodestream migrations run --target default
```

If you have multiple databases, you can use the `--target` option repeatedly to specify multiple databases.

```bash
nodestream migrations run --target default --target other
```

## Squash Migrations 

Nodestream supports squashing migrations. 
This means that you can take a set of migrations and squash them into a single, optimized set of migrations.
This can be useful for cleaning up the migration node count and making it easier to understand the data model. 
Additionally, the old migrations are still stored in the project, so you can always go back to them if you need to. 
If a database has partially applied a sequence of migrations that was squashed, we can't used the squashed migration.
Instead, the logic will fall back to the original migrations. 

To squash migrations, use the `nodestream migrations squash` command.
This command requires passing the `--from` migration and optionally the `-to` migration to squash.

Lets assume you have migrations from 1 to 5 and you want to squash them into a single migration. 
You can run the following command:

```bash
nodestream migrations squash --from 1 --to 5
```

If `5` is the last migration, you can squash all migrations up to `5` by running:

```bash
nodestream migrations squash --from 1
```

## Rollback Migrations

Currently, nodestream does not support rolling back migrations.
