---
sidebar_position: 3
---

# Kubernetes

Auotmatically provsiion and manage Kubernetes resources to run nodestream pipelines.

## Introduction

## Maturity

This plugin is currently in **PRE-ALPHA** and is not yet recommended for production use.

## Pre-requisites

Currently, there are no major pre-requisites for this plugin. 

## Features

Currently this plugin only has some features to print out some information from the project. 
However, the goal is to have the following features:

- Automatically deploy a nodestream project to the cluster
- Automatically manage the resources in the cluster

## Installation

To install the plugin, run the following command:

```bash
pip install nodestream-plugin-k8s
```

## Configuration

### 1. Create a `nodestream.yaml` file and project.

```yaml
scopes:
   crons: 
      pipelines:
        - path: pipelines/crons/my_scheduled_pipeline.yaml
  perpetual:
      pipelines:
        - path: pipelines/perpetual/my_kafka_pipeline.yaml
```


### 2. Annotate your pipeline with `nodestream-plugin-k8s` annotations.

```yaml
scopes:
   crons:
      pipelines:
        - path: pipelines/crons/my_scheduled_pipeline.yaml
          annotations:
            nodestream_plugin_k8s_schedule: "0 0 * * *"
    perpetual:
       pipelines:
          - path: pipelines/perpetual/my_kafka_pipeline.yaml
            annotations:
              nodestream_plugin_k8s_conccurency: 1
```

### 3. Run the following command to deploy the project to the cluster.

```bash
nodestream k8s sync --namespace my-nodestream-app-namespace 
```

**NOTE**: This step is a target state and is not yet implemented.
