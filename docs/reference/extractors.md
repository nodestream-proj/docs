# Extractors

Extractors are the start of a pipeline and are used to pull raw data from a source.
Nodestream has a number of extractors built in and you can also [create your own](../../tutorials-advanced/new-steps/#creating-an-extractor).

## The File Extractor Family

There are a family of extractors that are used to pull data from files. These include:

- `FileExtractor` - Used to pull data from a file on the local filesystem.
- `RemoteFileExtractor` - Used to pull data from an HTTP server.
- `S3Extractor` - Used to pull data from a file in an S3 bucket.

Each of these extractors converts the data from the file in a consistent way across all of the extractors. 
- **`.csv`** files are supported by default and yield each row of the csv file as a dictionary to the next step in the pipeline.
- **`.json`** files are supported by default and yield the entire JSON object to the next step in the pipeline.
- **`.jsonl`** files are supported by default and yield each line of the JSONL file as a dictionary to the next step in the pipeline.
- **`.parquet`** files are supported by default and yield each row of the parquet file as a dictionary to the next step in the pipeline.
- **`.txt`** files are supported by default and yield each line of the text file as a dictionary to the next step in the pipeline. (The key is `line` and the value is the line of text.)
- **`.yaml`** files are supported by default and yield the entire YAML object to the next step in the pipeline.

Compressed file formats are also supported: 

-  `.gz`: `{File Format Extension}.gz` files are decompressed using `gzip.open` and stripped of the .gz extension and processed in the subsequent extension.
- `.bz2`: `{File Format Extension}.bz2` files are decompressed using `bz2.open` and stripped of the .bz2 extension and processed in the subsequent extension.


### `UnifiedFileExtractor`

The `UnifiedFileExtractor` is used to pull data from a file on the local filesystem, an HTTP server, or an S3 bucket.
The `UnifiedFileExtractor` is accessible via the `implementation` string `nodestream.pipeline.extractors.files:UnifiedFileExtractor`.

The arguments for the `UnifiedFileExtractor` are:

| Argument  | Description                          | Type         | Required | Default Value |
| --------- | ------------------------------------ | ------------ | -------- | ------------- |
| `sources` | A list of sources to pull data from. | `List[Dict]` | Yes      | N/A           |

Each object in the `sources` list should include a `type` key that specifies the type of extractor to use and the arguments for that extractor.

For example, to pull data from a local file, an HTTP server, and an S3 bucket, you would use the following configuration:

```yaml
implementation: nodestream.pipeline.extractors.files:UnifiedFileExtractor
arguments:
  sources:
    - type: local
      globs:
        - /path/to/local/file.csv
    - type: remote
      urls:
        - https://example.com/remote/file.csv
    - type: s3
      bucket: my-bucket
      prefix: path/to/s3/file.csv
```

#### Local Arguments

The arguments for the `local` source are:

| Argument | Description                                            | Type        | Required | Default Value |
| -------- | ------------------------------------------------------ | ----------- | -------- | ------------- |
| `globs`  | A list of glob strings representing the files to load. | `List[str]` | Yes      | N/A           |



#### Remote Arguments

The arguments for the `remote` source are:

| Argument                     | Description                                    | Type        | Required | Default Value |
| ---------------------------- | ---------------------------------------------- | ----------- | -------- | ------------- |
| `urls`                       | A list of URLs representing the files to load. | `List[str]` | Yes      | N/A           |
| `memory_spooling_size_in_mb` | The size of the memory spooling buffer in MB.  | `int`       | No       | `10`          |


#### S3 Arguments

The arguments for the `s3` source are:

| Argument                  | Description                                                                                                                                                                             | Type  | Required | Default Value |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | -------- | ------------- |
| `bucket`                  | The name of the S3 bucket.                                                                                                                                                              | `str` | Yes      | N/A           |
| `prefix`                  | Filter the objects pulled from S3 to only the ones that have this prefix in the name.                                                                                                   | `str` | No       | `""`          |
| `object_format`           | Format is inferred from the file extension. If the file extension is not recognized, you can specify the format here.                                                                   | `str` | No       | `""`          |
| `archive_dir`             | After a object has been processed, move the object for its current location to an a specified archive folder inside the bucket. Objects inside this folder are ignored when processing. | `str` | No       | `""`          |
| `assume_role_arn`         | The ARN of the role to assume when pulling data from S3.                                                                                                                                | `str` | No       | `""`          |
| `assume_role_external_id` | The external ID to use when assuming the role.                                                                                                                                          | `str` | No       | `""`          |
| `**session_args`          | Additional arguments to pass to the [boto3.Session](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html) function.                                      | `str` | No       | `{}`          |


### `QueueConnector`

The `QueueConnector` describes how to poll data from the underlying queue mechanism.

#### `AWS SQS`

```yaml
- implementation: nodestream.pipeline.extractors.queues:QueueExtractor
  arguments:
     # rest of the stream extractor format arguments
     connector: sqs
     queue_url: "https://sqs.us-east-1.amazonaws.com/177715257436/MyQueue"
```

### Additional Arguments
With the previous minimal configuration, it will use your currently active aws credentials to read messages from
`https://sqs.us-east-1.amazonaws.com/177715257436/MyQueue`. However, there are many options you can add to this:

| Parameter Name          	| Type   	| Description                                                                                                                                                                               	|
|-------------------------	|--------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| message_system_attribute_names                  	| String 	| A list of attributes that need to be returned along with each message. (Default: "All")                                                                                                     	|
| message_attribute_names                  	| String 	| A list of attribute names to receive. (Default: "All")                                                                                                     	|
| delete_after_read                  	| Boolean 	| Deletes the batch of messages from the queue after they are yielded to the next pipeline step. (Default: True)               
| assume_role_arn         	| String 	| The ARN of a role to assume before interacting with the SQS Queue. Of course the appropriate configuration is needed on both the current credentials as well as the target role.             	|
| assume_role_external_id 	| String 	| The external id that is required to assume role. Only used when `assume_role_arn` is set and only needed when the role is configured to require an external id.                           	|
| **session_args          	| Any    	| Any other argument that you want sent to the [boto3.Session](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html) that will be used to interact with AWS. 	|


## `StreamExtractor`

The `StreamExtractor` is used to pull data from a streaming backend like Kafka. 
The `StreamExtractor` is accessible via the `implementation` string `nodestream.pipeline.extractors.streams:StreamExtractor`.

The arguments for the `StreamExtractor` are:

| Argument        | Description                                                        | Type  | Required | Default Value |
| --------------- | ------------------------------------------------------------------ | ----- | -------- | ------------- |
| `connector`     | The name of the connector to use. (Valid value is kafka currently) | `str` | Yes      | N/A           |
| `record_format` | The only valid value is `json` currently.                          | `str` | No       | json          |

### Kafka

When using the `kafka` connector, the following additional arguments are available on the `StreamExtractor`:

| Argument            | Description                                                                                                                                               | Type        | Required | Default Value |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------- | ------------- |
| `topic_name`        | The name of the topic to consume from.                                                                                                                    | `str`       | Yes      | N/A           |
| `group_id`          | The name of the consumer group.                                                                                                                           | `str`       | No       | N/A           |
| `bootstrap_servers` | A list of kafka servers to connect to.                                                                                                                    | `List[str]` | Yes      | N/A           |
| `offset_reset`      | The offset to start consuming from.                                                                                                                       | `str`       | No       | `latest`      |
| `security_protocol` | The security protocol to use.                                                                                                                             | `str`       | No       | `PLAINTEXT`   |
| `max_records`       | The maximum number of records to pull in one call.                                                                                                        | `int`       | No       | `10`          |
| `poll_timeout`      | The maximum time to wait for records in seconds. Once met, the extractor will signal to the other steps to  flush memory of batched data and then re-poll | `int`       | No       | `30`          |


## `AthenaExtractor`

The `AthenaExtractor` is used to pull data from an AWS Athena query.
The `AthenaExtractor` is accessible via the `implementation` string `nodestream.pipeline.extractors.stores.aws:AthenaExtractor`.
The arguments for the `AthenaExtractor` are:

| Argument                  | Description                                                                                                                                                  | Type  | Required | Default Value |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- | -------- | ------------- |
| `query`                   | The query to run. The results yielded by the extractor will reflect the shape of the data returned from the query.                                           | `str` | Yes      | N/A           |
| `workgroup`               | The name of the workgroup to use. See the [AWS DOCS](https://docs.aws.amazon.com/athena/latest/ug/user-created-workgroups.html) for more information.        | `str` | Yes      | N/A           |
| `database`                | The name of the database to use.                                                                                                                             | `str` | Yes      | N/A           |
| `output_location`         | The output location string to store results for Athena. See the [AWS Docs](https://docs.aws.amazon.com/athena/latest/ug/querying.html) for more information. | `str` | Yes      | N/A           |
| `poll_interval_seconds`   | The interval in seconds to poll for the results of the query.                                                                                                | `int` | No       | `1`           |
| `page_size`               | The number of records to pull in one call.                                                                                                                   | `int` | No       | `500`         |
| `assume_role_arn`         | The ARN of the role to assume when pulling data from Athena.                                                                                                 | `str` | No       | `""`          |
| `assume_role_external_id` | The external ID to use when assuming the role.                                                                                                               | `str` | No       | `""`          |
| `**session_args`          | Additional arguments to pass to the [boto3.Session](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html) function.           | `str` | No       | `{}`          |


## `SimpleApiExtractor`

The `SimpleApiExtractor` is used to pull data from a simple JSON API.
The `SimpleApiExtractor` is accessible via the `implementation` string `nodestream.pipeline.extractors:SimpleApiExtractor`.
The arguments for the `SimpleApiExtractor` are:

| Argument             | Description                                                                            | Type   | Required | Default Value                    |
| -------------------- | -------------------------------------------------------------------------------------- | ------ | -------- | -------------------------------- |
| `url`                | The URL of the API to call.                                                            | `str`  | Yes      | N/A                              |
| `yield_from`         | The key to yield from the response. This will liely be a list objects in the repsonse. | `str`  | No       | Yields Entire Response if unset. |
| `offset_query_param` | The name of the query parameter to use for pagination.  If set pagination will occur.  | `str`  | No       | Unset. Does not paginate.        |
| `headers`            | A dictionary of headers to send with the request.                                      | `dict` | No       | `{}`                             |


## `DynamoDBExtractor`

The `DynamoDBExtractor` issues a query to an Amazon DynamoDB table using the scan method. The details on this AWS api call can be found [here](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/client/scan.html), and some of the parameters that are exposed by the interface are shown below. 

```yaml
- implementation: nodestream.pipeline.extractors.stores.aws:AthenaExtractor
  arguments:
    table_name: test_table;
    limit: 100
    scan_filter:
      attribute_name:
        AttributeValueList:
        - S: 'some_string'
        ComparisonOperator: 'EQ'
    projection_expression: 'string expression'
    filter_expression: 'string expression'
```

The arguments for the `DynamoDBExtractor` are:

| Parameter Name          	| Type   	| Description                                                                                                                                                                               	|
|-------------------------	|--------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| table_name                   	| String 	| The name of the dynamoDB table within the account.                                                                 	|
| limit               	| Integer 	| The maximum number of records to be collected from the table for each call.                 	|
| scan_filter         	| Dict 	| Filter for the results to be returned, does not minimize DynamoDB credit usage. See [DynamoDB Scan Docs](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/client/scan.html) for detailed information on use.                            	|
| projection_expression                	| String 	| String expression for projecting the results. See [DynamoDB Projection Docs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.Attributes.html) for detailed information on the format.  |
| filter_expression                	| String 	| String expression for filtering the results (alternative to the scan_filter). See [DynamoDB Filter Docs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html#Scan.FilterExpression) for detailed information on the format.   	|
| assume_role_arn         	| String 	| The ARN of a role to assume before interacting with the bucket. Of course the appropriate configuration is needed on both the current credentials as well as the target role.             	|
| assume_role_external_id 	| String 	| The external id that is required to assume role. Only used when `assume_role_arn` is set and only needed when the role is configured to require an external id.                           	|
| **session_args          	| Any    	| Any other argument that you want sent to the [boto3.Session](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html) that will be used to interact with AWS. 	|


## `TimeToLiveConfigurationExtractor`

The `TimeToLiveConfigurationExtractor` is used to pull data for a Time To Live Pipeline. 
The `TimeToLiveConfigurationExtractor` is accessible via the `implementation` string `nodestream.pipeline.extractors:TimeToLiveConfigurationExtractor`.
The arguments for the `TimeToLiveConfigurationExtractor` are:


| Argument                   | Description                                                                                      | Type                   | Required | Default Value |
| -------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------- | -------- | ------------- |
| `configurations`           | A list of configurations for the Time To Live pipeline.                                          | `List[Dict[str, Any]]` | Yes      | N/A           |
| `graph_object_type`        | The type of object to apply the TTL to. (`NODE` or `RELATIONHIP`)                                | `str`                  | Yes      | N/A           |
| `override_expiry_in_hours` | The number of hours after which the object should be deleted. Overrides any locally set version. |
| `int`                      | No                                                                                               | N/A                    |


Each object in the `configurations` list should include the following arguments:

| Argument          | Description                                                                                                                                        | Type   | Required | Default Value |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------- | ------------- |
| `object_type`     | The object type to apply the TTL to. (Node or relationship type)                                                                                   | `str`  | Yes      | N/A           |
| `expiry_in_hours` | The number of hours after which the object should be deleted.                                                                                      | `int`  | No       | N/A           |
| `enabled`         | Whether or not the TTL is enabled. Defaults to True.                                                                                               | `bool` | No       | `True`        |
| `batch_size`      | The number of objects to delete in a single batch. Defaults to 100.                                                                                | `int`  | No       | `100`         |
| `custom_query`    | A custom query to use to delete the objects. If not provided, the default query will be used. The custom query is database implmentation specific. | `str`  | No       | N/A           |



## Reminder

Remember that you can always build your own extractors by implementing the `Extractor` interface. See [here](../../tutorials-advanced/new-steps) for more information.