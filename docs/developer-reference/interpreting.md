# Interpretations

# Sequence Diagram
In the diagram some details are skipped to keep the picture clean.
`Pipeline` is an abstraction for all the things happening before Interpreter step. Similarly `Writer` is included
to show where the product of interpretation is consumed. Read the narrative for 
additional details.
```mermaid
sequenceDiagram
    participant P as Pipeline
    participant I as Interpreter
    participant C as ProviderContext
    participant Int as Interpretation
    participant D as DesiredIngestion
    participant W as Writer
    participant S as IngestionStrategy

    P->>I: init(interpretations)
    P->>W: init(IngestionStrategy)
    P->>I: handle_async_record_stream
    I->>I: interpret record from stream
    I->>C: fresh(record)
    Note over C: DesiredIngestion Created
    C->>I: context
    I->>Int: interpret(context)
    I->>D: add_source_node()
    I->>D: add_relationship()
    I->>P: desired_ingestion
    P->>W: write_record(desired_ingestion)
    W->>D: ingest(IngestionStrategy)
    D->>S: ingest_source_node
    D->>S: ingest_relationship 
```

Narrative for the above diagram:
1. When a pipeline with `Interpreter` step starts up, it initializes `Interpreter` with interpretations from the pipeline YAML file
2. It also adds the `Writer` step based on targets specified in nodestream.yaml
3. `Interpreter` will handle a record stream from the pipeline and start interpreting each record
4. It starts out by creating a context with a blank `DesiredIngestion`
5. It then feeds the `DesiredIngestion` into every interpretation specified in the pipeline YAML file.
6. The most common interpretation is the `SourceNodeInterpretation`, and it adds a source `Node` to the `DesiredIngestion`
7. A `RelationshipInterpretation` adds a `RelationshipWithNodes` to the `DesiredIngestion`
8. The Interpreter then yields the DesiredIngestion to the pipeline.
9. At the end of the pipeline the `Writer` step processes the `DesiredIngestion` using the configured `IngestionStrategy`