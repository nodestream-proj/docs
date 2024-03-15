---
sidebar_position: 7
---

# Removing Data

Expire data from the database with a time to live (TTL) mechanism.

## Overview

The TTL mechanism is a way to expire data from the database after a certain amount of time.
This is useful for session data, temporary data, or data that is only relevant for a certain period of time.

In `nodestream`, every node and relationship is annotated with a `last_ingested_at` timestamp.
Users can then set the TTL of a node type or relationship type to expire data after a certain amount of time (in hours).
To actually expire the data, one must run a pipeline that uses this configuration to remove the data from the database.

## Implementing a TTL Pipeline

`nodestream` comes with a special extractor that can be used to implement the TTL mechanism called `TimeToLiveConfigurationExtractor`.
This extractor takes configurations specified and runs the TTL mechanism on the database.

```yaml
- implementation: nodestream.pipeline.extractors:TimeToLiveConfigurationExtractor
  arguments:
    graph_object_type: NODE
    configurations:
      - object_type: Person
        expiry_in_hours: 96
      - object_type: Occupation
        expiry_in_hours: 48
```

Remember, that old data will only actually be removed from the database when the pipeline is run.
TTL pipelines can be run like an other pipeline, for example using the `nodestream` CLI:

```bash
nodestream run ttl-pipeline --target database-to-remove-data-from
```

The same can be done for relationships:

```yaml
- implementation: nodestream.pipeline.extractors:TimeToLiveConfigurationExtractor
  arguments:
    graph_object_type: RELATIONSHIP
    configurations:
      - object_type: WORKS_AT
        expiry_in_hours: 24
      - object_type: FRIEND_OF
        expiry_in_hours: 48
```

Please see the [TimeToLiveConfigurationExtractor](../reference/extractors#timetoliveconfigurationextractor) for more information.
