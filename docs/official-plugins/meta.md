---
sidebar_position: 8
---

# Meta

Build a queryable graph of your graph's own schema.

## Introduction

The Meta Nodestream plugin introspects your nodestream project's pipeline configurations and materializes the inferred schema as a graph inside your database. The result is a meta-graph — a graph about your graph — where node types, properties, relationship types, and their adjacencies are all first-class queryable nodes.

This is useful for documentation, schema validation, impact analysis, and understanding how your data model evolves over time.

## Maturity

This plugin is currently **STABLE** and is suitable for production use.

## Pre-requisites

- Python `^3.10`
- A nodestream project with at least one pipeline defined

## Features

The Meta plugin currently supports the following features:

- [x] Infer the graph schema directly from your `nodestream.yaml` and pipeline files
- [x] Materialize the schema as a queryable graph in your database
- [x] Schema override files for enriching inferred types with additional metadata
- [x] Node types, properties, relationship types, and adjacency nodes in the meta-schema

## Meta-Schema

The plugin creates the following node types in your graph:

| Node Type | Description |
|---|---|
| `NodeType` | Represents a node type in your graph schema |
| `Property` | Represents a property on a node or relationship type |
| `RelationshipType` | Represents a relationship type in your graph schema |
| `Adjacency` | Represents a valid connection between two node types via a relationship |

Relationships in the meta-graph:

| Relationship | Description |
|---|---|
| `HAS_PROPERTY` | Connects `NodeType` or `RelationshipType` to its `Property` nodes |
| `TO` / `FROM` | Connects an `Adjacency` to its source and target `NodeType` nodes |
| `THROUGH` | Connects an `Adjacency` to the `RelationshipType` it traverses |

## Installation

To install the Meta plugin, run the following command:

```bash
pip install nodestream-plugin-meta
```

## Configuration

Unlike most plugins, Meta does not add pipelines automatically. You define a pipeline that uses the `SchemaRenderer` step.

### Basic Setup

Create a new pipeline file (e.g. `pipelines/meta.yaml`):

```yaml
- implementation: nodestream_plugin_meta:SchemaRenderer
```

This will locate your `nodestream.yaml` in the current working directory (or its parent directories) and render the schema to your configured graph database target.

### Specifying a Project Path

If your project file is not in the current directory:

```yaml
- implementation: nodestream_plugin_meta:SchemaRenderer
  parameters:
    project_path: /path/to/nodestream.yaml
```

### Using Schema Overrides

You can enrich the inferred schema with an overrides file to add properties or types that are not directly derivable from the pipeline configuration:

```yaml
- implementation: nodestream_plugin_meta:SchemaRenderer
  parameters:
    project_path: /path/to/nodestream.yaml
    overrides_path: /path/to/overrides.yaml
```

The overrides file format:

```yaml
nodes:
  - name: Person
    properties:
      is_cool:
        type: BOOLEAN
relations:
  - name: KNOWS
    properties:
      since:
        type: DATE
```

The overrides are merged with the inferred schema. You can add new node types, relationship types, or properties, or extend existing ones.

### Registering the Pipeline

Add the pipeline to your `nodestream.yaml`:

```yaml
scopes:
  default:
    pipelines:
      - pipelines/meta.yaml
    targets:
      - my-db
```

## Usage

Run the meta pipeline to materialize the schema:

```bash
nodestream run meta --target my-db
```

## Querying the Meta Graph

Once ingested, the schema can be queried like any other data in your graph.

Get all node types:

```cypher
MATCH (n:NodeType) RETURN n.name
```

Get all properties for a specific node type:

```cypher
MATCH (n:NodeType {name: 'Person'})-[:HAS_PROPERTY]->(p:Property)
RETURN p.name, p.type, p.is_key
```

Get all properties for a relationship type:

```cypher
MATCH (r:RelationshipType {name: 'KNOWS'})-[:HAS_PROPERTY]->(p:Property)
RETURN p.name, p.type, p.is_key
```

Get all adjacencies in the schema (which node types can connect to which):

```cypher
MATCH (a:NodeType)<-[:TO|FROM]-(adj:Adjacency)-[:TO|FROM]->(b:NodeType)
MATCH (adj)-[:THROUGH]->(r:RelationshipType)
RETURN a.name, r.name, b.name
```
