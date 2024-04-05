"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6449],{2996:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>r,toc:()=>d});var s=t(7624),a=t(2172);const o={},i="Software Vulnerability Analysis using SBOMs, Amazon Neptune, and Nodestream",r={permalink:"/docs/blog/2024/04/05/nodestream-sbom-preview",editUrl:"https://github.com/nodesteram-proj/docs/tree/main/packages/create-docusaurus/templates/shared/blog/2024-04-05-nodestream-sbom-preview/index.md",source:"@site/blog/2024-04-05-nodestream-sbom-preview/index.md",title:"Software Vulnerability Analysis using SBOMs, Amazon Neptune, and Nodestream",description:"Note: Both the Nodestream Neptune and Nodestream SBOM plugins are currently preview releases",date:"2024-04-05T00:00:00.000Z",formattedDate:"April 5, 2024",tags:[],readingTime:7.825,hasTruncateMarker:!1,authors:[],frontMatter:{},unlisted:!1,prevItem:{title:"Nodestream 0.12 Release",permalink:"/docs/blog/2024/04/05/nodestream-0-12"},nextItem:{title:"Welcome",permalink:"/docs/blog/welcome"}},l={authorsImageUrls:[]},d=[{value:"What is a Software Bill of Materials (SBOM) and why use Graphs",id:"what-is-a-software-bill-of-materials-sbom-and-why-use-graphs",level:2},{value:"How to use Graphs for SBOM analysis",id:"how-to-use-graphs-for-sbom-analysis",level:2},{value:"Loading Data into SBOMs into our Graph",id:"loading-data-into-sboms-into-our-graph",level:3},{value:"What does our graph look like?",id:"what-does-our-graph-look-like",level:3},{value:"Analyzing SBOMs",id:"analyzing-sboms",level:2},{value:"Next Steps",id:"next-steps",level:2}];function h(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.M)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Note"}),": Both the Nodestream Neptune and Nodestream SBOM plugins are currently preview releases"]}),"\n",(0,s.jsxs)(n.p,{children:["Recently, (March 2024) ",(0,s.jsx)(n.a,{href:"https://www.cisecurity.org/advisory/a-vulnerability-in-xz-utils-could-allow-for-remote-code-execution_2024-033",children:"a severe vulnerability was found to have been added to a common library, XZ utility"}),". Unfortunately, serious software vulnerabilities are not isolated incidents, as in late 2021, a ",(0,s.jsx)(n.a,{href:"https://www.ncsc.gov.uk/information/log4j-vulnerability-what-everyone-needs-to-know",children:"critical security vulnerability was discovered in a commonly used logging library, Log4j"}),". While the origin of the issues differ, Log4j was an oversight while XZ was an explicit backdoor, the outcome for users was the end same. Once each vulnerability was known, companies and individuals spent many hours combing through countless applications, looking for and patching systems running vulnerable versions of the software."]}),"\n",(0,s.jsx)(n.p,{children:'As this effort was ongoing, many were asking, "Isn\'t there a better way to track this information?"'}),"\n",(0,s.jsx)(n.p,{children:"In this post, we will discuss the work we have been doing around creating a plugin for Nodestream that provides a unified graph model for SBOMs ingestion and analysis. We will combine this with the plugin for Amazon Neptune to demonstrate how you can find insights for software vulnerabilities in application stacks. Let\u2019s first talk a bit about what an SBOM is and why you should use a graph for analysis."}),"\n",(0,s.jsx)(n.h2,{id:"what-is-a-software-bill-of-materials-sbom-and-why-use-graphs",children:"What is a Software Bill of Materials (SBOM) and why use Graphs"}),"\n",(0,s.jsx)(n.p,{children:'A software bill of materials (SBOM) is a critical component of software development and management, helping organizations to improve the transparency, security, and reliability of their software applications. An SBOM acts as an "ingredient list" of libraries and components of a software application that:'}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Enables software creators to track dependencies within their applications"}),"\n",(0,s.jsx)(n.li,{children:"Provides security personnel the ability to examine and assess the risk of potential vulnerabilities within an environment"}),"\n",(0,s.jsx)(n.li,{children:"Provides legal personnel with the information needed to assure that a particular software is in compliance with all licensing requirements."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"A software bill of materials (SBOM) is a comprehensive list of the components, libraries, and dependencies used in a software application or system. It provides a detailed breakdown of the software's architecture, including the names, versions, licenses, and optionally the vulnerabilities of each component and describes the complex dependencies and relationships between components of a software system, including multi-level hierarchies and recursive relationships."}),"\n",(0,s.jsx)(n.p,{children:"Graphs are excellent for modeling these kinds of interconnected relationships, with nodes representing components and edges representing dependencies and relationships between these components. Graph data structures handle recursive relationships very naturally, making it easy to analyze networks and flows. Using graph algorithms and metrics, allows you to analyze and identify critical components and dependencies, single points of failure, security vulnerabilities, license compatibilities, etc. for use cases such as:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Dependency graphs - These show how different components in the software relate to and depend on each other. Graphs make these complex relationships easier to visualize."}),"\n",(0,s.jsx)(n.li,{children:"Vulnerability Graphs - Graphs make it easy to determine and assign associated risks with different vulnerabilities to prioritize fixing known issues."}),"\n",(0,s.jsx)(n.li,{children:"Supply chain graphs - SBOMs trace the components and dependencies up the software supply chain. Graphs can illustrate the flow of open-source components from lower-level suppliers up to the final product. This helps identify vulnerabilities or licensing issues in the supply chain."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"how-to-use-graphs-for-sbom-analysis",children:"How to use Graphs for SBOM analysis"}),"\n",(0,s.jsxs)(n.p,{children:["While using graphs to assist with SBOM analysis is not new, it also has not been trivial to get the data loaded in due to differing formats, with the two most popular being ",(0,s.jsx)(n.a,{href:"https://cyclonedx.org/",children:"CycloneDX"})," and ",(0,s.jsx)(n.a,{href:"https://spdx.dev/",children:"SPDX"}),". To assist with the data loading and analysis, I recently worked on an ",(0,s.jsx)(n.a,{href:"https://github.com/nodestream-proj/nodestream-plugin-sbom/tree/main",children:"SBOM plugin"})," for ",(0,s.jsx)(n.a,{href:"https://nodestream-proj.github.io/docs/docs/intro/",children:"Nodestream"})," to provide a simple way to load SBOMs into an opinionated graph data model from local files, GitHub, or Amazon Inspector. ",(0,s.jsx)(n.a,{href:"https://nodestream-proj.github.io/docs/docs/intro/",children:"Nodestream"})," is a Python framework for performing graph database ETL. The SBOM plugin extends this framework to provide a"]}),"\n",(0,s.jsx)(n.h3,{id:"loading-data-into-sboms-into-our-graph",children:"Loading Data into SBOMs into our Graph"}),"\n",(0,s.jsxs)(n.p,{children:["To get started loading your SBOM files into Amazon Neptune, we first need to setup an Amazon Neptune Analytics Graph as well as a Neptune Notebook to perform our analysis. To configure a Neptune Analytics Graph you can follow the documentation here: ",(0,s.jsx)(n.a,{href:"https://docs.aws.amazon.com/neptune-analytics/latest/userguide/create-graph-using-console.html",children:"https://docs.aws.amazon.com/neptune-analytics/latest/userguide/create-graph-using-console.html"})]}),"\n",(0,s.jsxs)(n.p,{children:["Neptune Notebooks is a managed open-source graph-notebook project provides a plethora of Jupyter extensions and sample notebooks that make it easy to interact with and learn to use a Neptune Analytics graph. This can be configured using the documentation here: ",(0,s.jsx)(n.a,{href:"https://docs.aws.amazon.com/neptune-analytics/latest/userguide/notebooks.html",children:"https://docs.aws.amazon.com/neptune-analytics/latest/userguide/notebooks.html"})]}),"\n",(0,s.jsx)(n.p,{children:"Now that we have setup our database and analysis environment we next need to install the Nodestream plugins for Neptune and SBOM."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"pip install -q pyyaml nodestream-plugin-neptune nodestream-plugin-sbom"})}),"\n",(0,s.jsxs)(n.p,{children:["With those data files installed, all we need to do is set our configuration in the ",(0,s.jsx)(n.code,{children:"nodestream.yaml"})," file as shown below. In this example, we are going to load the SBOM files for Nodestream, the Nodestream Neptune Plugin, and the Nodestream SBOM plugin into our database, directly from GitHub."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"plugins:\n- name: sbom\n  config:\n    repos:[nodestream-proj/nodestream, nodestream-proj/nodestream-plugin-sbom, nodestream-proj/nodestream-plugin-neptune]\ntargets:\n  my-neptune:\n    database: neptune\n    graph_id: g-<GRAPH ID>\n    mode: analytics\n"})}),"\n",(0,s.jsx)(n.p,{children:"With our configuration setup, we can run the import using the following command:"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"nodestream run sbom_github --target my-neptune"})}),"\n",(0,s.jsx)(n.p,{children:"After we run the data load, we get a graph that similar to the image below."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"SBOM Model Overview",src:t(2432).c+"",title:"SBOM Data Overview",width:"1422",height:"1324"})}),"\n",(0,s.jsx)(n.h3,{id:"what-does-our-graph-look-like",children:"What does our graph look like?"}),"\n",(0,s.jsxs)(n.p,{children:["Let\u2019s take a look at the types of data that we are storing in our graph. The plugin uses the opinionated graph data model shown below to represent SBOM data files.\n",(0,s.jsx)(n.img,{alt:"SBOM Graph schema",src:t(2760).c+"",title:"SBOM Graph Schema",width:"581",height:"481"}),"\nThis model contains the following elements:"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Node Types"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Document"})," - This represents the SBOM document as well as the metadata associated with that SBOM."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Component"})," - This represents a specific component of a software system."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Reference"})," - This represents a reference to any external system which the system wanted to include as a reference. This can range from package managers, URLs to external websites, etc."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Vulnerability"})," - This represents a specific known vulnerability for a component."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"License"})," - The license for the component or package."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Edge Types"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"DESCRIBES"}),"/",(0,s.jsx)(n.code,{children:"DEPENDS_ON"}),"/",(0,s.jsx)(n.code,{children:"DEPENDENCY_OF"}),"/",(0,s.jsx)(n.code,{children:"DESCRIBED_BY"}),"/",(0,s.jsx)(n.code,{children:"CONTAINS"})," - This represents the type of relationship between a ",(0,s.jsx)(n.code,{children:"Document"})," and a ",(0,s.jsx)(n.code,{children:"Component"})," in the system."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"REFERS_TO"})," - This represents a reference between a ",(0,s.jsx)(n.code,{children:"Component"})," and a ",(0,s.jsx)(n.code,{children:"Reference"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"AFFECTS"})," - This represents that a particular ",(0,s.jsx)(n.code,{children:"Component"})," is affected by the connected ",(0,s.jsx)(n.code,{children:"Vulnerability"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"The properties associated with each element will vary depending on the input format used, and the optional information contained in each file."}),"\n",(0,s.jsx)(n.h2,{id:"analyzing-sboms",children:"Analyzing SBOMs"}),"\n",(0,s.jsx)(n.p,{children:"Now that we have our data loaded into our graph, the next step is to start to extract insights into what is actually important in our SBOM data."}),"\n",(0,s.jsx)(n.p,{children:"One common use case is to investigate shared dependencies across projects. Shared dependencies allow development and security teams to better understand the security posture of the organization through identification of shared risks. Let's start by taking a look at the most shared dependencies between these projects using the query below."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"MATCH (n:Component)\nWHERE exists(n.name)\nCALL neptune.algo.degree(n, {traversalDirection: 'inbound', edgeLabels: ['DEPENDS_ON']})\nYIELD node, degree\nRETURN node.name, degree\nORDER BY degree DESC\nLIMIT 10\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Running this query will show us that there are quite a few dependencies that are shared across all three projects. To do this analysis, we used a graph algorithm known as ",(0,s.jsx)(n.a,{href:"https://docs.aws.amazon.com/neptune-analytics/latest/userguide/degree.html",children:"Degree Centrality"})," which counts the number of edges connected to a node. This measure of how connected the node is can in turn indicate the node's importance and level of influence in the network.\n",(0,s.jsx)(n.img,{alt:"Results",src:t(6871).c+"",title:"Results",width:"899",height:"359"}),"\nRunning the query below shows us that there are 31 ",(0,s.jsx)(n.code,{children:"Components"})," that are shared across all the projects."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"MATCH (n:Component)\nWHERE exists(n.name)\nCALL neptune.algo.degree(n, {traversalDirection: 'inbound', edgeLabels: ['DEPENDS_ON']})\nYIELD node, degree\nWHERE degree=3\nRETURN count(node)\n"})}),"\n",(0,s.jsx)(n.p,{children:"Given that this is a closely connected group of projects, it is not a surprise that there are many shared components. Given that one of the strengths of graphs is the ability to visualize the connectedness between data, let\u2019s take a look at how they are connected."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"MATCH (n:Component)\nWHERE exists(n.name)\nCALL neptune.algo.degree(n, {traversalDirection: 'inbound', edgeLabels: ['DEPENDS_ON']})\nYIELD node, degree\nWHERE degree = 3\nWITH node, degree\nMATCH p=(node)-[]-()\nRETURN p\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Results",src:t(5004).c+"",title:"Results",width:"1154",height:"1107"})}),"\n",(0,s.jsxs)(n.p,{children:["Another common use case is to investigate licensing across multiple projects. This sort of investigation benefits from the connectedness across the graph by leveraging the connectedness to find how component licenses are connected to each other. Let\u2019s take a look at what other licenses are associated with the ",(0,s.jsx)(n.code,{children:"lgpl-2.1-or-later"})," licensed components."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"MATCH p=(l:License)<-[:LICENSED_BY]-(:Component)<-[:DEPENDS_ON]-(:Document)\n-[:DEPENDS_ON]->(:Component)-[:LICENSED_BY]->(l2)\nWHERE l.name = 'lgpl-2.1-or-later' and l<>l2\nRETURN DISTINCT l2.name\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Results",src:t(8800).c+"",title:"Results",width:"908",height:"456"})}),"\n",(0,s.jsxs)(n.p,{children:["As we see, there are quite a few other licenses used in these projects. We can leverage the visual nature of graph results to gain some insight into how components are connected. In this case, let\u2019s see how components with the ",(0,s.jsx)(n.code,{children:"lgpl-2.1-or-later"})," are connected to components with the ",(0,s.jsx)(n.code,{children:"unlicense"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"MATCH p=(l:License)\u2190[:LICENSED_BY]-(:Component)\u2190[:DEPENDS_ON]-(:Document)\n-[:DEPENDS_ON]\u2192(:Component)-[:LICENSED_BY]\u2192(l2)\nWHERE l.name = 'lgpl-2.1-or-later' and l<>l2\nRETURN DISTINCT l2.name\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Results",src:t(5488).c+"",title:"Results",width:"565",height:"425"})}),"\n",(0,s.jsx)(n.p,{children:"We see that there exists one path in our graph between these two licenses."}),"\n",(0,s.jsx)(n.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,s.jsx)(n.p,{children:"As we have seen, using graphs to perform analysis of SBOM data can be a powerful tool in your toolbox to gain insights into the connections between software projects. What I have shown here is only the beginning of the types of analysis you can perform with this data. For a more detailed walkthrough of using graphs for SBOM analysis, I recommend taking a look at the following notebooks:"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/aws/graph-notebook/blob/ISSUE-558/src/graph_notebook/notebooks/02-Neptune-Analytics/03-Sample-Use-Cases/03-Software-Bill-Of-Materials/01-SBOM-Dependency-Analysis.ipynb",children:"SBOM Dependency Analysis"}),"\n",(0,s.jsx)(n.a,{href:"https://github.com/aws/graph-notebook/blob/ISSUE-558/src/graph_notebook/notebooks/02-Neptune-Analytics/03-Sample-Use-Cases/03-Software-Bill-Of-Materials/02-SBOM-Vulnerability-Analysis.ipynb",children:"SBOM Vulnerability Analysis"})]})]})}function c(e={}){const{wrapper:n}={...(0,a.M)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},6871:(e,n,t)=>{t.d(n,{c:()=>s});const s=t.p+"assets/images/analyze_query_1-caba0b29d04a259615e94657bad62d68.png"},5004:(e,n,t)=>{t.d(n,{c:()=>s});const s=t.p+"assets/images/analyze_query_2-1f39a8b8627249ee7c26b96efd2b5423.png"},8800:(e,n,t)=>{t.d(n,{c:()=>s});const s=t.p+"assets/images/analyze_query_3-251a3b3cceab1a4c22d933c067766035.png"},5488:(e,n,t)=>{t.d(n,{c:()=>s});const s=t.p+"assets/images/analyze_query_4-f60d2400b6913194c5ed7fde6d7abc34.png"},2432:(e,n,t)=>{t.d(n,{c:()=>s});const s=t.p+"assets/images/sbom_overview-11f78470eba485ca6b53f6be5c6c0cc6.png"},2760:(e,n,t)=>{t.d(n,{c:()=>s});const s=t.p+"assets/images/schema-da6d82444eb0b25cc20352e7eef6c28b.png"},2172:(e,n,t)=>{t.d(n,{I:()=>r,M:()=>i});var s=t(1504);const a={},o=s.createContext(a);function i(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);