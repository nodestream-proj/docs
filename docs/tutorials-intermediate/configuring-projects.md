---
sidebar_position: 5
---

# Configuring Projects and Pipelines
How to manage the configuration of your nodestream project.

## Fundementals

A nodestream pipeline is declarative.
As a result, the pipeline tends to be a combination of configuration and logic.
While the logic is likely to remain static, the configuration is likely to change between environments.

For example, you may have a pipeline that reads from an API endpoint in development, but a different API endpoint in production.
Ideally, you would be able to inject the configuration for the API endpoint into the pipeline at runtime.

## Argument Resolvers

Argument resolvers solve the problem of injecting configuration into a pipeline.
They are fundemental to the nodestream DSL.
Each argument resolver is a YAML tag that is resolved at runtime by its means of configuration.
For example, the `!env` argument resolver resolves to the value of an environment variable

## Configuring Pipelines

### Injecting Environment Variables with `!env`

As mentioned, the `!env` argument resolver resolves to the value of an environment variable.
This is useful for injecting configuration into a pipeline at runtime.

Lets take our example from earlier. Imagine the start of our pipeline file looks like this:

```yaml
- implementation: nodestream.pipeline.extractors:SimpleApiExtractor
  arguments:
    url: https://example.com/people
```

In development, we want to use a different API endpoint.
We can use the `!env` argument resolver to inject the configuration at runtime.

```yaml
- implementation: nodestream.pipeline.extractors:SimpleApiExtractor
  arguments:
    url: !env API_ENDPOINT
```

Now, we can set the `API_ENDPOINT` environment variable to `https://example.com/people` in production, and `https://example.com/people-dev` in development.

NOTE: If you are looking to inject environment variables from a `.env` file, you can use the `nodestream-plugin-dotenv` package to load the `.env` file and inject the environment variables into the process.
Read more [here](../../official-plugins/dotenv).

### Injecting File Contents with `!include`

The `!include` argument resolver resolves to the contents of a file.
This is most useful for injecting large configuraiton blobs into a pipeline and
as an interpretation sharing technique.

For example, imagine we have two pipelines that share a common set of interpretations.
We can extract the interpretations into a file and include it in both pipelines.

```yaml
- implementation: nodestream.interpreting:Interpreter
  arguments:
    interpretations: !include common/interpretations.yaml
```

:::note 

The path is relative to the project root, not the pipeline file.

:::

### Injecting Configuration with `!config`

The `!config` argument resolver resolves to the value of a configuration key.
`!config` is useful for injecting configuration from a speicfied name and allows for a more structured configuration.
The [Project Configuration](#configuring-projects) section explains how to set/map configuraiton in the project.
Configuration can then be used inline in the pipeline.

```yaml
- implementation: nodestream.pipeline.extractors:SimpleApiExtractor
  arguments:
    url: !config api_endpoint
```

### Annotations

Annotations are a way to accomplish two tasks:
1. Add metadata to a pipeline
2. Conditionally include or exclude parts of a pipeline

Annotations are optionally added to each step in a pipeline.
They are a list of strings that are effectively tags for the step.

For example, lets say in a live environment we want to pull data from an API, but in a test environment we want to pull data from a file. We can use annotations to conditionally include the step.

```yaml
- implementation: nodestream.pipeline.extractors:SimpleApiExtractor
  arguments:
    url: !env API_ENDPOINT
  annotations:
    - live

- implementation: nodestream.pipeline.extractors:FileExtractor
  arguments:
    globs:
      - !env FILE_PATH
  annotations:
    - test
```

Then when we want to run the pipeline in a live environment, we can use the `--annotation` flag to include only the steps with the `live` annotation.

```bash
nodestream run my-pipeline --annotation live
```

Note that steps with no annotations are always included and if you supply multiple annotations, steps that match any of the annotations are included.

## Configuring Projects

### Annotations
Annotations are key-value pairs that are used to add metadata to a project.
They are useful for adding metadata to a project that can be used by plugins or other tools.
For example, you may want to add a `schedule` annotation to a project to indicate how often the pipelines in the project should be run by some scheduler.

Annotations are displayed when you run `nodestream show` and especially useful in `nodestream show --json` for programmatic access to the metadata.

### Targets
Targets are a destination Graph Database for the output of a pipeline.
For each target you can specify the connection details and credentials.
The configuration is highly dependent on the target database type, so it is best to refer to the documentation for the target database you are using [here](../../category/database-support/).

```yaml
# nodestream.yaml
targets:
  my-target:
    database: neo4j # The type of database; neo4j, neptune, etc.
    # ... Connection details and credentials for your target database
```

In other parts of the project or from the cli, you can refer to the target by its name, `my-target` in this case.

:::note

You _may_ specify targets inside of your project configuration, by specifying the `targets` key at the [scope](#scope-level-targets) level or at the [pipeline](#pipeline-level-targets) level.

:::


#### Delaying Evaluation with `!delayed`

The `!delayed` argument resolver delays the evaluation of the argument until the consuming component (if supported) is ready to evaluate it.
This is useful for injecting configuration that is not available at the time of pipeline definition or for allowing the component to re-evaluate the argument at runtime.
For instance, the neo4j connector can accept  `!delayed` for the username and password arguments.

```yaml
targets:
  my-target:
    database: neo4j 
    uri: bolt://localhost:7687
    username: !delayed 
      value: !env MY_NEO4J_USERNAME
    password: !delayed
      value: !env MY_NEO4J_PASSWORD
```

### Scopes And Pipelines

A nodestream project is a collection of pipelines.
Pipelines are organized into one or more scopes.
Conceptually, you can think of a scope as a namespace or folder for pipelines.

For example, you may have a scope for all of your data warehouse pipelines, and another scope for all of your web scraping pipelines.
Another common pattern is to have a scope for each way the pipeline is used, such as `cron` and `perpetual` to represent pipelines that are run on a schedule and pipelines that are always running, respectively.
Regardless of how you choose to organize your pipelines, scopes are a way to group pipelines together and nodestream does not enforce any particular organization.

#### Simple Configuration

```yaml
scopes:
  cron:
    pipelines:
      - pipelines/warehouse.yaml
      - pipelines/web-scraping.yaml
  perpetual:
    pipelines:
      - pipelines/kafka-consumer.yaml
```

#### Scope Level Configuration

Configuration (that can be used via `!config`) can be set at the scope level.
This is useful for setting configuration that is shared across multiple pipelines in a scope.

```yaml
scopes:
  cron:
    config:
      api_endpoint: https://example.com/api
    pipelines:
      - pipelines/warehouse.yaml
      - pipelines/web-scraping.yaml
  perpetual:
    config:
      api_endpoint: https://example.com/api
    pipelines:
      - pipelines/kafka-consumer.yaml
```

Note that configuration can use other argument resolvers, such as `!env` and `!include` to inject environment variables and file contents into the configuration.

For example:

```yaml
scopes:
  cron:
    config:
      api_endpoint: !env API_ENDPOINT
    pipelines:
      - pipelines/warehouse.yaml
      - pipelines/web-scraping.yaml
# ...
```

#### Scope Level Annotations

Annotations can be set at the scope level.
The effect is that all pipelines in the scope inherit the annotations.

```yaml
scopes:
  cron:
    annotations:
      schedule: "0 0 * * *"
    pipelines:
      - pipelines/warehouse.yaml
      - pipelines/web-scraping.yaml
```

#### Scope Level Targets

Targets can be set at the scope level.
The effect is that all pipelines in a scope implictly write to the target(s) specified at the scope level.

```yaml
scopes:
  cron:
    targets:
      - my-target
    pipelines:
      - pipelines/warehouse.yaml
      - pipelines/web-scraping.yaml
```

#### Naming Pipelines

By default, the name of the pipeline is the name of the file without the `.yaml` extension.
You can override the name of the pipeline by specifying the `name` key in the pipeline configuration.

```yaml
scopes:
  cron:
    pipelines:
      - name: my-warehouse-pipeline
        path: pipelines/warehouse.yaml
```

#### Pipeline Level Annotations

Annotations can be set at the pipeline level.
This is useful for adding metadata to a pipeline that is not shared with other pipelines in the scope.

```yaml
scopes:
  cron:
    pipelines:
      - path: pipelines/warehouse.yaml
        annotations:
          schedule: "0 0 * * *"
      - path: pipelines/web-scraping.yaml
        annotations:
          schedule: "0 10 * * *"
```


#### Pipeline Level Targets

Targets can be set at the pipeline level.
This is useful for specifying that a pipeline writes to a different target than the one specified at the scope level.

```yaml
scopes:
  cron:
    pipelines:
      - path: pipelines/warehouse.yaml
        targets:
          - my-other-target
      - path: pipelines/web-scraping.yaml
```

You can also specify that the pipeline does not inherit the targets from the scope by `exclude_inherited_targets` key.

```yaml
scopes:
  cron:
    targets:
      - my-target
    pipelines:
      - pipelines/web-scraping.yaml
      - path: pipelines/warehouse.yaml
        exclude_inherited_targets: true
        targets:
          - my-other-target
```

In this case, the `warehouse` pipeline writes to `my-other-target` and the `web-scraping` pipeline writes to `my-target`.

### Project Plugins


#### Specifying Plugin Configuration

In nodestream, some plugins can be used to compose new scopes and pipelines
into your project.
The `!config` YAML tag followed by a key can be used to provide end-user configurable values for project plugin pipelines.
For example, in a project plugin pipeline, you can use the `!config` tag to specify a `name` for the pipeline.

```yaml
# pipeline-inside-project-plugin.yaml
- implementation: myPlugin.testPipeline:SomePluginExtractor
  arguments:
    username: !config 'service_username'
    password: !config 'service_password'
```

In the above example, the `!config` tag is used to specify the `username` and `password` for the pipeline.
End users can provide values for the !config plugin tags in their nodestream.yaml file.
This feature is particularly useful for supplying user-provided information such as URLs and credentials.

```yaml
plugins:
  - name: myPlugin
    config:
      username: !env MY_TEST_PLUGIN_USERNAME
      password: !env MY_TEST_PLUGIN_PASSWORD
  - name: otherPlugin
    config:
      service_base_url: "https://otherurl.com"
```

#### Specifying Plugin Annotations

Plugins can also be annotated with metadata just the way you can in your own pipelines and scopes.
The `annotations` key can be used to specify metadata for a plugin.

```yaml
plugins:
  - name: myPlugin
    annotations:
      schedule: "0 0 * * *"
```

#### Specifying Plugin Targets

Plugins can also be configured to write to specific targets.
The `targets` key can be used to specify the targets that the plugin writes to.

```yaml
plugins:
  - name: myPlugin
    targets:
      - my-target
```

#### Advanced Plugin Configuration

Just as with scopes and pipelines, you can use a complex configuration for plugins as well. For example, this uses a combination of `config`, `annotations`, and `targets` for a plugin as well as the `exclude_inherited_targets` key.

```yaml
plugins:
  - name: myplugin
    config:
      service_base_url: "https://otherurl.com"
    targets:
      - target1
      - target2
    pipelines:
        - name: plugin_pipeline_1
          exclude_inherited_targets: True
          annotations:
              my_annoation: True
          targets:
              - target3
```
