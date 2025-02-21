# Object Storage

Nodestream has a object storage abstraction.
The object storage APIs allow steps in your pipeline to interact with object storage to persist data between executions. 
Configuring object storage is a required step in order to use this feature and is done in your project configuration
and runtime options. 

## Configuration

To configure object storage, you must add the following to your project configuration:

```yaml
# nodestream.yaml

storage:
  stores:
    - name: my-directory-store
      type: directory
      path: /path/to/directory
      hmac_key: my-secret-base-64-key
    - name: my-s3-store
        type: s3
        bucket_name: my-bucket
        hmac_key: my-secret-base-64-key
        # ... aws client configuration options
```

It is strongly recommend that you: 

- Use a `hmack_key` to encrypt your data.
- Use a secure method to store your `hmac_key` such as a secret manager or environment variable. 

## Usage
After configuring object storage, you can use it by passing the `--object-storage` flag to your pipeline execution. 

```bash
nodestream run my-pipeline --object-storage my-directory-store 
```

When you pass the `--object-storage` flag, the object storage will be available to all steps in your pipeline. 
Extractors will use object storage to store their checkpoints and other steps can use it to store intermediate data. 
