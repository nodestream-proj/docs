---
sidebar_position: 4
---

# Data Filtering

Sometimes you may want to filter the data in your dataset to only include certain records. 
Nodestream provide some inbuilt filtering methods to help you do this.
Note if none of the inbult filtering methods meet your needs, you can always [create your own filter](../tutorials-advanced/building-new-processing-steps#creating-a-filter).


## Including Records By Field Values

Let's assume you have a dataset with the following records:

```json
[
  {
    "name": "John",
    "status": "active"
  },
  {
    "name": "Jane",
    "status": "inactive"
  },
  {
    "name": "Bob",
    "status": "part-time"
  }
]
```

We can use the `ValuesMatchPossibilitiesFilter` to include only records where the `status` field is either `active` or `part-time`:

```yaml
- implementation: nodestream.pipeline.filters:ValuesMatchPossibilitiesFilter
  arguments:
    fields:
    - value: !jmespath 'status'
      possibilities:
      - active
      - part-time 
```

This will result into the following dataset:

```json
[
  {
    "name": "John",
    "status": "active"
  },
  {
    "name": "Bob",
    "status": "part-time"
  }
]
```

The `fields` argument is a list of fields to filter on. Each field is an object with the following properties:

- `value`: A value to use to filter the records. Likely this will be a JMESPath expression into your record.
- `possibilities`: A list of values to match against. If the value of the field matches any of these possibilities, the record will be included in the output dataset.
- `normalization` (optional): A set of [normalization](./data-massaging#normalization-flags) rules to apply to the field value before matching. This can be useful if you want to match on a case-insensitive basis, for example.


With this knowledge, you can build quite complex filters. 
For example, you can include records where the `status` field is `active` and the `name` field is `John` (case-insensitive) as follows:


```yaml
- implementation: nodestream.pipeline.filters:ValuesMatchPossibilitiesFilter
  arguments:
    fields:
    - value: !jmespath 'status'
      possibilities:
      - active
    - value: !jmespath 'name'
      possibilities:
      - john
      normalization:
        - lowercase_strings
```

This will result into the following dataset:

```json
[
  {
    "name": "John",
    "status": "active"
  }
]
```

## Excluding Records By Field Values

You can also use the `ExcludeWhenValuesMatchPossibilities` filter to exclude records that match certain criteria.
Conceptually, this filter is the opposite of the `ValuesMatchPossibilitiesFilter` filter. (And fun fact; its implemented as such).
Taking the same dataset as above, you can exclude records where the `status` field is `inactive` as follows:

```yaml
- implementation: nodestream.pipeline.filters:ExcludeWhenValuesMatchPossibilities
  arguments:
    fields:
    - value: !jmespath 'status'
      possibilities:
      - inactive
```

This will result into the following dataset:

```json
[
  {
    "name": "John",
    "status": "active"
  },
  {
    "name": "Bob",
    "status": "part-time"
  }
]
```

The same options are available for this filter as for the `ValuesMatchPossibilitiesFilter` filter:

- `fields`: A list of fields to filter on. Each field is an object with the following properties:
  - `value`: A value to use to filter the records. Likely this will be a JMESPath expression into your record.
  - `possibilities`: A list of values to match against. If the value of the field matches any of these possibilities, the record will be excluded from the output dataset.
  - `normalization` (optional): A set of [normalization](./data-massaging#normalization-flags) rules to apply to the field value before matching. This can be useful if you want to match on a case-insensitive basis, for example.


## Including Records With Regex

You can use the `ValuesMatchRegexFilter` filter to include only records where a field matches a regular expression.
For example, you can include records where the `name` field starts with `J` as follows:

```yaml
- implementation: nodestream.pipeline.filters:ValuesMatchRegexFilter
  arguments:
    fields:
    - value: !jmespath 'name'
      regex: '^J'
```

This will result into the following dataset:

```json
[
  {
    "name": "John",
    "status": "active"
  },
  {
    "name": "Jane",
    "status": "inactive"
  }
]
```

## Combining Filters

You can combine filters to create more complex filtering logic.
Since the pipeline is a list of processing steps, you can simply add multiple filters to the pipeline to achieve this. 
For example, you can include records where the `status` field is `active` and the `name` field is `John` (case-insensitive) and exclude records where the `status` field is `part-time` as follows:

```yaml
- implementation: nodestream.pipeline.filters:ValuesMatchPossibilitiesFilter
  arguments:
    fields:
    - value: !jmespath 'status'
      possibilities:
      - active
    - value: !jmespath 'name'
      possibilities:
      - john
      normalization:
        - lowercase_strings
- implementation: nodestream.pipeline.filters:ExcludeWhenValuesMatchPossibilities
    arguments:
        fields:
        - value: !jmespath 'status'
        possibilities:
        - part-time
```

This will result into the following dataset:
    
```json
[
    {
        "name": "John",
        "status": "active"
    }
]
```