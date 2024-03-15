# Configuration 

## Project Configuration

The project configuration file (`nodestream.yaml`) is used to define the project's pipeline and other settings.
The file is defined in the following schema: 

### `nodestream.yaml`

| Key       | Description                                                                                         | Type                  | Default | Required |
| --------- | --------------------------------------------------------------------------------------------------- | --------------------- | ------- | -------- |
| `scopes`  | The scopes to be used in the pipeline. It is a map of names to [Scope](#scope) instances.           | `Map[String, Scope]`  | `{}`    | Yes      |
| `targets` | The targets to be used in the pipeline. It is a map of names to [Target](#target) instances.        | `Map[String, Target]` | `{}`    | No       |
| `plugins` | The plugins to be used in the pipeline. It is a list of plugin configs [Plugin](#plugin) instances. | `List[Plugin]`        | `{}`    | No       |


### Scope

The `Scope` is a configuration object that groups like pipelines together.
Scopes can be used as a filter in certain CLI commands to only run pipelines in the specified scope.
It is defined in the following schema:


| Key           | Description                                                                                                                                                                                                                                   | Type                  | Default | Required |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------- | -------- |
| `targets`     | The targets to be used in the pipeline. It is a list of target names.                                                                                                                                                                         | `List[String]`        | `[]`    | No       |
| `annotations` | A map of key, value pairs that can be used to annotate the scope. All pipelines in the scope will have these annotations. Annotations serve no functional purpose by default however plugins and your project code may use them for behavior. | `Map[String, String]` | `{}`    | No       |
| `config`      | A map of key, value pairs that can be used to configure the scope. All pipelines in the scope will have these configuration values present by establishing values for the [`!config`](#config) resolver.                                      | `Map[String, Any]`    | `{}`    | No       |
| `pipelines`   | The pipelines to be used in the scope. It is a map of names to [Pipeline](#pipeline) instances.                                                                                                                                               | `List[Pipeline]`      | N/A     | Yes      |


### Pipeline 

The `Pipeline` is a configuration object that acts a reference to and configuration for a pipeline. 


| Key                         | Description                                                                                                                                                                              | Type                  | Default                                                                      | Required       |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------- | -------------- |
| `name`                      | The name of the pipeline.                                                                                                                                                                | `String`              | The name of the file pointed to by `path`. Required if configuring a plugin. | Conditionally. |
| `path`                      | The path to the pipeline file.                                                                                                                                                           | `String`              | N/A; May be set by a plugin if refrenced by name.                            | Conditionally. |
| `annotations`               | A map of key, value pairs that can be used to annotate the pipeline. Annotations serve no functional purpose by default however plugins and your project code may use them for behavior. | `Map[String, String]` | `{}`                                                                         | No             |
| `targets`                   | The targets to be used in the pipeline. It is a list of target names.                                                                                                                    | `List[String]`        | `[]`                                                                         | No             |
| `exclude_inherited_targets` | A boolean flag that determines if the pipeline should exclude targets inherited from the scope.                                                                                          | `Boolean`             | `false`                                                                      | No             |

Instead of a `Pipeline`, you can also use a `String` to reference a pipeline by path. 
For example:

```yaml
scopes:
  foo:
    pipelines:
      - path: path/to/pipeline.yaml
```

is equivalent to:

```yaml
scopes:
  foo:
    pipelines:
      - path/to/pipeline.yaml
```

### Target

The `Target` is a configuration object that defines how to connect to a database. 
It is defined in the following schema:

| Key        | Description                                                                                                                                                        | Type     | Default | Required |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------- | -------- |
| `database` | The type of the target. This is used to determine which backend to use to communicate to the database.                                                             | `String` | N/A     | Yes      |
| `**config` | Additional key, values on the object are directly passed to the backend. See the [database documentation](../../category/database-support/) for more information on how to configure. | `Map`    | `{}`    | No       |

### Plugin

The `Plugin` is a configuration object that defines a plugin to be used in the pipeline.
It is defined in the following schema:

| Key           | Description                                                                                                                                                                            | Type                  | Default | Required |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------- | -------- |
| `name`        | The name of the plugin.                                                                                                                                                                | `String`              | N/A     | Yes      |
| `config`      | A map of key, value pairs that can be used to configure the plugin by establishing values for the [`!config`](#config) resolver.                                                       | `Map`                 | `{}`    | No       |
| `targets`     | The targets to be used in the plugin implicitly. It is a list of target names.                                                                                                         | `List[String]`        | `[]`    | No       |
| `annotations` | A map of key, value pairs that can be used to annotate the plugin. Annotations serve no functional purpose by default however plugins and your project code may use them for behavior. | `Map[String, String]` | `{}`    | No       |
| `pipelines`   | A list of [Pipeline](#pipeline) instances used to configure pipelines provided by the plugin.                                                                                          | `List[Pipeline]`      | `[]`    | No       |

## Pipeline Configuration

## Argument Resolution

### `!include`

The `!include` directive is used to include a file in line.
The file is included as if it were part of the original file. 
This is useful for breaking up large configuration files into smaller, more manageable pieces.

```yaml
!include path/to/file.yaml
```

### `!env`

The `!env` directive is used to include an environment variable in line.
The environment variable is included as if it were part of the original file.
This is useful for including sensitive information, such as API keys, without hardcoding them in the configuration file.

```yaml
!env MY_API
```


### `!config`

The `!config` directive is used to include a configuration value in line.
The configuration value is included as if it were part of the original file.
This is useful for including sensitive information, such as API keys, without hardcoding them in the configuration file.
The config decorator is specifically useful for decoupling configuration values required by the pipeline from the pipeline configuration itself.

```yaml
!config my.config.key
```