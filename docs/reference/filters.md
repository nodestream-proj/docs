# Filters 

## `ValuesMatchPossibilitiesFilter`


The `ValuesMatchPossibilitiesFilter` filter is used to exclude records where a field matches any of a list of possibilities. 

The `ValuesMatchPossibilitiesFilter` is accessible via the `implementation` string `nodestream.pipeline.filters:ValuesMatchPossibilitiesFilter`.


| Key      | Description               | Type               | Default | Required |
| -------- | ------------------------- | ------------------ | ------- | -------- |
| `fields` | A list of field matchers. | List[FieldMatcher] | N/A     | Yes      |


## `ExcludeWhenValuesMatchPossibilities`

The `ExcludeWhenValuesMatchPossibilities` filter is used to exclude records where a field matches any of a list of possibilities.
The `ExcludeWhenValuesMatchPossibilities` is accessible via the `implementation` string `nodestream.pipeline.filters:ExcludeWhenValuesMatchPossibilities`.


| Key      | Description               | Type               | Default | Required |
| -------- | ------------------------- | ------------------ | ------- | -------- |
| `fields` | A list of field matchers. | List[FieldMatcher] | N/A     | Yes      |


## `FieldMatcher`

A `FieldMatcher` is an object with the following properties:

| Key             | Description                                                                                                                                         | Type           | Default | Required |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------- | -------- |
| `value`         | An expression that selects the value of the field to match on.                                                                                      | JMESPath       | N/A     | Yes      |
| `possibilities` | A list of values to match against.                                                                                                                  | List[Any]      | N/A     | Yes      |
| `normalization` | A list of normalization functions to apply to the field value before matching. See [normalization](../interpreting#normalizers) reference for flags | Dict[str, Any] | N/A     | No       |


## `SchemaEnforcer`

The `SchemaEnforcer` filter is used to enforce a schema on the records being processed.
The `SchemaEnforcer` is accessible via the `implementation` string `nodestream.pipeline.filters:SchemaEnforcer`.

| Key                  | Description                                                                                                                                            | Type   | Default   | Required |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | --------- | -------- |
| `enforcement_policy` | The policy to use when enforcing the schema. `enforce` will strictly filter out records. `warn` will simply log that records are violating the schema` | string | `enforce` | No       |
| `key`                | The key in the object store to store the schema                                                                                                        | string | None      | No       |
| `inference_sample_size` | The number of records to use when inferring the schema. When set to `None`, the schema will not be inferred. If the schema is not inferred, it must be provided via the `key`. | int    | 1000      | No       |

### Examples 

#### Infer schema from records

```yaml
filters:
  - implementation: nodestream.pipeline.filters:SchemaEnforcer
    enforcement_policy: enforce
    inference_sample_size: 1000
```

#### Use a predefined schema

```yaml
filters:
  - implementation: nodestream.pipeline.filters:SchemaEnforcer
    enforcement_policy: enforce
    key: schema # This key much be stored inside the object store at <<pipeline_fila_sha_256>>/<<step-index>>/schema
```


## Reminder

Remember that you can always build your own filters by implementing the `Filter` interface. See [here](../../tutorials-advanced/new-steps) for more information.
