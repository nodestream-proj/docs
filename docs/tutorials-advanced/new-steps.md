---
sidebar_position: 1
---

# Building New Steps
Drop to python to create new custom ways to collect and process data.

## Creating an Extractor

Nodestream has a number of built-in extractors that can be used to collect data from a variety of sources.
However, you may have a need to collect data from a source that is not supported by the built-in extractors.
In this case, you can create a new extractor to collect data from the source.
An extractor is a class that:
- Inherits from the `nodestream.pipeline:Extractor` class.
- Implements the `async def extract_records(self)` method as an asynchronous generator that yields records.

The following is an example of a simple extractor from an array.

```python
from nodestream.pipeline import Extractor


class ArrayExtractor(Extractor):
    def __init__(self, array):
        self.array = array

    async def extract_records(self):
        for record in self.array:
            yield record
```


## Creating a Transformer

Nodestream has a number of built-in transformers that can be used to transform data in a variety of ways.
However, you may have a need to transform data in a way that is not supported by the built-in transformers.
In this case, you can create a new transformer to transform the data.

A transformer is a class that:
- Inherits from the `nodestream.pipeline:Transformer` class.
- Implements the `async def transform_record(self, record)` method that takes a record and returns an updated record.

The following is an example of a simple transformer that adds a new field to a record.

```python
from nodestream.pipeline import Transformer


class AddFieldTransformer(Transformer):
    def __init__(self, field_name, field_value):
        self.field_name = field_name
        self.field_value = field_value

    async def transform_record(self, record):
        record[self.field_name] = self.field_value
        return record
```

Given the following input record:

```python
{
    "field1": "value1"
}
```

Assuming the `AddFieldTransformer` is implemented like this:

```yaml
- implementation: my_module.transformers:AddFieldTransformer
  arguments:
    field_name: field2
    field_value: value2
```

The output would be:

```python
{
    "field1": "value1",
    "field2": "value2"
}
```

`transform_record` can also be a async generator that yields records.
For example, the following transformer takes a record and yields two records, one from two different fields.


```python
from nodestream.pipeline import Transformer


class LeftRightTransformer(Transformer):
    def __init__(self, left_field, right_field):
        self.left_field = left_field
        self.right_field = right_field

    async def transform_record(self, record):
        yield {"record": record[self.left_field]}
        yield {"record": record[self.right_field]}

```

For example, given the following input record:

```python
{
    "field1": {"nested_field": "value1"}
    "field2": {"nested_field": "value2"}
}
```

Assuming the `LeftRightTransformer` is implemented like this:

```yaml
- implementation: my_module.transformers:LeftRightTransformer
  arguments:
    left_field: field1
    right_field: field2
```

The output would be:

```python
{
    "record": {"nested_field": "value1"}
}
{
    "record": {"nested_field": "value2"}
}
```

## Creating a Filter

Nodestream has a number of built-in filters that can be used to filter data in a variety of ways.
For information on those see the guide on [Filtering Data](../../tutorials-intermediate/filtering-data) or the [Filters Reference](../../reference/filters).

However, you may have a need to filter data in a way that is not supported by the built-in filters.
In this case, you can create a new filter to filter the data.

A filter is a class that:

- Inherits from the `nodestream.pipeline:Filter` class.
- Implements the `async def filter_record(self, record)` method that takes a record and returns a boolean value indicating whether the record should be included in the output.

The following is an example of a simple filter that filters records based on a field value.

```python
from nodestream.pipeline import Filter


class IsEvenFilter(Filter):
    def __init__(self, field_name):
        self.field_name = field_name

    async def filter_record(self, record):
        # Return True if the value of the field is even, False otherwise
        return record[self.field_name] % 2 == 0
```
