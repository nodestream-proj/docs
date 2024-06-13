---
sidebar_position: 5
---

# Running The Pipeline

Let's get the data moving!

Alright! We've got a pipeline, some data, and a database. Now it's time to run the pipeline and load the data into our database.

That is super easy to do with Nodestream. Just run the following command:

```bash
nodestream run
```

Or run the following command with your desired target name found in the `nodestream.yaml` file:
```bash
nodestream run --target target-name
```

When you run this command, Nodestream will execute all pipelines in your project and load the data into your database.

If you'd rather be explicit (or selective) about which pipelines to run, you can specify the pipeline name(s) as an argument to the `run` command:

```bash
nodestream run org-chart
```

This will only run the `org-chart` pipeline.

You can also increase verbosity of the output by using the `-v`, `-vv`, or `-vvv` flags.
And you can enable structured json output with the `--json` flag.

```bash
nodestream run -vvv --json
```

That's it! You've now run your first pipeline with Nodestream. 🎉
