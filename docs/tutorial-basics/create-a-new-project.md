---
sidebar_position: 1
---

# Create A Project
Get started with Nodestream by creating a new project.


Welcome to Nodestream! In this tutorial, we'll walk you through creating a new Nodestream project. We'll cover the following topics:

- [Create A Project](#create-a-project)
  - [Installation](#installation)
  - [Create A New Project](#create-a-new-project)
  - [Touring the Project](#touring-the-project)
    - [File Structure](#file-structure)
    - [`nodestream.yaml`](#nodestreamyaml)

## Installation

Before you get started, you'll need to install Nodestream. Follow the instructions in the [Installation](/docs/intro#installation) section.

## Create A New Project

To create a new Nodestream project, you can use the `nodestream new` command. 
This command will create a new directory with the project structure and files you need to get started.

```bash
nodestream new my_project
```

By default, the `nodestream new` will configure the project to use neo4j as the database.
If you prefer to use a different database, you can specify it with the `--database` option.
You can read more about the available options in the [Databases](./databases.md) section.
You can also configure the use of multiple or different databases in your project later.

```bash
nodestream new my_project --database neptune
```

## Touring the Project

### File Structure

The output of `nodestream new` will create a new project directory called `my_project` with the following structure:

```plaintext
.
├── my_project
│   ├── __init__.py
│   ├── argument_resolvers.py
│   ├── normalizers.py
│   └── value_providers.py
├── nodestream.yaml
├── pyproject.toml
└── pipelines
    └── sample.yaml
```

- `my_project` - This is the root directory of your project. It contains a python package for your project's code (if needed).
- `nodestream.yaml` - This is the configuration file for your project.
- `pyproject.toml` - This is the configuration file for your project's dependencies. Read more about [poetry](https://python-poetry.org/docs/) for more information. (You don't have to use poetry, but it's recommended.)
- `pipelines` - This is the directory where you will define your pipelines.
- `pipelines/sample.yaml` - This is a sample pipeline that was created for you.


### `nodestream.yaml`

The `nodestream.yaml` file is the configuration file for your project. By default, it will look like this:

```
scopes:
  default:
    pipelines:
    - pipelines/sample.yaml

targets:
  my-db:
    database: neo4j 
    uri: bolt://localhost:7687
    username: neo4j
    password: neo4j123
```

This file contains the configuration for your project's scopes and targets. 
We'll cover these in more detail in the [Managing Your Project](./managing-your-project.md) section.
For now, you can see that a `default` scope is configured to house the `sample.yaml` pipeline and a target called `my-db` is configured to use neo4j as the database.

