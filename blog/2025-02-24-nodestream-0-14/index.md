---
title: Nodestream 0.14 Release
authors: [zprobst]
tags: [release, nodestream]
---

# Nodestream 0.14 Release

We are happy to announce the release of Nodestream 0.14.
This release includes a number of new features and improvements. 
However, its breaking changes are minimal, so upgrading should be a breeze. 

## Breaking Changes

### File Extractors 

In `0.13`, we introduced a united file handling extractor. However, we kept the old extractors around for backwards compatibility. 
Starting with this release, we have removed the old extractors and everything is now handled by 
the `UnifiedFileExtractor` extractor which is now renamed to `FileExtractor`.

**Check out the docs on it [here](/docs/docs/reference/extractors/#the-file-extractor)**.

Core Contributors to this feature include:
- [Zach Probst](https://github.com/zprobst)
- [Angelo Santos](https://github.com/angelosantos4)

## New Features

## Object Storage APIs 

Nodestream now has a new object storage abstraction. 
These APIs allow steps in your pipeline to interact with object storage to persist data between executions.
We see incredible value in this feature as it allows for more complex pipelines to be built. 
We've implemented serveral features in this relase that leverage this new abstraction. 

You can persist objects locally or in the cloud via AWS S3. 
Like large amounts of the framework it is plubbable and can be extended to support other object storage providers.

**Check out the docs on it [here](/docs/docs/reference/object-storage/)**.

Core Contributors to this feature include:
- [Zach Probst](https://github.com/zprobst)
- [Angelo Santos](https://github.com/angelosantos4)
- [Chad Cloes](https://github.com/ccloes)

## Extractor Checkpointing

Previously, extractors would always start from the beginning of their data source. 
If a pipeline crashed or was interrupted, the extractor would start from the beginning of the data source again. 
This lead to duplicate data being extracted, processed, and inserted into the database. 

Now with nodestream 0.14, extractors can now checkpoint their progress. 
This means that if a pipeline crashes or is interrupted, the extractor will be start from where it left off. 
To do this, the extractor will store a checkpoint via its object storage.
Therefore, in order to use this feature, you must have object storage configured during your pipeline execution.
Checkpoints are cleared when a pipeline is successfully completed.

Curious how to implement this for your extractor? We've update the tutorial on it [here](/docs/docs/tutorials-advanced/new-steps/#creating-an-extractor).


Core Contributors to this feature include:
- [Zach Probst](https://github.com/zprobst)
- [Angelo Santos](https://github.com/angelosantos4)
- [Chad Cloes](https://github.com/ccloes)

## Record Schema Enforcement

Nodestream now has a new record schema enforcement feature.
Nodestream pipelines tend to be highly dependent on the schema of the data being processed. 
Depending on the data source, the schema can change over time. 
This can lead to pipelines failing or producing incorrect results. 

With this new feature, you can now enforce a schema on your data.
This means that if the schema of the data changes, the pipeline will skip or warn about
the records that do not match the schema. 

Not only that, but you can also use this feature to automatically infer the 
schema of your data and then enforce it. 

**Check out the docs on it [here](/docs/docs/reference/filters/)**.

Core Contributors to this feature include:
- [Zach Probst](https://github.com/zprobst)
- [Angelo Santos](https://github.com/angelosantos4)
- [Chad Cloes](https://github.com/ccloes)
