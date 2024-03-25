"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3263],{6464:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>n,default:()=>x,frontMatter:()=>i,metadata:()=>c,toc:()=>h});var d=t(7624),s=t(2172);const i={},n="Extractors",c={id:"reference/extractors",title:"Extractors",description:"Extractors are the start of a pipeline and are used to pull raw data from a source.",source:"@site/docs/reference/extractors.md",sourceDirName:"reference",slug:"/reference/extractors",permalink:"/docs/docs/reference/extractors",draft:!1,unlisted:!1,editUrl:"https://github.com/nodesteram-proj/docs/tree/main/packages/create-docusaurus/templates/shared/docs/reference/extractors.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Command Line Interface",permalink:"/docs/docs/reference/cli"},next:{title:"Filters",permalink:"/docs/docs/reference/filters"}},l={},h=[{value:"The File Extractor Family",id:"the-file-extractor-family",level:2},{value:"<code>FileExtractor</code>",id:"fileextractor",level:3},{value:"<code>S3Extractor</code>",id:"s3extractor",level:3},{value:"<code>RemoteFileExtractor</code>",id:"remotefileextractor",level:3},{value:"<code>StreamExtractor</code>",id:"streamextractor",level:2},{value:"Kafka",id:"kafka",level:3},{value:"<code>AthenaExtractor</code>",id:"athenaextractor",level:2},{value:"<code>SimpleApiExtractor</code>",id:"simpleapiextractor",level:2},{value:"<code>TimeToLiveConfigurationExtractor</code>",id:"timetoliveconfigurationextractor",level:2},{value:"Reminder",id:"reminder",level:2}];function o(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.M)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(r.h1,{id:"extractors",children:"Extractors"}),"\n",(0,d.jsxs)(r.p,{children:["Extractors are the start of a pipeline and are used to pull raw data from a source.\nNodestream has a number of extractors built in and you can also ",(0,d.jsx)(r.a,{href:"../../tutorials-advanced/new-steps/#creating-an-extractor",children:"create your own"}),"."]}),"\n",(0,d.jsx)(r.h2,{id:"the-file-extractor-family",children:"The File Extractor Family"}),"\n",(0,d.jsx)(r.p,{children:"There are a family of extractors that are used to pull data from files. These include:"}),"\n",(0,d.jsxs)(r.ul,{children:["\n",(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.code,{children:"FileExtractor"})," - Used to pull data from a file on the local filesystem."]}),"\n",(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.code,{children:"RemoteFileExtractor"})," - Used to pull data from an HTTP server."]}),"\n",(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.code,{children:"S3Extractor"})," - Used to pull data from a file in an S3 bucket."]}),"\n"]}),"\n",(0,d.jsx)(r.p,{children:"Each of these extractors converts the data from the file in a consistent way across all of the extractors."}),"\n",(0,d.jsxs)(r.ul,{children:["\n",(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.strong,{children:(0,d.jsx)(r.code,{children:".csv"})})," files are supported by default and yield each row of the csv file as a dictionary to the next step in the pipeline."]}),"\n",(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.strong,{children:(0,d.jsx)(r.code,{children:".json"})})," files are supported by default and yield the entire JSON object to the next step in the pipeline."]}),"\n",(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.strong,{children:(0,d.jsx)(r.code,{children:".jsonl"})})," files are supported by default and yield each line of the JSONL file as a dictionary to the next step in the pipeline."]}),"\n",(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.strong,{children:(0,d.jsx)(r.code,{children:".parquet"})})," files are supported by default and yield each row of the parquet file as a dictionary to the next step in the pipeline."]}),"\n",(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.strong,{children:(0,d.jsx)(r.code,{children:".txt"})})," files are supported by default and yield each line of the text file as a dictionary to the next step in the pipeline. (The key is ",(0,d.jsx)(r.code,{children:"line"})," and the value is the line of text.)"]}),"\n",(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.strong,{children:(0,d.jsx)(r.code,{children:".yaml"})})," files are supported by default and yield the entire YAML object to the next step in the pipeline."]}),"\n"]}),"\n",(0,d.jsx)(r.h3,{id:"fileextractor",children:(0,d.jsx)(r.code,{children:"FileExtractor"})}),"\n",(0,d.jsxs)(r.p,{children:["The ",(0,d.jsx)(r.code,{children:"FileExtractor"})," is used to pull data from a file on the local filesystem.\nThe ",(0,d.jsx)(r.code,{children:"FileExtractor"})," is accessible via the ",(0,d.jsx)(r.code,{children:"implementation"})," string ",(0,d.jsx)(r.code,{children:"nodestream.pipeline.extractors:FileExtractor"}),".\nThe arguments for the ",(0,d.jsx)(r.code,{children:"FileExtractor"})," are:"]}),"\n",(0,d.jsxs)(r.table,{children:[(0,d.jsx)(r.thead,{children:(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.th,{children:"Argument"}),(0,d.jsx)(r.th,{children:"Description"}),(0,d.jsx)(r.th,{children:"Type"}),(0,d.jsx)(r.th,{children:"Required"}),(0,d.jsx)(r.th,{children:"Default Value"})]})}),(0,d.jsx)(r.tbody,{children:(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"globs"})}),(0,d.jsx)(r.td,{children:"A list of glob strings representing the files to load."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"List[str]"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]})})]}),"\n",(0,d.jsx)(r.h3,{id:"s3extractor",children:(0,d.jsx)(r.code,{children:"S3Extractor"})}),"\n",(0,d.jsxs)(r.p,{children:["The ",(0,d.jsx)(r.code,{children:"S3Extractor"})," is used to pull data from a file in an S3 bucket.\nThe ",(0,d.jsx)(r.code,{children:"S3Extractor"})," is accessible via the ",(0,d.jsx)(r.code,{children:"implementation"})," string ",(0,d.jsx)(r.code,{children:"nodestream.pipeline.extractors.stores.aws:S3Extractor"}),".\nThe arguments for the ",(0,d.jsx)(r.code,{children:"S3Extractor"})," are:"]}),"\n",(0,d.jsxs)(r.table,{children:[(0,d.jsx)(r.thead,{children:(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.th,{children:"Argument"}),(0,d.jsx)(r.th,{children:"Description"}),(0,d.jsx)(r.th,{children:"Type"}),(0,d.jsx)(r.th,{children:"Required"}),(0,d.jsx)(r.th,{children:"Default Value"})]})}),(0,d.jsxs)(r.tbody,{children:[(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"bucket"})}),(0,d.jsx)(r.td,{children:"The name of the S3 bucket."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"prefix"})}),(0,d.jsx)(r.td,{children:"Filter the objects pulled from S3 to only the ones that have this prefix in the name."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:'""'})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"object_format"})}),(0,d.jsx)(r.td,{children:"Format is inferred from the file extension. If the file extension is not recognized, you can specify the format here."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:'""'})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"archive_dir"})}),(0,d.jsx)(r.td,{children:"After a object has been processed, move the object for its current location to an a specified archive folder inside the bucket. Objects inside this folder are ignored when processing."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:'""'})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"assume_role_arn"})}),(0,d.jsx)(r.td,{children:"The ARN of the role to assume when pulling data from S3."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:'""'})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"assume_role_external_id"})}),(0,d.jsx)(r.td,{children:"The external ID to use when assuming the role."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:'""'})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"**session_args"})}),(0,d.jsxs)(r.td,{children:["Additional arguments to pass to the ",(0,d.jsx)(r.a,{href:"https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html",children:"boto3.Session"})," function."]}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"{}"})})]})]})]}),"\n",(0,d.jsx)(r.h3,{id:"remotefileextractor",children:(0,d.jsx)(r.code,{children:"RemoteFileExtractor"})}),"\n",(0,d.jsxs)(r.p,{children:["The ",(0,d.jsx)(r.code,{children:"RemoteFileExtractor"})," is used to pull data from an HTTP server.\nThe ",(0,d.jsx)(r.code,{children:"RemoteFileExtractor"})," is accessible via the ",(0,d.jsx)(r.code,{children:"implementation"})," string ",(0,d.jsx)(r.code,{children:"nodestream.pipeline.extractors:RemoteFileExtractor"}),".\nThe arguments for the ",(0,d.jsx)(r.code,{children:"RemoteFileExtractor"})," are:"]}),"\n",(0,d.jsxs)(r.table,{children:[(0,d.jsx)(r.thead,{children:(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.th,{children:"Argument"}),(0,d.jsx)(r.th,{children:"Description"}),(0,d.jsx)(r.th,{children:"Type"}),(0,d.jsx)(r.th,{children:"Required"}),(0,d.jsx)(r.th,{children:"Default Value"})]})}),(0,d.jsxs)(r.tbody,{children:[(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"urls"})}),(0,d.jsx)(r.td,{children:"A list of URLs representing the files to load."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"List[str]"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"memory_spooling_size_in_mb"})}),(0,d.jsx)(r.td,{children:"The size of the memory spooling buffer in MB."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"int"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"10"})})]})]})]}),"\n",(0,d.jsx)(r.h2,{id:"streamextractor",children:(0,d.jsx)(r.code,{children:"StreamExtractor"})}),"\n",(0,d.jsxs)(r.p,{children:["The ",(0,d.jsx)(r.code,{children:"StreamExtractor"})," is used to pull data from a streaming backend like Kafka.\nThe ",(0,d.jsx)(r.code,{children:"StreamExtractor"})," is accessible via the ",(0,d.jsx)(r.code,{children:"implementation"})," string ",(0,d.jsx)(r.code,{children:"nodestream.pipeline.extractors.streams:StreamExtractor"}),"."]}),"\n",(0,d.jsxs)(r.p,{children:["The arguments for the ",(0,d.jsx)(r.code,{children:"StreamExtractor"})," are:"]}),"\n",(0,d.jsxs)(r.table,{children:[(0,d.jsx)(r.thead,{children:(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.th,{children:"Argument"}),(0,d.jsx)(r.th,{children:"Description"}),(0,d.jsx)(r.th,{children:"Type"}),(0,d.jsx)(r.th,{children:"Required"}),(0,d.jsx)(r.th,{children:"Default Value"})]})}),(0,d.jsxs)(r.tbody,{children:[(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"connector"})}),(0,d.jsx)(r.td,{children:"The name of the connector to use. (Valid value is kafka currently)"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"record_format"})}),(0,d.jsxs)(r.td,{children:["The only valid value is ",(0,d.jsx)(r.code,{children:"json"})," currently."]}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:"json"})]})]})]}),"\n",(0,d.jsx)(r.h3,{id:"kafka",children:"Kafka"}),"\n",(0,d.jsxs)(r.p,{children:["When using the ",(0,d.jsx)(r.code,{children:"kafka"})," connector, the following additional arguments are available on the ",(0,d.jsx)(r.code,{children:"StreamExtractor"}),":"]}),"\n",(0,d.jsxs)(r.table,{children:[(0,d.jsx)(r.thead,{children:(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.th,{children:"Argument"}),(0,d.jsx)(r.th,{children:"Description"}),(0,d.jsx)(r.th,{children:"Type"}),(0,d.jsx)(r.th,{children:"Required"}),(0,d.jsx)(r.th,{children:"Default Value"})]})}),(0,d.jsxs)(r.tbody,{children:[(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"topic_name"})}),(0,d.jsx)(r.td,{children:"The name of the topic to consume from."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"group_id"})}),(0,d.jsx)(r.td,{children:"The name of the consumer group."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"bootstrap_servers"})}),(0,d.jsx)(r.td,{children:"A list of kafka servers to connect to."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"List[str]"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"offset_reset"})}),(0,d.jsx)(r.td,{children:"The offset to start consuming from."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"latest"})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"security_protocol"})}),(0,d.jsx)(r.td,{children:"The security protocol to use."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"PLAINTEXT"})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"max_records"})}),(0,d.jsx)(r.td,{children:"The maximum number of records to pull in one call."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"int"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"10"})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"poll_timeout"})}),(0,d.jsx)(r.td,{children:"The maximum time to wait for records in seconds. Once met, the extractor will signal to the other steps to  flush memory of batched data and then re-poll"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"int"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"30"})})]})]})]}),"\n",(0,d.jsx)(r.h2,{id:"athenaextractor",children:(0,d.jsx)(r.code,{children:"AthenaExtractor"})}),"\n",(0,d.jsxs)(r.p,{children:["The ",(0,d.jsx)(r.code,{children:"AthenaExtractor"})," is used to pull data from an AWS Athena query.\nThe ",(0,d.jsx)(r.code,{children:"AthenaExtractor"})," is accessible via the ",(0,d.jsx)(r.code,{children:"implementation"})," string ",(0,d.jsx)(r.code,{children:"nodestream.pipeline.extractors.stores.aws:AthenaExtractor"}),".\nThe arguments for the ",(0,d.jsx)(r.code,{children:"AthenaExtractor"})," are:"]}),"\n",(0,d.jsxs)(r.table,{children:[(0,d.jsx)(r.thead,{children:(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.th,{children:"Argument"}),(0,d.jsx)(r.th,{children:"Description"}),(0,d.jsx)(r.th,{children:"Type"}),(0,d.jsx)(r.th,{children:"Required"}),(0,d.jsx)(r.th,{children:"Default Value"})]})}),(0,d.jsxs)(r.tbody,{children:[(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"query"})}),(0,d.jsx)(r.td,{children:"The query to run. The results yielded by the extractor will reflect the shape of the data returned from the query."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"workgroup"})}),(0,d.jsxs)(r.td,{children:["The name of the workgroup to use. See the ",(0,d.jsx)(r.a,{href:"https://docs.aws.amazon.com/athena/latest/ug/user-created-workgroups.html",children:"AWS DOCS"})," for more information."]}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"database"})}),(0,d.jsx)(r.td,{children:"The name of the database to use."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"output_location"})}),(0,d.jsxs)(r.td,{children:["The output location string to store results for Athena. See the ",(0,d.jsx)(r.a,{href:"https://docs.aws.amazon.com/athena/latest/ug/querying.html",children:"AWS Docs"})," for more information."]}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"poll_interval_seconds"})}),(0,d.jsx)(r.td,{children:"The interval in seconds to poll for the results of the query."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"int"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"1"})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"page_size"})}),(0,d.jsx)(r.td,{children:"The number of records to pull in one call."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"int"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"500"})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"assume_role_arn"})}),(0,d.jsx)(r.td,{children:"The ARN of the role to assume when pulling data from Athena."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:'""'})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"assume_role_external_id"})}),(0,d.jsx)(r.td,{children:"The external ID to use when assuming the role."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:'""'})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"**session_args"})}),(0,d.jsxs)(r.td,{children:["Additional arguments to pass to the ",(0,d.jsx)(r.a,{href:"https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html",children:"boto3.Session"})," function."]}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"{}"})})]})]})]}),"\n",(0,d.jsx)(r.h2,{id:"simpleapiextractor",children:(0,d.jsx)(r.code,{children:"SimpleApiExtractor"})}),"\n",(0,d.jsxs)(r.p,{children:["The ",(0,d.jsx)(r.code,{children:"SimpleApiExtractor"})," is used to pull data from a simple JSON API.\nThe ",(0,d.jsx)(r.code,{children:"SimpleApiExtractor"})," is accessible via the ",(0,d.jsx)(r.code,{children:"implementation"})," string ",(0,d.jsx)(r.code,{children:"nodestream.pipeline.extractors:SimpleApiExtractor"}),".\nThe arguments for the ",(0,d.jsx)(r.code,{children:"SimpleApiExtractor"})," are:"]}),"\n",(0,d.jsxs)(r.table,{children:[(0,d.jsx)(r.thead,{children:(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.th,{children:"Argument"}),(0,d.jsx)(r.th,{children:"Description"}),(0,d.jsx)(r.th,{children:"Type"}),(0,d.jsx)(r.th,{children:"Required"}),(0,d.jsx)(r.th,{children:"Default Value"})]})}),(0,d.jsxs)(r.tbody,{children:[(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"url"})}),(0,d.jsx)(r.td,{children:"The URL of the API to call."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"yield_from"})}),(0,d.jsx)(r.td,{children:"The key to yield from the response. This will liely be a list objects in the repsonse."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:"Yields Entire Response if unset."})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"offset_query_param"})}),(0,d.jsx)(r.td,{children:"The name of the query parameter to use for pagination.  If set pagination will occur."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:"Unset. Does not paginate."})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"headers"})}),(0,d.jsx)(r.td,{children:"A dictionary of headers to send with the request."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"dict"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"{}"})})]})]})]}),"\n",(0,d.jsx)(r.h2,{id:"timetoliveconfigurationextractor",children:(0,d.jsx)(r.code,{children:"TimeToLiveConfigurationExtractor"})}),"\n",(0,d.jsxs)(r.p,{children:["The ",(0,d.jsx)(r.code,{children:"TimeToLiveConfigurationExtractor"})," is used to pull data for a Time To Live Pipeline.\nThe ",(0,d.jsx)(r.code,{children:"TimeToLiveConfigurationExtractor"})," is accessible via the ",(0,d.jsx)(r.code,{children:"implementation"})," string ",(0,d.jsx)(r.code,{children:"nodestream.pipeline.extractors:TimeToLiveConfigurationExtractor"}),".\nThe arguments for the ",(0,d.jsx)(r.code,{children:"TimeToLiveConfigurationExtractor"})," are:"]}),"\n",(0,d.jsxs)(r.table,{children:[(0,d.jsx)(r.thead,{children:(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.th,{children:"Argument"}),(0,d.jsx)(r.th,{children:"Description"}),(0,d.jsx)(r.th,{children:"Type"}),(0,d.jsx)(r.th,{children:"Required"}),(0,d.jsx)(r.th,{children:"Default Value"})]})}),(0,d.jsxs)(r.tbody,{children:[(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"configurations"})}),(0,d.jsx)(r.td,{children:"A list of configurations for the Time To Live pipeline."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"List[Dict[str, Any]]"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"graph_object_type"})}),(0,d.jsxs)(r.td,{children:["The type of object to apply the TTL to. (",(0,d.jsx)(r.code,{children:"NODE"})," or ",(0,d.jsx)(r.code,{children:"RELATIONHIP"}),")"]}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"override_expiry_in_hours"})}),(0,d.jsx)(r.td,{children:"The number of hours after which the object should be deleted. Overrides any locally set version."}),(0,d.jsx)(r.td,{}),(0,d.jsx)(r.td,{}),(0,d.jsx)(r.td,{})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"int"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:"N/A"}),(0,d.jsx)(r.td,{}),(0,d.jsx)(r.td,{})]})]})]}),"\n",(0,d.jsxs)(r.p,{children:["Each object in the ",(0,d.jsx)(r.code,{children:"configurations"})," list should include the following arguments:"]}),"\n",(0,d.jsxs)(r.table,{children:[(0,d.jsx)(r.thead,{children:(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.th,{children:"Argument"}),(0,d.jsx)(r.th,{children:"Description"}),(0,d.jsx)(r.th,{children:"Type"}),(0,d.jsx)(r.th,{children:"Required"}),(0,d.jsx)(r.th,{children:"Default Value"})]})}),(0,d.jsxs)(r.tbody,{children:[(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"object_type"})}),(0,d.jsx)(r.td,{children:"The object type to apply the TTL to. (Node or relationship type)"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"Yes"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"expiry_in_hours"})}),(0,d.jsx)(r.td,{children:"The number of hours after which the object should be deleted."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"int"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:"N/A"})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"enabled"})}),(0,d.jsx)(r.td,{children:"Whether or not the TTL is enabled. Defaults to True."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"bool"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"True"})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"batch_size"})}),(0,d.jsx)(r.td,{children:"The number of objects to delete in a single batch. Defaults to 100."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"int"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"100"})})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"custom_query"})}),(0,d.jsx)(r.td,{children:"A custom query to use to delete the objects. If not provided, the default query will be used. The custom query is database implmentation specific."}),(0,d.jsx)(r.td,{children:(0,d.jsx)(r.code,{children:"str"})}),(0,d.jsx)(r.td,{children:"No"}),(0,d.jsx)(r.td,{children:"N/A"})]})]})]}),"\n",(0,d.jsx)(r.h2,{id:"reminder",children:"Reminder"}),"\n",(0,d.jsxs)(r.p,{children:["Remember that you can always build your own extractors by implementing the ",(0,d.jsx)(r.code,{children:"Extractor"})," interface. See ",(0,d.jsx)(r.a,{href:"../../tutorials-advanced/new-steps",children:"here"})," for more information."]})]})}function x(e={}){const{wrapper:r}={...(0,s.M)(),...e.components};return r?(0,d.jsx)(r,{...e,children:(0,d.jsx)(o,{...e})}):o(e)}},2172:(e,r,t)=>{t.d(r,{I:()=>c,M:()=>n});var d=t(1504);const s={},i=d.createContext(s);function n(e){const r=d.useContext(i);return d.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:n(e.components),d.createElement(i.Provider,{value:r},e.children)}}}]);