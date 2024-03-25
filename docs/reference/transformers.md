# Transformers 

## `ExpandJsonField` 

The `ExpandJsonField` transformer is used to expand a JSON string in place as deserialized JSON.
The `ExpandJsonField` is accessible via the `implementation` string `nodestream.pipeline.transformers:ExpandJsonField`.

| Key    | Description                                                                                                                                                                              | Type                 | Default | Required |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------- | -------- |
| `path` | The path to the to expand. Only supports key look ups. If the path is a `str`, then it is interpreted as a flat level key. If the `path` is a list, then it will dig through the object. | `str` or `List[str]` | N/A     | Yes      |



## `ValueProjection`

The `ValueProjection` transformer is used to project a value from a record into a new shape. 
The `ValueProjection` is accessible via the `implementation` string `nodestream.pipeline.transformers:ValueProjection`.

| Key                 | Description                                                                                                                                   | Type           | Default | Required |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------- | -------- |
| `projection`        | An expression that turns the record into one or more new records.                                                                             | JMESPath       | N/A     | Yes      |
| `additional_values` | A dictionary of additional key, value pairs to add to the record. Values can be dynamically defined by a value expression such as a JMESPath. | Dict[str, Any] | N/A     | No       |

## Reminder

Remember that you can always build your own transformers by implementing the `Transformer` interface. See [here](../../tutorials-advanced/new-steps) for more information.
