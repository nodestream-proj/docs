# Interpreting 

API Details for the Interpreter, Interpretations, and related components.

## Interpreter 

The `Interpreter` is a pipeline step that takes the data from the previous step and interprets it into nodes and relationships.


| Key                | Description                                                 | Type                   | Default | Required |
| ------------------ | ----------------------------------------------------------- | ---------------------- | ------- | -------- |
| `interpretations`  | A list of interpretations to be used to interpret the data. | `List[Interpretation]` | N/A     | Yes      |
| `iterate_on`       | Values to iterate over to interpret the data.               | `ValueProvider`        | N/A     | No       |
| `before_iteration` | A list of iterpretations that are applied before iteration. | `List[Interpretation]` | `[]`    | No       |


## Interpretations 

Interpretations are the building blocks of the `Interpreter`. They are used to interpret the data into nodes and relationships.

### Source Node Interpretation

The `SourceNodeInterpretation` is used to interpret the data into a source node.

| Parameter Name     | Required? | Type                    | Description                                                                                                                                                                                                                                                                                                            |
| ------------------ | --------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| node_type          | Yes       | String or ValueProvider | Specifies the type of the source node. It is a required field. When a  ValueProvider is used dynamic index creation and schema introspection are not supported.                                                                                                                                                        |
| key                | Yes       | Dictionary              | Contains key-value pairs that define the key of the source node.  The keys represent field names, and the values can be either static values or value providers.  It is a required field.                                                                                                                              |
| properties         | No        | Dictionary              | Stores additional properties of the source node. It is a dictionary  where the keys represent property names, and the values can be either  static values or value providers. This field is optional.                                                                                                                  |
| additional_indexes | No        | List[String]            | Specifies additional indexes for desired on the source node. It is a list of field names. This field is optional.                                                                                                                                                                                                      |
| additional_types   | No        | List[String]            | Defines additional types for the source node. It is a list of strings representing the additional types.  These types are not considered by ingestion system as part of the identity of the node and rather considered as  extra labels applied after the ingestion of the node is completed.  This field is optional. |
| normalization      | No        | Dictionary              | Contains normalization flags that should be adopted by value providers when getting values. This field is optional. [See the normalization reference](#normalizers).  By default `do_lowercase_strings` is enabled.                                                                                                |

#### Example

```yaml
- type: source_node
  node_type: Person
  key:
    name: !jmespath patient_name
  properties:
    birthday: !jmespath patient_birthday
  additional_indexes:
    - birthday
  additional_types:
    - Patient
```

### Relationship Interpretation


| Parameter Name          	| Required? 	| Type                               	| Description                                                                                                                                                                                                                                                                                                            	|
|-------------------------	|-----------	|------------------------------------	|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| node_type               	| Yes       	| String or ValueProvider            	| Specifies the type of the node a relationship connects to. It is a required field. When a ValueProvider is used dynamic index creation and schema introspection are not supported.                                                                                                                                    	|
| relationship_type       	| Yes       	| String or ValueProvider            	| Specifies the type of the relationship. It is a required field. When a ValueProvider is used dynamic index creation and schema introspection are not supported.                                                                                                                                                        	|
| node_key                	| Yes       	| Dictionary                         	| Contains key-value pairs that define the key of the related node. The keys represent field names, and the values can be either static values or value providers. It is a required field.                                                                                                                               	|
| node_properties         	| No        	| Dictionary                         	| Stores additional properties of the related node. It is a dictionary where the keys represent property names, and the values can be either static values or value providers. This field is optional.                                                                                                                   	|
| relationship_key        	| No        	| Dictionary                         	| Contains key-value pairs that define the key of the relationship itself. The keys represent field names, and the values can be either static values or value providers. It is a required field. The uniqueness of the relationship is defined in terms of the nodes it is relating and the key of the relationship.    	|
| relationship_properties 	| No        	| Dictionary                         	| Stores additional properties of the relationship It is a dictionary where the keys represent property names, and the values can be either static values or value providers. This field is optional.                                                                                                                    	|
| outbound                	| No        	| Boolean                            	| Represents whether or not the relationship direction is outbound from the source node. By default, this is true.                                                                                                                                                                                                       	|
| find_many               	| No        	| Boolean                            	| Represents whether or not the searches provided to node_key can return multiple values, and thus should create multiple relationships to multiple related nodes.                                                                                                                                                       	|
| iterate_on              	| No        	| ValueProvider                      	| Iterates over the values provided by the supplied value provider, and creates an relationship for each one.                                                                                                                                                                                                            	|
| node_creation_rule        | No        	| `EAGER` \| `MATCH_ONLY` \| `FUZZY` 	| Defaults to `EAGER`. When `EAGER`, related nodes will be created when not present based on the supplied node type and key. `MATCH_ONLY` will not create a relationship when the related node does not already exists. `FUZZY` behaves like `MATCH ONLY`, but treats the key values as regular expressions to match on. 	|
| key_normalization       	| No        	| Dictionary                         	| Contains normalization flags that should be adopted by value providers when getting values for node and relationship keys. This field is optional. [See the normalization reference](#normalizers).  By default  `do_lowercase_strings` is enabled.                                                                                    	|
| property_normalization  	| No        	| Dictionary                         	| Contains normalization flags that should be adopted by value providers when getting values for node and relationship properties. This field is optional. [See the normalization reference](#normalizers). By default no flags are enabled.                                                                                             	|
| node_additional_types  	  | No        	| List[String]                        | Defines additional types for the related node. It is a list of strings representing the additional types. These types are not considered by the ingestion system as part of the identity of the node and rather considered as extra labels applied after the ingestion of the node is completed. This field is optional.                                                                                             	|

#### Example


```yaml
- type: relationship
  node_type: Person
  relationship_type: HAS_CHILD
  iterate_on: !jmespath children[*]
  node_key:
    name: !jmespath name
```

### Properties Interpretation


| Parameter Name 	| Required? 	| Type       	| Description                                                                                                                                                                                                	|
|----------------	|-----------	|------------	|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| properties     	| Yes       	| Dictionary 	| Stores additional properties of the source node. It is a dictionary where the keys represent property names, and the values can be either static values or value providers. This field is optional.        	|
| normalization  	| No        	| Dictionary 	| Contains normalization flags that should be adopted by value providers when getting values. This field is optional. [See the normalization reference](#normalizers).  By default no flags are enabled. 	|

#### Example

```yaml
- type: properties
  properties:
    meaning_of_life: 42
```

### Variables Interpretation

The variables interpretation is used to define variables that can be referenced later with the [`!variable`](#variable) value provider. 
For example, if we wanted to define a variable called `meaning_of_life` with a value of `42`, we would use the following interpretation:

```yaml
- type: variables
  variables:
    meaning_of_life: 42
```

And it could be referenced later like this:

```yaml
- type: properties
  properties:
    meaning_of_life: !variable meaning_of_life
```

NOTE: that variables can be defined either statically or using a value provider. 

| Parameter Name 	| Required? 	| Type       	| Description                                                                                                                                                                                                	|
|----------------	|-----------	|------------	|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| variables     	| Yes       	| Dictionary 	| Stores values as variables that can be referenced later with the [`!variable`](#variable) value provider. It is a dictionary where the keys represent property names, and the values can be either static values or value providers. This field is optional.        	|
| normalization  	| No        	| Dictionary 	| Contains normalization flags that should be adopted by value providers when getting values. This field is optional. [See the normalization reference](#normalizers).  By default no flags are enabled. 	|


### Switch Interpretation

The `SwitchInterpretation` is used to switch between different interpretations based on the value of a field.


| Parameter Name 	| Required? 	| Type       	| Description                                                                                                                                                                                                	|
|----------------	|-----------	|------------	|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| switch_on     	| Yes       	| ValueProvider 	| The value provider that will be evaluated for each source node. The value of the value provider will be used to determine which interpretation to apply.        	|
| interpretations  	| Yes        	| Dictionary 	| Contains the interpretations that will be applied. The keys represent the values of the `switch_on` parameter. The values represent the interpretations that will be applied. Each value may also be a list of interpretations.	|
| default  	| No        	| Dictionary 	| Contains the default interpretation that will be applied if no interpretation has the same value as the value of the `switch_on` parameter. 	|


## Normalizers

A `Normalizer` allows you to clean data extracted by a [`ValueProvider`](#valueproviders).
They are intended to provided stateless, simple transformations of data. Many different interpretations allow you to
enable `Normalizers` to apply these transformations. See the [`Interpretation`](../interpreting) reference for where
they can be applied.

| Normalizer Flag Name      | Example Input           | Example Output         |
| ------------------------- | ----------------------- | ---------------------- |
| `do_lowercase_strings`    | "dO_LoWER_cASe_strings" | "do_lowercase_strings" |
| `do_remove_trailing_dots` | "my.website.com."       | "my.website.com"       |
| `do_trim_whitespace`      | "  some value "         | "some value"           |


## ValueProviders 

### `!jmespath`

Represents a [jmespath](https://jmespath.org/) query language expression that should be executed against the input record.

For example, if you want to get extract all of the `name` fields from the list of people provided in a document like this:

```json
{
    "people": [{"name": "Joe", "age": 25}, {"name": "john", "age": 45}]
}
```

A valid `!jmespath` value provider would look like this: `!jmespath people[*].name` Essentially, any `jmespath` expression
provided after the `!jmespath` tag will be parsed and loaded as one. Another guide on `jmespath` can be found [here](https://jmespath.site/main/).

### `!variable`

Provides the value of an extracted variable from the [Variables Interpretation](#variables-interpretation). For instance, if
you provided an variables interpretation block like so:

```yaml
interpretations:
    - type: variables
      variables:
         name: !jmespath person.name
```

You are then able to use the `!variable` provided in a later interpretation. For example,

```yaml
interpretations:
    # other interpretations are omitted.
    - type: source_node
      node_type: Person
         name: !variable name
```

This is particularly helpful when using the `before_iteration` and `iterate_on` clause in an `Interpreter`. For example,
assume that you have a record that looks like this:

```json
{
    "team_name": "My Awesome Team",
    "people": [
        {"name": "Joe", "age": 25},
        {"name": "John", "age": 34},
    ]
}
```

On way to ingest this data would be to do the following:

```yaml
- implementation: nodestream.interpreting:Interpreter
  arguments:
    before_iteration:
      - type: variables
        variables:
           team: !jmespath team
    iterate_on: !jmespath people[]
    interpretations:
      - type: source_node
        node_type: Person
        key:
          name: !jmespath name
        properties:
          age: !jmespath age
      - type: relationship
        node_type: Team
        relationship_type: PART_OF
        node_key:
          name: !variable team
```


### `!format`

The `!format` value provider allows you to format a string using the `format` method. For example, if you wanted to create a hello world
node based on a name field in the record, you could do the following:

```json
{
    "name": "Joe",
    "age": 25
}
```

The following interpretation would create a node with the key `Hello, Joe!`:

```yaml
- implementation: nodestream.interpreting:Interpreter
  arguments:
    interpretations:
      - type: source_node
        node_type: HelloNode
        key:
          name: !format
            fmt: "Hello, {name}!"
            name: !jmespath name
        properties:
          age: !jmespath age
```

### `!regex`

The `!regex` value provider allows you to extract a value from a string using a regular expression. For example, if you wanted to extract
the first name from a string given a record like this:

```json
{
    "name": "Joe Smith",
    "age": 25
}
```

The following interpretation would create a node with the key `Joe`:

```yaml
- implementation: nodestream.interpreting:Interpreter
  arguments:
    interpretations:
      - type: source_node
        node_type: HelloNode
        key:
          first_name: !regex
            regex: "^(?P<first_name>[a-zA-Z]+)\s(?P<last_name>[a-zA-Z]+)$"
            data: !jmespath name
            group: first_name
        properties:
          age: !jmespath age
```

You can either use named groups or numbered groups.
If you use named groups, you can specify the group name in the `group` argument.
If you use numbered groups, you can specify the group number in the `group` argument.
If you do not specify a group, the first group will be used - which is the entire match.

### `!split`

The `!split` value provider allows you to split a string into a list of strings using a delimiter. For example, if you wanted to split a string like this:

```json
{
    "name": "Joe Smith",
    "talents": "jumping,running,swimming"
}
```

The following interpretations would create a `Joe Smith` node with relationships to `jumping`, `running`, and `swimming`:

```yaml
- implementation: nodestream.interpreting:Interpreter
  arguments:
    interpretations:
      - type: source_node
        node_type: Person
        key:
          name: !jmespath name
      - type: relationship
        node_type: Talent
        relationship_type: HAS_TALENT
        find_many: true
        node_key:
          name: !split
            data: !jmespath talents
            delimiter: ","
```

### `!normalize`

The `!normalize` value provider allows you to utilize the [normalization](#normalizers) functionality to normalize an incoming value. 
For example, if you wanted to normalize a name field in the record:

```json
{
    "name": "Joe Smith   ",
}
```

The following interpretation would create a node with the key `Joe Smith`:

```yaml
- implementation: nodestream.interpreting:Interpreter
  arguments:
    interpretations:
      - type: source_node
        node_type: Person
        key:
          name: !normalize
            using: trim_whitespace
            data: !jmespath name
```

While most interpretations support a `normalization` block (See the [Interpretations reference above](#interpretations) for more information), 
the `!normalize` value provider allows you to normalize a value before it is returned to the interpretation. 
This is useful when you want to normalize a value in a `key` or `property` block where the `normalization` 
should only be applied to that value only.  For example, if you wanted to normalize the `city` field of the record but not the `state` field:

```json
{
    "city": "New York   ",
    "state": "NY"
}
```

The following interpretation would create a `Locality` node with the keys of `New York` and `NY`:

```yaml
- implementation: nodestream.interpreting:Interpreter
  arguments:
    interpretations:
      - type: source_node
        node_type: Locality
        key:
          city: !normalize
            using: trim_whitespace
            data: !jmespath city
          state: !jmespath state
```
