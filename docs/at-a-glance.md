---
sidebar_position: 2
---

# At a Glance
Understand the fundemental concepts in Nodestream.

## What is Nodestream?

Nodestream is a framework for dealing with semantically modeling data as a graph.
It is designed to be flexible and extensible, allowing you to define how data is collected and modeled as a graph.
It uses a pipeline-based approach to define how data is collected and processed, and it provides a way to define how the graph should be updated when the schema changes.
All of this is done using a simple, human-readable configuration file in `yaml` format.
To accomplish this, Nodestream uses a number of core concepts, including pipelines, extractors, transformers, filters, interpreters, interpretations, and migrations.
These tools together describe the venacular of nodestream and its Domain Specific Language (DSL).


The goal of this document is to provide a high-level overview of the core concepts in Nodestream. It is not intended to be a guide or a tutorial, but rather a reference for understanding the core concepts. If thats what you are looking for, **check out the** [Tutorial Series](./tutorials-basics/create-a-new-project) starting with creating a new project.

## Core Concepts

### Pipelines

Pipelines are the core of nodestream.
They define how data is collected and eventually processed into nodes and relationships.
Pipelines are literally a sequence of steps that are executed in order for each piece of data.
They consist of extractors (which get data), transformers and filters (which massage data) and interpreters and interpretations (which model data as a graph).

For example, this is a simple pipeline that creates a bunch of numbered nodes:

```yaml
# This extractor generates numbers ad produces records like this:
# { "index": 1 }
- implementation: nodestream.pipeline:IterableExtractor
  factory: range
  arguments:
    stop: 100000

# This interpreter takes the records and creates a node for each one.
- implementation: nodestream.interpreting:Interpreter
  arguments:
    interpretations:
      - type: source_node
        node_type: Number
        key:
          number: !jmespath index
```

While nodestream implements the same ETL (Extract, Transform, Load) pattern as other tools, it is primarily focused on the last mile of the process: the Load into a graph database.
This is why the pipeline is focused on defining how data is modeled as a graph, rather than how it is transformed or extracted.
Nodestream does have support for transforming and filtering data, but it is not the primary focus of the framework.
If you have big data or complex transformations, you should consider using a tool like [Apache Airflow](https://airflow.apache.org/) to do the heavy lifting and then use nodestream to model the data as a graph and load it into a graph database.

### Extractors

Extractors are the first step in a pipeline.
They are responsible for getting data from somewhere and producing records. Records are just dictionaries of data that are passed through the pipeline. And nodstream [has a bunch built in](reference/extractors).

### Transformers and Filters

Transformers and filters are optional steps in a pipeline.
They are responsible for massaging the data in some way.
Transformers are used to change the data in some way, while filters are used to remove records from the pipeline based on some condition.

For example, you might make a transformer that does some math on the number, or a filter that removes numbers that are not even.
These could be implemented in python and referenced in your pipeline file.

```python
from nodestream.pipeline import Transformer, Filter

class AddOne(Transformer):
    async def transform_reocrd(self, record):
        record['number'] += 1
        return record


class IsEven(Filter):
    async def filter_record(self, record):
        return record['number'] % 2 == 0
```

```yaml
- implementation: nodestream.pipeline:IterableExtractor
  factory: range
  arguments:
    stop: 100000

- implementation: my_module.AddOne # Transformer
- implementation: my_module.IsEven # Filter

- implementation: nodestream.interpreting:Interpreter
  arguments:
    interpretations:
      - type: source_node
        node_type: Number
        key:
          number: !jmespath index
```


### Interpreters and Interpretations

Interpreters provide a way to map your data that you have extracted (and optionally transformed and filtered) into nodes and relationships in the graph.
Interpretations are the individual instructions that define how the data should be modeled as nodes and relationships.

For example, from our previous example, we have an interpreter that creates a node for each number by using the `source_node` interpretation:

```yaml
- implementation: nodestream.interpreting:Interpreter
  arguments:
    interpretations:
      - type: source_node
        node_type: Number
        key:
          number: !jmespath index
```

If you want to dive deeper into the interpretation system, **check out the** [Source Node Model](../tutorials-intermediate/source-nodes) and [Relationship Building](../tutorials-intermediate/relationship-building-techniques) tutorials.

### Migrations

In nodestream, migrations are a way to define how the graph should be updated when the schema changes.
Similar to frameworks like [Django](https://docs.djangoproject.com/en/5.0/topics/migrations/) and [Alembic](https://alembic.sqlalchemy.org/en/latest/), migrations are a way to define how the graph should be updated when the schema changes.

In nodestream, after you make changes to one of your pipelines, you can run `nodestream migrations make` to generate a migration file.
Assume you just added a new relationship to a node type in your schema.
If you ran `nodestream migrations make`, it would generate a file in the `migrations` directory of your project that looks something like this:

```yaml
dependencies:
  - "20240223074039.yaml"
name: '20240223074041'
operations:
- arguments:
    keys: !!set {}
    name: KNOWS
    properties: !!set
      last_ingested_at: null
  operation: CreateRelationshipType
- arguments:
    field_name: last_ingested_at
    relationship_type: KNOWS
  operation: AddAdditionalRelationshipPropertyIndex
```

If you look carefully, you can see that this file is a list of operations that need to be performed to update the graph to reflect the new schema and should reflect the changes you made to your pipeline.

This file will contain the changes that need to be made to the graph to reflect the new schema.
Then you can run `nodestream migrations run -t my-db` to apply the migration and update the graph to the `my-db` target in your configuration.

### Projects, Targets, Plugins, Scopes Oh My!

A nodestream project is defined in terms of a project file (`nodestream.yaml`).
This file contains the configuration for the project, including the pipelines, database targets, and plugin configurations.
A project can have multiple targets, which are different databases that you want to load data into.
For example, you might have a `dev` target that points to a local development database, and a `prod` target that points to a production database.

A plugin is a way to extend nodestream with custom functionality.
Since many parts of nodestream are pluggable, there is many possible things a plugin could do.
Plugins can vary from adding new pipelines and pipeline steps, to adding new database connectors, to adding new interpreters and interpretations.
The possibilities are endless.

A scope is effectively a namespace for your pipelines.
It is a way to organize your pipelines into logical groups.
For example, you might have a `crons` scope for pipelines that are run on a schedule, and a `manual` scope for pipelines that are run on demand.


If you are interested in diving deeper into project configuration, **check out the** [Project Configuration Tutorial](./tutorials-intermediate/configuring-projects).
