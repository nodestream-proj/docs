# Command Line Interface

The `nodestream` CLI is the primary way to interact with the NodeStream project.
It provides a number of commands to help you manage your project and run pipelines.


## Shell Completions

Nodestream supports shell completions for bash, zsh, and fish. You can enable them by running one of the following commands:

#### Bash (Ubuntu/Debian)
```bash
nodestream completions bash | sudo tee /etc/bash_completion.d/nodestream.bash-completion
```

#### Bash (MacOS)
```bash
nodestream completions bash > $(brew --prefix)/etc/bash_completion.d/nodestream.bash-completion
```

#### Zsh
```bash
mkdir ~/.zfunc
echo "fpath+=~/.zfunc" >> ~/.zshrc
nodestream completions zsh > ~/.zfunc/_test
```

#### Fish
```bash
nodestream completions fish > ~/.config/fish/completions/nodestream.fish
```


## Usage

```bash
nodestream [command] [flags]
```

## Commands

### `new`

The `new` command is used to create a new Nodestream project.

```bash
nodestream new [project-name] --database [database-engine] [path] [flags]
```

All possible options are:

```plaintext
Arguments:
  name                     the name of the project to create
  path                     the location of the project to create

Options:
  -d, --database=DATABASE  The Database to Configure [default: "neo4j"]
  -h, --help               Display help for the given command. When no command is given display help for the list command.
  -q, --quiet              Do not output any message.
  -V, --version            Display this application version.
      --ansi               Force ANSI output.
      --no-ansi            Disable ANSI output.
  -n, --no-interaction     Do not ask any interactive question.
  -v|vv|vvv, --verbose     Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.
```

### `copy`

The `copy` command is used to copy a pipeline from one scope to another.
The copy command is also interactive and will prompt you for the source and destination targets as well as the node and relationship types to copy.

```
Options:
  -p, --project=PROJECT            The project file (nodestream.yaml) to load.
  -j, --json                       Log output in JSON
  -f, --from=FROM                  The target to copy from
  -t, --to=TO                      The target to copy to
  -a, --all                        Copy all node and relationship types
      --node=NODE                  Specify a node type to copy (multiple values allowed)
      --relationship=RELATIONSHIP  Specify a relationship type to copy (multiple values allowed)
  -h, --help                       Display help for the given command. When no command is given display help for the list command.
  -q, --quiet                      Do not output any message.
  -V, --version                    Display this application version.
      --ansi                       Force ANSI output.
      --no-ansi                    Disable ANSI output.
  -n, --no-interaction             Do not ask any interactive question.
  -v|vv|vvv, --verbose             Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.
```

### `run`

The `run` command is used to run a pipeline.

```bash
nodestream run [pipeline-name] [flags]
```

All possible options are:

```plaintext
Description:
  run a pipeline in the current project

Usage:
  run [options] [--] [<pipelines>...]

Arguments:
  pipelines                                      the names of the pipelines. if not specified, all pipelines will be run

Options:
  -p, --project=PROJECT                          The project file (nodestream.yaml) to load.
  -j, --json                                     Log output in JSON
  -t, --target=TARGET                            Specify a database to target at run time. (multiple values allowed)
  -a, --annotations=ANNOTATIONS                  An annotation to apply to the pipeline during initialization. Steps without one of these annotations will be skipped. (multiple values allowed)
  -r, --reporting-frequency=REPORTING-FREQUENCY  How often to report progress [default: 1000]
  -s, --step-outbox-size=STEP-OUTBOX-SIZE        How many records to buffer in each step's outbox before blocking [default: 1000]
      --auto-migrate                             Ensure all specified targets are migrated before running specified pipelines
      --storage-backend=STORAGE-BACKEND          Storage backend to use for checkpointing
      --metrics-interval-in-seconds=SECONDS      Time interval to report metrics in seconds
      --prometheus                               Enable the Prometheus metrics server
      --prometheus-listen-port=PORT              The port to run the Prometheus metrics server on [default: "9090"]
      --prometheus-listen-address=ADDRESS        The address to run the Prometheus metrics server on [default: "0.0.0.0"]
      --prometheus-certfile=CERTFILE             The path to the certificate file for the Prometheus metrics server
      --prometheus-keyfile=KEYFILE               The path to the key file for the Prometheus metrics server
  -h, --help                                     Display help for the given command. When no command is given display help for the list command.
  -q, --quiet                                    Do not output any message.
  -V, --version                                  Display this application version.
      --ansi                                     Force ANSI output.
      --no-ansi                                  Disable ANSI output.
  -n, --no-interaction                           Do not ask any interactive question.
  -v|vv|vvv, --verbose                           Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.
```

### `scaffold`

The `scaffold` command is used to create a new pipeline.

```bash
nodestream scaffold [pipeline-name] [flags]
```

All possible options are:

```plaintext

Arguments:
  pipeline                 the name of the pipeline

Options:
  -d, --database=DATABASE  The Database to Configure [default: "neo4j"]
  -s, --scope=SCOPE        Use the provided scope for the operation
  -p, --project=PROJECT    The project file (nodestream.yaml) to load.
  -h, --help               Display help for the given command. When no command is given display help for the list command.
  -q, --quiet              Do not output any message.
  -V, --version            Display this application version.
      --ansi               Force ANSI output.
      --no-ansi            Disable ANSI output.
  -n, --no-interaction     Do not ask any interactive question.
  -v|vv|vvv, --verbose     Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.
```

### `remove`

The `remove` command is used to remove a pipeline from the project.

```bash
nodestream remove [scope] [pipeline-name] [flags]
```

All possible options are:

```plaintext
Arguments:
  scope                  the name of the scope the pipeline is in
  pipeline               the name of the pipeline

Options:
  -p, --project=PROJECT  The project file (nodestream.yaml) to load.
  -h, --help             Display help for the given command. When no command is given display help for the list command.
  -q, --quiet            Do not output any message.
  -V, --version          Display this application version.
      --ansi             Force ANSI output.
      --no-ansi          Disable ANSI output.
  -n, --no-interaction   Do not ask any interactive question.
  -v|vv|vvv, --verbose   Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.
```
### `explain schema`

The `explain schema` command shows which pipelines in your project contribute to particular node and relationship types in your graph schema.

```bash
nodestream explain schema [options] [kind] [name]
```

You can use it in two ways:

1. **Legacy positional arguments** (still supported for backwards compatibility):

```bash
nodestream explain schema node Person
nodestream explain schema relationship LIKES
```

2. **New option-based interface** (recommended):

```bash
# All pipelines contributing to a node type across all scopes
nodestream explain schema --node Person

# Only pipelines in a single scope
nodestream explain schema --node Person --scope api

# All pipelines contributing to a relationship type across all scopes
nodestream explain schema --relationship LIKES

# Intersection: only pipelines that contribute to BOTH the node and relationship type
nodestream explain schema --node Person --relationship LIKES
```

When pipelines are found, the output is formatted similarly to `nodestream show`:

- A descriptive header indicating which types and scopes are being explained.
- A table with columns for `scope`, `name`, the full pipeline `file` path, `targets`, and `annotations`.

All possible options are:

```plaintext
Usage:
  explain schema [options] [--] [<kind> [<name>]]

Arguments:
  kind                             The kind of type to explain ('node' or 'relationship').
  name                             The node or relationship type name (deprecated when using --node/--relationship).

Options:
  -p, --project=PROJECT            The project file (nodestream.yaml) to load.
  -s, --scope=SCOPE                Limit the explanation to a single scope (defaults to all scopes).
      --node=NODE                  Explain pipelines contributing to the given node type. May be combined with --relationship to show only pipelines that contribute to both.
      --relationship=RELATIONSHIP  Explain pipelines contributing to the given relationship type. May be combined with --node to show only pipelines that contribute to both.
  -h, --help                       Display help for the given command. When no command is given display help for the list command.
  -q, --quiet                      Do not output any message.
  -V, --version                    Display this application version.
      --ansi                       Force ANSI output.
      --no-ansi                    Disable ANSI output.
  -n, --no-interaction             Do not ask any interactive question.
  -v|vv|vvv, --verbose             Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.
```




### `show`


The `show` command is used to show the configuration of the project.

```bash
nodestream show [flags]
```

All possible options are:

```plaintext
Options:
  -p, --project=PROJECT  The project file (nodestream.yaml) to load.
  -s, --scope=SCOPE      Use the provided scope for the operation
  -j, --json             Log output in JSON
  -h, --help             Display help for the given command. When no command is given display help for the list command.
  -q, --quiet            Do not output any message.
  -V, --version          Display this application version.
      --ansi             Force ANSI output.
      --no-ansi          Disable ANSI output.
  -n, --no-interaction   Do not ask any interactive question.
  -v|vv|vvv, --verbose   Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.
```

### `audit ttls`

The `audit ttls` command is used to audit the TTLs of the project.
It will output a list of object types that do not have a TTL set, as well as a list of object types that have a TTL set that do not exist in the project.
The former of which will exit with a non-zero status code (error). The latter will not (warning only).

```bash
nodestream audit ttls [flags]
```

All possible options are:

```plaintext

Options:
  -p, --project=PROJECT  The project file (nodestream.yaml) to load.
  -h, --help             Display help for the given command. When no command is given display help for the list command.
  -q, --quiet            Do not output any message.
  -V, --version          Display this application version.
      --ansi             Force ANSI output.
      --no-ansi          Disable ANSI output.
  -n, --no-interaction   Do not ask any interactive question.
  -v|vv|vvv, --verbose   Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.
```

### `migrations make`

The `migrations make` command will generate a migration for the current project by detecting the current state of projects migrations and comparing it to the current state of the pipelines.

```bash
nodestream migrations make [migration-name] [flags]
```

All possible options are:

```plaintext

Options:
  -p, --project=PROJECT  The project file (nodestream.yaml) to load.
      --dry-run          Don't generate the migration file, just output the detected changes.
  -h, --help             Display help for the given command. When no command is given display help for the list command.
  -q, --quiet            Do not output any message.
  -V, --version          Display this application version.
      --ansi             Force ANSI output.
      --no-ansi          Disable ANSI output.
  -n, --no-interaction   Do not ask any interactive question.
  -v|vv|vvv, --verbose   Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.
```


### `migrations run`

The `migrations run` command will run the migrations for the current project.

```bash
nodestream migrations run [flags]
```

All possible options are:

```plaintext

Options:
  -p, --project=PROJECT  The project file (nodestream.yaml) to load.
  -t, --target=TARGET    Specify a database to target at run time. (multiple values allowed)
  -h, --help             Display help for the given command. When no command is given display help for the list command.
  -q, --quiet            Do not output any message.
  -V, --version          Display this application version.
      --ansi             Force ANSI output.
      --no-ansi          Disable ANSI output.
  -n, --no-interaction   Do not ask any interactive question.
  -v|vv|vvv, --verbose   Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.
```


### `migrations show`

The `migrations show` command will show the migrations for the current project.

```bash
nodestream migrations show [flags]
```

All possible options are:

```plaintext
Usage:
  migrations show [options]

Options:
  -p, --project=PROJECT  The project file (nodestream.yaml) to load.
  -t, --target=TARGET    Specify a database to target at run time. (multiple values allowed)
  -h, --help             Display help for the given command. When no command is given display help for the list command.
  -q, --quiet            Do not output any message.
  -V, --version          Display this application version.
      --ansi             Force ANSI output.
      --no-ansi          Disable ANSI output.
  -n, --no-interaction   Do not ask any interactive question.
  -v|vv|vvv, --verbose   Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.
```

### `migrations squash`

The `migrations squash` command collapses a range of existing migrations into a single migration. This is useful for keeping the migrations directory tidy after a project has accumulated many incremental migrations.

```bash
nodestream migrations squash --from <migration-name> [--to <migration-name>] [flags]
```

All possible options are:

```plaintext
Usage:
  migrations squash [options]

Options:
  -p, --project=PROJECT  The project file (nodestream.yaml) to load.
      --from=FROM        The name of the migration to squash from. (required)
      --to=TO            The name of the migration to squash to. Defaults to the latest migration if omitted.
  -h, --help             Display help for the given command. When no command is given display help for the list command.
  -q, --quiet            Do not output any message.
  -V, --version          Display this application version.
      --ansi             Force ANSI output.
      --no-ansi          Disable ANSI output.
  -n, --no-interaction   Do not ask any interactive question.
  -v|vv|vvv, --verbose   Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.
```

Example — squash all migrations from `initial` through the latest:

```bash
nodestream migrations squash --from initial
```

Example — squash a specific range:

```bash
nodestream migrations squash --from add_users --to add_relationships
```
