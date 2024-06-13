---
sidebar_position: 2
---

# Managing Your Project
Examine, add, and remove pipelines.


In this tutorial, we'll walk you through managing your Nodestream project.

## Viewing the State of Your Project

To view the state of your project, cd into the project repository and use the `nodestream show` command. 
This command will display the state of your project, including the pipelines that are defined.

```bash
nodestream show
```

When you run this command, you'll see output similar to the following:

```plaintext
+---------+--------+-----------------------+---------+-------------+
| scope   | name   | file                  | targets | annotations |
+---------+--------+-----------------------+---------+-------------+
| default | sample | pipelines/sample.yaml |         |             |
+---------+--------+-----------------------+---------+-------------+
```

This output shows that there is one pipeline defined in the project.
You can filter the output by scope by using the `--scope` option with larger projects.

```bash
nodestream show --scope default
```

You can also get a JSON representation of the state of your project by using the `--json` option.
This can be useful if you want to use the output in a script or another tool.

```bash
nodestream show --json
```

When you run this command, you'll see output similar to the following:

```json
["pipelines/sample.yaml"]
```

Running this command will output a JSON representation of the state of your project like so:

However, the output can sometimes be too terse to be useful. So you can also add the `-v` option to get a more verbose output.

```bash
nodestream show --json -v
```

When you run this command, you'll see a more detailed JSON representation of the state of your project.

```json
[{"path": "pipelines/sample.yaml", "name": "sample", "targets": [], "annotations": {}, "exclude_inherited_targets": false}]
```

## Removing a Pipeline

To remove a pipeline from your project, you can use the `nodestream remove` command.

```bash
nodestream remove default sample
```

This command will remove the pipeline with the name `sample` from the project in the `default` scope.
You can confirm that the pipeline was removed by running the `nodestream show` command.

```bash
nodestream show
```

When you run this command, you'll see that the pipeline has been removed from the project.

```plaintext
+-------+------+------+---------+-------------+
| scope | name | file | targets | annotations |
+-------+------+------+---------+-------------+
```


## Adding a Pipeline

To add a pipeline to your project, you can use the `nodestream scaffold` command.

```bash
nodestream scaffold org-chart
```

This command will create a new pipeline file called `org-chart.yaml` in the `pipelines` directory of your project.

```yaml
# org-chart.yaml
- arguments:
    stop: 100000
  factory: range
  implementation: nodestream.pipeline:IterableExtractor
- arguments:
    interpretations:
    - key:
        number: !jmespath 'index'
      node_type: Number
      type: source_node
  implementation: nodestream.interpreting:Interpreter
```

You can confirm that the pipeline was added by running the `nodestream show` command.

```bash
nodestream show
```

When you run this command, you'll see that the pipeline has been added to the project.

```plaintext
+---------+-----------+--------------------------+---------+-------------+
| scope   | name      | file                     | targets | annotations |
+---------+-----------+--------------------------+---------+-------------+
| default | org-chart | pipelines/org-chart.yaml |         |             |
+---------+-----------+--------------------------+---------+-------------+
```