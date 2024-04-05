"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3104],{9568:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"/2024/04/05/nodestream-0-12","metadata":{"permalink":"/docs/blog/2024/04/05/nodestream-0-12","editUrl":"https://github.com/nodesteram-proj/docs/tree/main/packages/create-docusaurus/templates/shared/blog/2024-04-05-nodestream-0-12/index.md","source":"@site/blog/2024-04-05-nodestream-0-12/index.md","title":"Nodestream 0.12 Release","description":"We are happy to announce the release of Nodestream 0.12.","date":"2024-04-05T00:00:00.000Z","formattedDate":"April 5, 2024","tags":[],"readingTime":3.99,"hasTruncateMarker":false,"authors":[],"frontMatter":{},"unlisted":false,"nextItem":{"title":"Software Vulnerability Analysis using SBOMs, Amazon Neptune, and Nodestream","permalink":"/docs/blog/2024/04/05/nodestream-sbom-preview"}},"content":"We are happy to announce the release of Nodestream 0.12. \\nThis release marks the largest update to Nodestream since its inception. \\nWe\'ve spent a lot of time improving the core of nodestream and we\'re excited to share it with you.\\n\\nBefore we get into the details, we want to thank the community for their support and feedback. \\nAs such, we have completely revamped the documentation to make it easier to use and navigate.\\nThis releases comes with two headline features [Database Migrations](#database-migrations) and [Multi-Database Support](#multi-database-support).\\n\\n## Major Features\\n\\n### Database Migrations \\n\\nIn the past, nodestream attempted to automatically create indexes and constraints on the database based on your pipeline at runtime.\\nThis was done by introspecting the schema of the entire project and generating the appropriate queries to create the indexes and constraints.\\nThis was a very powerful feature but it had a few drawbacks:\\n- **It was redundant.** The same indexes and constraints were being created with `IF NOT EXISTS` clauses every time the pipeline was run.\\n- **It was slow.** The queries were being executed serially and the pipeline was locked until they were all completed.\\n- **It was error prone.** If the database was not in a state that allowed for the creation of the indexes and constraints, the pipeline would fail.\\n- **It was high friction.** There was no way to refactor the database without manual intervention. If the schema changed, the pipeline would fail and the user would have to manually remove the indexes, constraints, and sometimes data before running the pipeline again.\\n\\nTo address these issues, `nodestream` 0.12 has introduced the concept of migrations.\\nMigrations are a way of encapsulating changes to the database schema in a way that can be applied incrementally. \\nConceptually, they are similar to the migrations in the [Django](https://docs.djangoproject.com/en/5.0/topics/migrations/), [Rails](https://guides.rubyonrails.org/v3.2/migrations.html), [Neo4j Migrations](https://neo4j.com/labs/neo4j-migrations/2.0/), and [Flyway](https://documentation.red-gate.com/fd/migrations-184127470.html) frameworks.\\n\\n![Database Migrations](./migrations.gif)\\n\\nMigrations are defined in a directory called `migrations` in the root of your project.\\nEach migration is a yaml file that contains data about the migration and its dependencies.\\nYou can create migrations by running the `nodestream migrations make` command.\\n\\nCheck out the changes to the tutorial on [Database Migrations](/docs/docs/tutorial-basics/prepare-your-database) as well as the new tutorial on [Working With Migrations](/docs/docs/tutorials-intermediate/working-with-migrations) to learn more.\\n\\nCore Contributors to this feature include:\\n- [Zach Probst](https://github.com/zprobst)\\n- [Grant Hoffman](https://github.com/grantleehoffman)\\n- [Yason Khaburzaniya](https://github.com/yasonk)\\n- [Chad Cloes](https://github.com/ccloes)\\n- [Angelo Santos](https://github.com/angelosantos4)\\n\\n### Multi-Database Support \\n\\nPrior to this release, the only database that was supported was neo4j. \\nWhile this is a category leading database, the goal of nodestream is to be database agnostic and afford developer the ability to use the database or _databases_ that best fits their needs. \\nAs such, we are happy to announce that nodestream now supports [Amazon Neptune](https://aws.amazon.com/neptune/) and [Amazon Neptune Analytics](https://docs.aws.amazon.com/neptune-analytics/latest/userguide/what-is-neptune-analytics.html).\\nTO accomedate that, we have moved the neo4j database connector into a separate package called [nodestream-plugin-neo4j](https://pypi.org/project/nodestream-plugin-neo4j/) and added a new package called [nodestream-plugin-neptune](https://pypi.org/project/nodestream-plugin-neptune/).\\n\\nStarting with this release, you use the `--database` flag to generate neptune boilerplate configuration. \\n\\n![Database Migrations](./neptune.gif)\\n\\n**Check out the docs on it [here](/docs/docs/databases/neptune/)**.\\n\\nCore Contributors to this feature include:\\n- [Zach Probst](https://github.com/zprobst)\\n- [Cole Greer](https://github.com/Cole-Greer)\\n- [Dave Bechberger](https://github.com/bechbd)\\n- [Alexey Temnikov](https://github.com/alexey-temnikov)\\n- [Yang Xia](https://github.com/xiazcy)\\n\\n## Other Features\\n\\n### Parquet Support\\n\\nMany customers have data stored in parquet format. \\nPaquet is a columnar storage format that is optimized for reading and writing large datasets.\\nWe are happy to announce that nodestream now supports parquet as a first class citizen.\\n\\n**Check out the docs on it [here](/docs/docs/reference/extractors/#the-file-extractor-family)**.\\n\\nCore Contributors to this feature include:\\n- [Zach Probst](https://github.com/zprobst)\\n- [Dave Bechberger](https://github.com/bechbd)\\n- [Cole Greer](https://github.com/Cole-Greer)\\n- [Leszek Kurzyna](https://github.com/leszek-bq)\\n\\n### Include Properties From Maps\\n\\nIn the past, each property you wanted to include in the pipeline had to be explicitly defined in the pipeline configuration. \\nThis was a bit cumbersome and error prone.\\nStarting with this release, you can now include all properties by defining an expression that returns a map at the `properties` key directly instead of a mapping of property names to expressions.\\n\\nFor example, here are two examples on the `properties` and `source_node` interpretations:\\n\\n```yaml\\n- type: source_node\\n  node_type: User\\n  key:\\n    email: !jmespath email\\n  properties: !jmespath path.to.properties.mapping\\n  normalization:\\n    do_trim_whitespace: true\\n```\\n\\n```yaml\\n- type: properties\\n  properties: !jmespath path.to.properties.mapping\\n  normalization:\\n    do_lowercase_strings: true\\n```\\n\\n**Check out the docs on it [here](/docs/docs/reference/interpreting)**.\\n\\nCore Contributors to this feature include:\\n- [Zach Probst](https://github.com/zprobst)\\n- [Dave Bechberger](https://github.com/bechbd)\\n\\n### Performance Improvements\\n\\nWe\'ve made a small number of performance improvements to the core of nodestream that should result in faster processing times and lower memory usage.\\nMost notably, we\'ve cache the `last_ingested_at` timestamp for nodes and relationships to reduce the number of times we create objects in memory. \\nWe\'ve observed a 10% improvement in processing times and a 5% reduction in memory usage in our testing.\\n\\nCore Contributors to this feature include:\\n- [Zach Probst](https://github.com/zprobst)\\n- [Yason Khaburzaniya](https://github.com/yasonk)\\n- [Grant Hoffman](https://github.com/grantleehoffman)"},{"id":"/2024/04/05/nodestream-sbom-preview","metadata":{"permalink":"/docs/blog/2024/04/05/nodestream-sbom-preview","editUrl":"https://github.com/nodesteram-proj/docs/tree/main/packages/create-docusaurus/templates/shared/blog/2024-04-05-nodestream-sbom-preview/index.md","source":"@site/blog/2024-04-05-nodestream-sbom-preview/index.md","title":"Software Vulnerability Analysis using SBOMs, Amazon Neptune, and Nodestream","description":"Note: Both the Nodestream Neptune and Nodestream SBOM plugins are currently preview releases","date":"2024-04-05T00:00:00.000Z","formattedDate":"April 5, 2024","tags":[],"readingTime":7.825,"hasTruncateMarker":false,"authors":[],"frontMatter":{},"unlisted":false,"prevItem":{"title":"Nodestream 0.12 Release","permalink":"/docs/blog/2024/04/05/nodestream-0-12"},"nextItem":{"title":"Welcome","permalink":"/docs/blog/welcome"}},"content":"**Note**: Both the Nodestream Neptune and Nodestream SBOM plugins are currently preview releases\\n\\nRecently, (March 2024) [a severe vulnerability was found to have been added to a common library, XZ utility](https://www.cisecurity.org/advisory/a-vulnerability-in-xz-utils-could-allow-for-remote-code-execution_2024-033). Unfortunately, serious software vulnerabilities are not isolated incidents, as in late 2021, a [critical security vulnerability was discovered in a commonly used logging library, Log4j](https://www.ncsc.gov.uk/information/log4j-vulnerability-what-everyone-needs-to-know). While the origin of the issues differ, Log4j was an oversight while XZ was an explicit backdoor, the outcome for users was the end same. Once each vulnerability was known, companies and individuals spent many hours combing through countless applications, looking for and patching systems running vulnerable versions of the software.\\n\\nAs this effort was ongoing, many were asking, \\"Isn\'t there a better way to track this information?\\"\\n\\nIn this post, we will discuss the work we have been doing around creating a plugin for Nodestream that provides a unified graph model for SBOMs ingestion and analysis. We will combine this with the plugin for Amazon Neptune to demonstrate how you can find insights for software vulnerabilities in application stacks. Let\u2019s first talk a bit about what an SBOM is and why you should use a graph for analysis.\\n\\n## What is a Software Bill of Materials (SBOM) and why use Graphs\\n\\nA software bill of materials (SBOM) is a critical component of software development and management, helping organizations to improve the transparency, security, and reliability of their software applications. An SBOM acts as an \\"ingredient list\\" of libraries and components of a software application that:\\n\\n- Enables software creators to track dependencies within their applications\\n- Provides security personnel the ability to examine and assess the risk of potential vulnerabilities within an environment\\n- Provides legal personnel with the information needed to assure that a particular software is in compliance with all licensing requirements.\\n\\nA software bill of materials (SBOM) is a comprehensive list of the components, libraries, and dependencies used in a software application or system. It provides a detailed breakdown of the software\'s architecture, including the names, versions, licenses, and optionally the vulnerabilities of each component and describes the complex dependencies and relationships between components of a software system, including multi-level hierarchies and recursive relationships.\\n\\nGraphs are excellent for modeling these kinds of interconnected relationships, with nodes representing components and edges representing dependencies and relationships between these components. Graph data structures handle recursive relationships very naturally, making it easy to analyze networks and flows. Using graph algorithms and metrics, allows you to analyze and identify critical components and dependencies, single points of failure, security vulnerabilities, license compatibilities, etc. for use cases such as:\\n\\n- Dependency graphs - These show how different components in the software relate to and depend on each other. Graphs make these complex relationships easier to visualize.\\n- Vulnerability Graphs - Graphs make it easy to determine and assign associated risks with different vulnerabilities to prioritize fixing known issues.\\n- Supply chain graphs - SBOMs trace the components and dependencies up the software supply chain. Graphs can illustrate the flow of open-source components from lower-level suppliers up to the final product. This helps identify vulnerabilities or licensing issues in the supply chain.\\n\\n## How to use Graphs for SBOM analysis\\n\\nWhile using graphs to assist with SBOM analysis is not new, it also has not been trivial to get the data loaded in due to differing formats, with the two most popular being [CycloneDX](https://cyclonedx.org/) and [SPDX](https://spdx.dev/). To assist with the data loading and analysis, I recently worked on an [SBOM plugin](https://github.com/nodestream-proj/nodestream-plugin-sbom/tree/main) for [Nodestream](https://nodestream-proj.github.io/docs/docs/intro/) to provide a simple way to load SBOMs into an opinionated graph data model from local files, GitHub, or Amazon Inspector. [Nodestream](https://nodestream-proj.github.io/docs/docs/intro/) is a Python framework for performing graph database ETL. The SBOM plugin extends this framework to provide a\\n\\n### Loading Data into SBOMs into our Graph\\n\\nTo get started loading your SBOM files into Amazon Neptune, we first need to setup an Amazon Neptune Analytics Graph as well as a Neptune Notebook to perform our analysis. To configure a Neptune Analytics Graph you can follow the documentation here: https://docs.aws.amazon.com/neptune-analytics/latest/userguide/create-graph-using-console.html\\n\\nNeptune Notebooks is a managed open-source graph-notebook project provides a plethora of Jupyter extensions and sample notebooks that make it easy to interact with and learn to use a Neptune Analytics graph. This can be configured using the documentation here: https://docs.aws.amazon.com/neptune-analytics/latest/userguide/notebooks.html\\n\\nNow that we have setup our database and analysis environment we next need to install the Nodestream plugins for Neptune and SBOM.\\n\\n`pip install -q pyyaml nodestream-plugin-neptune nodestream-plugin-sbom`\\n\\nWith those data files installed, all we need to do is set our configuration in the `nodestream.yaml` file as shown below. In this example, we are going to load the SBOM files for Nodestream, the Nodestream Neptune Plugin, and the Nodestream SBOM plugin into our database, directly from GitHub.\\n\\n```\\nplugins:\\n- name: sbom\\n  config:\\n    repos:[nodestream-proj/nodestream, nodestream-proj/nodestream-plugin-sbom, nodestream-proj/nodestream-plugin-neptune]\\ntargets:\\n  my-neptune:\\n    database: neptune\\n    graph_id: g-<GRAPH ID>\\n    mode: analytics\\n```\\n\\nWith our configuration setup, we can run the import using the following command:\\n\\n`nodestream run sbom_github --target my-neptune`\\n\\nAfter we run the data load, we get a graph that similar to the image below.\\n\\n![SBOM Model Overview](sbom_overview.png \\"SBOM Data Overview\\")\\n\\n### What does our graph look like?\\n\\nLet\u2019s take a look at the types of data that we are storing in our graph. The plugin uses the opinionated graph data model shown below to represent SBOM data files.\\n![SBOM Graph schema](schema.png \\"SBOM Graph Schema\\")\\nThis model contains the following elements:\\n\\n**Node Types**\\n\\n- `Document` - This represents the SBOM document as well as the metadata associated with that SBOM.\\n- `Component` - This represents a specific component of a software system.\\n- `Reference` - This represents a reference to any external system which the system wanted to include as a reference. This can range from package managers, URLs to external websites, etc.\\n- `Vulnerability` - This represents a specific known vulnerability for a component.\\n- `License` - The license for the component or package.\\n\\n**Edge Types**\\n\\n- `DESCRIBES`/`DEPENDS_ON`/`DEPENDENCY_OF`/`DESCRIBED_BY`/`CONTAINS` - This represents the type of relationship between a `Document` and a `Component` in the system.\\n- `REFERS_TO` - This represents a reference between a `Component` and a `Reference`\\n- `AFFECTS` - This represents that a particular `Component` is affected by the connected `Vulnerability`\\n\\nThe properties associated with each element will vary depending on the input format used, and the optional information contained in each file.\\n\\n## Analyzing SBOMs\\n\\nNow that we have our data loaded into our graph, the next step is to start to extract insights into what is actually important in our SBOM data.\\n\\nOne common use case is to investigate shared dependencies across projects. Shared dependencies allow development and security teams to better understand the security posture of the organization through identification of shared risks. Let\'s start by taking a look at the most shared dependencies between these projects using the query below.\\n\\n```\\nMATCH (n:Component)\\nWHERE exists(n.name)\\nCALL neptune.algo.degree(n, {traversalDirection: \'inbound\', edgeLabels: [\'DEPENDS_ON\']})\\nYIELD node, degree\\nRETURN node.name, degree\\nORDER BY degree DESC\\nLIMIT 10\\n```\\n\\nRunning this query will show us that there are quite a few dependencies that are shared across all three projects. To do this analysis, we used a graph algorithm known as [Degree Centrality](https://docs.aws.amazon.com/neptune-analytics/latest/userguide/degree.html) which counts the number of edges connected to a node. This measure of how connected the node is can in turn indicate the node\'s importance and level of influence in the network.\\n![Results](analyze_query_1.png \\"Results\\")\\nRunning the query below shows us that there are 31 `Components` that are shared across all the projects.\\n\\n```\\nMATCH (n:Component)\\nWHERE exists(n.name)\\nCALL neptune.algo.degree(n, {traversalDirection: \'inbound\', edgeLabels: [\'DEPENDS_ON\']})\\nYIELD node, degree\\nWHERE degree=3\\nRETURN count(node)\\n```\\n\\nGiven that this is a closely connected group of projects, it is not a surprise that there are many shared components. Given that one of the strengths of graphs is the ability to visualize the connectedness between data, let\u2019s take a look at how they are connected.\\n\\n```\\nMATCH (n:Component)\\nWHERE exists(n.name)\\nCALL neptune.algo.degree(n, {traversalDirection: \'inbound\', edgeLabels: [\'DEPENDS_ON\']})\\nYIELD node, degree\\nWHERE degree = 3\\nWITH node, degree\\nMATCH p=(node)-[]-()\\nRETURN p\\n```\\n\\n![Results](analyze_query_2.png \\"Results\\")\\n\\nAnother common use case is to investigate licensing across multiple projects. This sort of investigation benefits from the connectedness across the graph by leveraging the connectedness to find how component licenses are connected to each other. Let\u2019s take a look at what other licenses are associated with the `lgpl-2.1-or-later` licensed components.\\n\\n```\\nMATCH p=(l:License)<-[:LICENSED_BY]-(:Component)<-[:DEPENDS_ON]-(:Document)\\n-[:DEPENDS_ON]->(:Component)-[:LICENSED_BY]->(l2)\\nWHERE l.name = \'lgpl-2.1-or-later\' and l<>l2\\nRETURN DISTINCT l2.name\\n```\\n\\n![Results](analyze_query_3.png \\"Results\\")\\n\\nAs we see, there are quite a few other licenses used in these projects. We can leverage the visual nature of graph results to gain some insight into how components are connected. In this case, let\u2019s see how components with the `lgpl-2.1-or-later` are connected to components with the `unlicense`.\\n\\n```\\nMATCH p=(l:License)\u2190[:LICENSED_BY]-(:Component)\u2190[:DEPENDS_ON]-(:Document)\\n-[:DEPENDS_ON]\u2192(:Component)-[:LICENSED_BY]\u2192(l2)\\nWHERE l.name = \'lgpl-2.1-or-later\' and l<>l2\\nRETURN DISTINCT l2.name\\n```\\n\\n![Results](analyze_query_4.png \\"Results\\")\\n\\nWe see that there exists one path in our graph between these two licenses.\\n\\n## Next Steps\\n\\nAs we have seen, using graphs to perform analysis of SBOM data can be a powerful tool in your toolbox to gain insights into the connections between software projects. What I have shown here is only the beginning of the types of analysis you can perform with this data. For a more detailed walkthrough of using graphs for SBOM analysis, I recommend taking a look at the following notebooks:\\n\\n[SBOM Dependency Analysis](https://github.com/aws/graph-notebook/blob/ISSUE-558/src/graph_notebook/notebooks/02-Neptune-Analytics/03-Sample-Use-Cases/03-Software-Bill-Of-Materials/01-SBOM-Dependency-Analysis.ipynb)\\n[SBOM Vulnerability Analysis](https://github.com/aws/graph-notebook/blob/ISSUE-558/src/graph_notebook/notebooks/02-Neptune-Analytics/03-Sample-Use-Cases/03-Software-Bill-Of-Materials/02-SBOM-Vulnerability-Analysis.ipynb)"},{"id":"welcome","metadata":{"permalink":"/docs/blog/welcome","editUrl":"https://github.com/nodesteram-proj/docs/tree/main/packages/create-docusaurus/templates/shared/blog/2024-03-30-welcome.md","source":"@site/blog/2024-03-30-welcome.md","title":"Welcome","description":"Welcome to the new nodestream documentation and project site!","date":"2024-03-30T00:00:00.000Z","formattedDate":"March 30, 2024","tags":[{"label":"welcome","permalink":"/docs/blog/tags/welcome"},{"label":"nodestream","permalink":"/docs/blog/tags/nodestream"}],"readingTime":0.545,"hasTruncateMarker":false,"authors":[{"name":"Zach Probst","title":"Maintainer of Nodestream","url":"https://github.com/zprobst","imageURL":"https://github.com/zprobst.png","key":"zprobst"}],"frontMatter":{"slug":"welcome","title":"Welcome","authors":["zprobst"],"tags":["welcome","nodestream"]},"unlisted":false,"prevItem":{"title":"Software Vulnerability Analysis using SBOMs, Amazon Neptune, and Nodestream","permalink":"/docs/blog/2024/04/05/nodestream-sbom-preview"}},"content":"Welcome to the new nodestream documentation and project site! \\nWe are excited to share with you the new features and improvements we have been working on.\\n\\nWe have been working hard to improve the documentation and make it easier to use and navigate.\\nWe have also been working on improving the project site to make it easier to find the information you need.\\n\\nWe hope you find the new documentation and project site helpful and easy to use!\\n\\nBy the way, thanks to the [Docusaurus](https://docusaurus.io/) team for creating such a great tool!\\n\\nIf you have any questions or feedback, please feel free to reach out to us on [GitHub](https://github.com/nodestream-proj/nodestream)!"}]}')}}]);