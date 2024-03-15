---
sidebar_position: 1
---

# Modeling Source Nodes
Learn about source nodes and how to model them in nodestream.

## Introduction

In nodestream, a source node is a node that is conceptually the center point of a piece of data being ingested.
Relationships are defined relative to the source node.
For example, if you are ingesting data from a table in a relational database, the source node would often be the entity that table represents and forgein keys would be used to define relationships to other nodes in the graph.

Determining which node may be the source node is a critical step in the modeling process.
Here are some questions to consider when determining the source node:
- What is the primary entity that the data represents?
- What is the primary key of the data?
- What is the primary way that the data is queried?
- Can I define relationships to other nodes in the graph using this node?

:::note

There is **ONLY one source node per ingestion**. If you define multiple source nodes, the behavior is undefined (however, it currently overwrites the previous source node with the new one.)

:::

## Source Node Behavior

### Data Insertion
Source nodes are always upserted.
That means that if a node with the same key already exists, it will be updated with the new properties, relationships, and labels.
If a node with the same key does not exist, it will be created.

### Uniqueness

The source node, and in fact all nodes, have their a uniqueness is defined by the combination of its `type` and `key`.
The `type` is the label of the node and the `key` is the unique identifier of the node within the `type`.
For example, if you have a source node with the type `Person` and the key `email`, then the combination of `Person` and `email` must be unique across all `Person` nodes in the graph.
In the event that a node is referenced from another pipeline, the properties and relationships of the source node will be merged together with the new data.
If there are any conflicts, the new data will take precedence.

## Defining the Source Node

The source node is defined in the `source` block of the node definition.
Let's take an example at a user record from a json object:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "jdoe@example.com",
  "age": 30,
  "partner_id": 2,
  "employer_id": 12345,
  "status": "Active"
}
```

In this example, we'd likely want to define a `Person` node with the `id` as the key.
Here's how we'd define the source node in the node definition:

```yaml
- type: source_node
  node_type: Person
  key:
    name: !jmespath id
```

In this example, we're using the `!jmespath` tag to extract the `id` from the json object. Keep in mind that `key` is a map, so you can define multiple keys if you need to for a composite key.


### Defining Properties
Now, let's iterate on this model and add some more metadata to the source node.
In particular, we'll add the `name`, `age`, and `email` properties to the source node.

```yaml
- type: source_node
  node_type: Person
  key:
    name: !jmespath id
  properties:
    name: !jmespath name
    age: !jmespath age
    email: !jmespath email
```

Keep in mind that the `!jmespath` tag is used to extract the value from the json object.
It does not have to match the property name in the source node (e.g `age` could be called `years_old`)

### Indexing Fields

If you want to index a field, you can do so by adding the `additional_indexes` clause to the source node definition.
Here's an example of indexing the `email` field:

```yaml
- type: source_node
  node_type: Person
  key:
    name: !jmespath id
  properties:
    name: !jmespath name
    age: !jmespath age
    email: !jmespath email
  additional_indexes:
    - email
```

You may be wondering why its called `additional_indexes` and not just `indexes`.
Nodestream auotomatically indexes certain fields such as the `last_ingested_at` timestamp as well as the fields used in the `key` clause.
Also note that, the behavior of the `additional_indexes` clause as well as indexes automatically created by nodestream depends on the underlying graph database. See the documentation for your specific graph database for more information [here](../category/database-support).

:::note

The `additional_indexes` clause is a list, so you can add multiple indexes if you need to.

:::


### Adding Multiple Node Types

You can also apply additional types/labels to the source node by using the `addional_types` clause.
Recall that in our `status` field, we have a value of `Active`.
It may be nice to add a label to the source node based on the status.
Here's how you'd do that:

```yaml
- type: source_node
  node_type: Person
  key:
    name: !jmespath id
  properties:
    name: !jmespath name
    age: !jmespath age
    email: !jmespath email
  additional_indexes:
    - email
  additional_types:
    - Active
```

The `additional_types` clause is not considered as part of defining the uniqueness of the node.
In other words, the combination of `Person` and `id` must still be unique across all `Person` nodes in the graph regardless of what values are in the `additional_types` clause.
This is here to support querying and filtering of nodes in the graph.

:::note

The `additional_types` clause is a list, so you can add multiple types if you need to.

:::

### Defining Relationships

The [next guide](./relationship-building-techniques.md) will cover how to define relationships between nodes.
