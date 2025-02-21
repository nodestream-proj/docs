---
title: Nodestream 0.13 Release
authors: [zprobst]
tags: [release, nodestream]
---

# Nodestream 0.13 Release

We are happy to announce the release of Nodestream 0.13.
This release includes a number of new features and improvements. 
However, its breaking changes are minimal, so upgrading should be a breeze. 

## Breaking Changes

### Unified File Extractors 

In the past, we had separate file extractors for local, remote, and S3 files. 
This was a bit cumbersome for a couple of reasons: 

- On the maintainability side, we had to make sure that all of these extractors were kept in sync with each other. 
- On the user side, it was limiting to have to choose between these extractors when the only difference was the location of the file.

Starting with this release, we have unified these extractors into a single `UnifiedFileExtractor` extractor. 
This extractor can handle local, remote, and S3 files (so functionality is not lost). 

**Check out the docs on it [here](/docs/docs/reference/extractors/#the-file-extractor)**.

Core Contributors to this feature include:
- [Zach Probst](https://github.com/zprobst)
- [Angelo Santos](https://github.com/angelosantos4)

### Changing Source Node Behavior With `properties`

In the past, the `properties` key automatically lower cased all string property values. 
This was because there was one set of normalization rules for the entire source node interpretation.
However, this was a bit limiting because it was not possible to have different normalization rules for different properties.

Starting with this release, the `properties` key no longer automatically lower cases all string property values.
Instead, you can now define normalization rules for keys and properties separately (via the `key_normalization` and `property_normalization` properties).
However, if you specify the `normalization` key, it will apply to both keys and properties and will default to lower casing all string property values. 

## New Features

### Squashing Migrations

In the past, migrations were applied one by one in order. 
If during development, you were constantly iterating on a data model you could be constantly adding migrations. 
This resulted in a lot of migrations being applied that were essentially intermediary when going to production.
As a result, the migration node count could get quite large with a lot of "messy" migrations.

Starting with this release, you can now squash migrations.
This means that you can take a set of migrations and squash them into a single, optimized set of migrations.
This can be useful for cleaning up the migration node count and making it easier to understand the data model. 
Additionally, the old migrations are still stored in the project, so you can always go back to them if you need to. 
If a database has partially applied a sequence of migrations that was squashed, we can't used the squashed migration.
Instead, the logic will fall back to the original migrations. 

Core Contributors to this feature include:
- [Zach Probst](https://github.com/zprobst)
- [Angelo Santos](https://github.com/angelosantos4)

**Check out the docs on it [here](/docs/docs/tutorials-intermediate/working-with-migrations#squash-migrations)**.

### Compressed File Handling

Many users have data stored in compressed files.
This release adds support for compressed files that are `.gz`, `.bz2` in format.
This support is available in the `UnifiedFileExtractor` extractor.

**Check out the docs on it [here](/docs/docs/reference/extractors#the-file-extractor)**.

Core Contributors to this feature include:
- [Grant Hoffman](https://github.com/grantleehoffman)
- [Zach Probst](https://github.com/zprobst)

### Improved LLM Compatible Schema Printing 

The `llm` format is a format that is used to represent the schema of a graph. 
This release adds improved support for printing the schema in a format that is compatible with an llm.

In short, it uses a cypher-esque syntax to represent the schema of the graph:

```cypher
Node Types:
Person: first_name: STRING, last_name: STRING, last_ingested_at: DATETIME, age: STRING
Number: number: STRING, last_ingested_at: DATETIME
Relationship Types:
KNOWS: last_ingested_at: DATETIME
Adjancies:
(:Person)-[:KNOWS]->(:Person)
```

Core Contributors to this feature include:
- [Zach Probst](https://github.com/zprobst)
- [Angelo Santos](https://github.com/angelosantos4)

### Improved Error Messages in Value Providers 

Nodestream uses value providers to extract values from documents and map them to graph.
Every time you get an error in a value provider, it can be a bit tricky to debug. 
This release adds improved error messages to value providers to make it easier to debug issues.

Core Contributors to this feature include:
- [Yason Khaburzaniya](https://github.com/yasonk)
- [Zach Probst](https://github.com/zprobst)

### DynamoDB Extractor

DynamoDB is a popular NoSQL database that is used by many people to store data.
This release adds support for DynamoDB as a first class citizen via the `DynamoDBExtractor`.

**Check out the docs on it [here](/docs/docs/reference/extractors#dynamodbextractor)**.

Core Contributors to this feature include:
- [Angelo Santos](https://github.com/angelosantos4)
- [Zach Probst](https://github.com/zprobst)

### SQS and Queue Extractor Support 

Many users have data stored in SQS and other queue services.
This release adds support for SQS and other queue services via the `QueueExtractor`.
Concecptually, this extractor is similar to the `StreamExtractor` but for queues.

**Check out the docs on it [here](/docs/docs/reference/extractors#queueconnector)**.

Core Contributors to this feature include:
- [Grant Hoffman](https://github.com/grantleehoffman)
- [Zach Probst](https://github.com/zprobst)

### Release Attestations 

`0.13` marks the first release were nodestream and all of its dependencies are signed and attested to 
via [Github's Attestation support](https://github.blog/news-insights/product-news/introducing-artifact-attestations-now-in-public-beta/). This means that you can be sure that the code you are running is the code that was intended to be run.

### Dependency Updates 

This release includes updates to dependencies to keep Nodestream up to date with the latest and greatest. 
Some dependencies that were updated include:

- `httpx` to `>=0.27.0`
- `uvloop` to `>=0.17.0, <=0.19.0` (Not installed/used on Python 3.13 due to compatibility issues)
- `numpy` to `>=2.0.0`
- `pyarrow` to `17.0.0`
- `python` 3.13 has been added to the supported versions matrix.
- A variety of other dependencies have had their supported versions widened to be more permissive.

### Bug Fixes

- Fixed a bug where schema inference was not working correctly in some cases (with switch interpretations).
- Fixed a variety of bugs related to the pipeline runtime that were causing mishandled errors. 
