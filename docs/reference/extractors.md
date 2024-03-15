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


### `FileExtractor`

The `FileExtractor` is used to pull data from a file on the local filesystem.
The `FileExtractor` is accessible via the `implementation` string `nodestream.pipeline.extractors:FileExtractor`.
The arguments for the `FileExtractor` are:

| Argument | Description                                            | Type        | Required | Default Value |
| -------- | ------------------------------------------------------ | ----------- | -------- | ------------- |
| `globs`  | A list of glob strings representing the files to load. | `List[str]` | Yes      | N/A           |


### `S3Extractor`

The `S3Extractor` is used to pull data from a file in an S3 bucket.
The `S3Extractor` is accessible via the `implementation` string `nodestream.pipeline.extractors.stores.aws:S3Extractor`.
The arguments for the `S3Extractor` are:


| Argument                  | Description                                                                                                                                                                             | Type  | Required | Default Value |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | -------- | ------------- |
| `bucket`                  | The name of the S3 bucket.                                                                                                                                                              | `str` | Yes      | N/A           |
| `prefix`                  | Filter the objects pulled from S3 to only the ones that have this prefix in the name.                                                                                                   | `str` | No       | `""`          |
| `object_format`           | Format is inferred from the file extension. If the file extension is not recognized, you can specify the format here.                                                                   | `str` | No       | `""`          |
| `archive_dir`             | After a object has been processed, move the object for its current location to an a specified archive folder inside the bucket. Objects inside this folder are ignored when processing. | `str` | No       | `""`          |
| `assume_role_arn`         | The ARN of the role to assume when pulling data from S3.                                                                                                                                | `str` | No       | `""`          |
| `assume_role_external_id` | The external ID to use when assuming the role.                                                                                                                                          | `str` | No       | `""`          |
| `**session_args`          | Additional arguments to pass to the [boto3.Session](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html) function.                                      | `str` | No       | `{}`          |


### `RemoteFileExtractor`

The `RemoteFileExtractor` is used to pull data from an HTTP server.
The `RemoteFileExtractor` is accessible via the `implementation` string `nodestream.pipeline.extractors:RemoteFileExtractor`.
The arguments for the `RemoteFileExtractor` are:

| Argument                     | Description                                    | Type        | Required | Default Value |
| ---------------------------- | ---------------------------------------------- | ----------- | -------- | ------------- |
| `urls`                       | A list of URLs representing the files to load. | `List[str]` | Yes      | N/A           |
| `memory_spooling_size_in_mb` | The size of the memory spooling buffer in MB.  | `int`       | No       | `10`          |


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


## `TimeToLiveConfigurationExtractor`

The `TimeToLiveConfigurationExtractor` is used to pull data for a Time To Live Pipeline. 
The `TimeToLiveConfigurationExtractor` is accessible via the `implementation` string `nodestream.pipeline.extractors:TimeToLiveConfigurationExtractor`.
The arguments for the `TimeToLiveConfigurationExtractor` are:


| Argument                   | Description                                                                                      | Type                   | Required | Default Value |
| -------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------- | -------- | ------------- |
| `configurations`           | A list of configurations for the Time To Live pipeline.                                          | `List[Dict[str, Any]]` | Yes      | N/A           |
| `graph_object_type`        | The type of object to apply the TTL to. (`NODE` or `RELATIONHIP`)                                | `str`                  | Yes      | N/A           |
| `override_expiry_in_hours` | The number of hours after which the object should be deleted. Overrides any locally set version.
 | `int`                  | No       | N/A           |


Each object in the `configurations` list should include the following arguments:

| Argument          | Description                                                                                                                                        | Type   | Required | Default Value |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------- | ------------- |
| `object_type`     | The object type to apply the TTL to. (Node or relationship type)                                                                                   | `str`  | Yes      | N/A           |
| `expiry_in_hours` | The number of hours after which the object should be deleted.                                                                                      | `int`  | No       | N/A           |
| `enabled`         | Whether or not the TTL is enabled. Defaults to True.                                                                                               | `bool` | No       | `True`        |
| `batch_size`      | The number of objects to delete in a single batch. Defaults to 100.                                                                                | `int`  | No       | `100`         |
| `custom_query`    | A custom query to use to delete the objects. If not provided, the default query will be used. The custom query is database implmentation specific. | `str`  | No       | N/A           |