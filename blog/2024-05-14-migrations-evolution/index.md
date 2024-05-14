---
slug: migrations
title: Migrations Design in Nodestream 0.12 
authors: [zprobst]
tags: [migrations, nodestream]
---

# Migrations Design in Nodestream 0.12 

In the release notes for Nodestream 0.12, we mentioned that we had added support for migrations. 
This is a feature that we have been wanting to add for a long time, and we are excited to finally have it in place. 
In this post, we will discuss what migrations are, why they are important, and how they work in Nodestream.

## Evolutionary Database Design

Evolutionary database design is the idea that the database schema should evolve over time as the application changes.
This is in contrast to the traditional approach of creating a fixed schema at the beginning of a project and then never changing it.
With evolutionary database design, the schema is treated as a living document that can be updated and modified as needed.
If you want to go deep into this topic, we recommend reading the [Martin Fowler's page](https://martinfowler.com/articles/evodb.html) on the subject.

## Why Migrations?

Migrations are a way to manage the evolution of the database schema in a controlled and repeatable way.
They allow you to define the changes that need to be made to the schema in a series of files that can be run in sequence.
This makes it easy to track changes to the schema over time and to apply those changes to multiple environments, such as development, staging, and production.

## Surveying All The Types of Schema Changes

Graph databases are schema-less, but the data model is still defined by the relationships between nodes and edges and the properties of those nodes and edges.
This means that there is still a schema to manage, even if it is not as rigid as a traditional relational database schema.
Since nodestream is agnostic to the underlying database, we need to be able to support migrations for all types of databases that nodestream can work with.
Therefore we need to support migrations that are designed against an abstract graph model and leave the implementation details to the specific database connector.
So lets examine the types of schema changes that can exist in a graph database:

### Creating New Nodes and Edges Types 

The most basic type of schema change is creating new node and edge types.
This is equivalent to creating a new table in a relational database.
When you create a new node or edge type, you may need to define the properties that it will have and the relationships that it will have with other nodes and edges.

Depending on the underlying database, this might involve creating a new index or constraint to enforce the uniqueness of the new node or edge type.

### Removing Nodes and Edges Types

Conversely, you may also need to remove existing node and edge types.
This is equivalent to dropping a table in a relational database.
Most graph databases do not support leaving orphaned nodes or edges, so you may need to delete all nodes and edges of the type that you are removing. 

### Adding Properties to Nodes and Edges

Another common type of schema change is adding properties to existing nodes and edges.
This is equivalent to adding a new column to a table in a relational database.
When you add a property to a node or edge, you may need to define a default value for that property or update existing nodes and edges to have a value for that property.

One tricky case is when you add a property that is part of the nodes or edges key.
In this case, you may need to update the key of the node or edge to include the new property.

### Removing Properties from Nodes and Edges

Conversely, you may also need to remove properties from existing nodes and edges.
This is equivalent to dropping a column from a table in a relational database.
When you remove a property from a node or edge, you may need to update existing nodes and edges to remove the value for that property.

### Adding and Removing Indexes

Another common type of schema change is adding and removing indexes.
Indexes are used to speed up queries by allowing the database to quickly find nodes and edges that match certain criteria.
When you add an index, you may need to define the properties that the index will be based on and the type of index that will be used.
When you remove an index, you may need to update existing indexes to remove the properties that the index was based on.

### Topological Changes

Finally, you may need to make topological changes to the schema such as adding or removing relationships between nodes and edges.
This is equivalent to adding or removing foreign keys in a relational database.

When you change the adjancency of nodes and edges, you may want to clean up the data to ensure that it is consistent with the new schema.
This may involve updating existing nodes and edges to reflect the new relationships or deleting nodes and edges that are no longer needed.

## How Migrations Work in Nodestream

In nodestream, migrations are defined as a series of yaml files that describe the changes that need to be made to the schema.
Each migration file contains a list of operations that need to be performed. 
For example, creating a new node type or adding a property to an existing node type.

When you run `nodestream migrations make` nodestream will create a new migration file in the `migrations` directory. 
That process works roughly like this:

- Nodestream will look at the current state of the schema by initializing and introspecting all pipelines (A).
- Build the state of the schema that is represented by the current migrations (B).
- Diff the two states (A and B) to determine the changes that need to be made to the schema.
- Generate a new migration file that describes the changes that need to be made to the schema.

When you run `nodestream migrations run` nodestream will apply the migrations in sequence to evolve the schema.
That process works roughly like this:

- Nodestream reads the migration files into memory and builds a graph of the dependencies between the migrations.
- Nodestream runs the migrations in topological order, applying the changes to the schema as it goes.
- Nodestream keeps track of which migrations have been applied so that it can skip them in the future.

Crucially, nodestream does not track all possible schema changes. 
Topological changes are not tracked, so you will need to handle those manually.
Additionally, nodestream does not support rolling back migrations, so you will need to handle that manually as well.

## Are Migrations Any Good?

Wondering what Martin Fowler would think of this design given is [page on the subject](https://martinfowler.com/articles/evodb.html)? 
He describes the concept of "evolutionary database design" with a set of characterisitcs. 
Some of them are more organizational than technical.

However, some of the technical ones are:

- **All Database Artifacts are Version Controlled with Application Code:** Nodestream's migrations are intended to be source controlled files that are run in sequence and define their dependencies. This makes it easy to evolve changes and continuously integrate them (which is another of the characteristics).
- **All database changes are database refactorings** Nodestream's migrations are a series of database refactorings that are run in sequence. This makes it easy to track changes to the schema over time and to apply those changes to multiple environments, such as development, staging, and production. We are detecting the changes that need to be made to the schema and applying them in a controlled and repeatable way.
- **Clearly Separate Database Access Code** You generally don't need to write database access code in nodestream, so this is taken care of :fireworks:
- **Automated the Refactorings** This is the main point of migrations. They are automated and can be run in sequence to evolve the schema.

We are happy with the design of the migrations in nodestream and we think that they are a good fit for the project. 
As we've mentioned, there are still some major evolutions to be made to migrations, such as the ability to rollback a migration, but we are confident that we are on the right track.

