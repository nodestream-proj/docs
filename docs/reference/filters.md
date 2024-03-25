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


## Reminder

Remember that you can always build your own filters by implementing the `Filter` interface. See [here](../../tutorials-advanced/new-steps) for more information.
