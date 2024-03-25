"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4732],{2376:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>c,contentTitle:()=>d,default:()=>a,frontMatter:()=>l,metadata:()=>n,toc:()=>h});var t=s(7624),r=s(2172);const l={},d="Filters",n={id:"reference/filters",title:"Filters",description:"ValuesMatchPossibilitiesFilter",source:"@site/docs/reference/filters.md",sourceDirName:"reference",slug:"/reference/filters",permalink:"/docs/docs/reference/filters",draft:!1,unlisted:!1,editUrl:"https://github.com/nodesteram-proj/docs/tree/main/packages/create-docusaurus/templates/shared/docs/reference/filters.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Extractors",permalink:"/docs/docs/reference/extractors"},next:{title:"Interpreting Reference",permalink:"/docs/docs/reference/interpreting"}},c={},h=[{value:"<code>ValuesMatchPossibilitiesFilter</code>",id:"valuesmatchpossibilitiesfilter",level:2},{value:"<code>ExcludeWhenValuesMatchPossibilities</code>",id:"excludewhenvaluesmatchpossibilities",level:2},{value:"<code>FieldMatcher</code>",id:"fieldmatcher",level:2},{value:"Reminder",id:"reminder",level:2}];function o(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.M)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.h1,{id:"filters",children:"Filters"}),"\n",(0,t.jsx)(i.h2,{id:"valuesmatchpossibilitiesfilter",children:(0,t.jsx)(i.code,{children:"ValuesMatchPossibilitiesFilter"})}),"\n",(0,t.jsxs)(i.p,{children:["The ",(0,t.jsx)(i.code,{children:"ValuesMatchPossibilitiesFilter"})," filter is used to exclude records where a field matches any of a list of possibilities."]}),"\n",(0,t.jsxs)(i.p,{children:["The ",(0,t.jsx)(i.code,{children:"ValuesMatchPossibilitiesFilter"})," is accessible via the ",(0,t.jsx)(i.code,{children:"implementation"})," string ",(0,t.jsx)(i.code,{children:"nodestream.pipeline.filters:ValuesMatchPossibilitiesFilter"}),"."]}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Key"}),(0,t.jsx)(i.th,{children:"Description"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Default"}),(0,t.jsx)(i.th,{children:"Required"})]})}),(0,t.jsx)(i.tbody,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"fields"})}),(0,t.jsx)(i.td,{children:"A list of field matchers."}),(0,t.jsx)(i.td,{children:"List[FieldMatcher]"}),(0,t.jsx)(i.td,{children:"N/A"}),(0,t.jsx)(i.td,{children:"Yes"})]})})]}),"\n",(0,t.jsx)(i.h2,{id:"excludewhenvaluesmatchpossibilities",children:(0,t.jsx)(i.code,{children:"ExcludeWhenValuesMatchPossibilities"})}),"\n",(0,t.jsxs)(i.p,{children:["The ",(0,t.jsx)(i.code,{children:"ExcludeWhenValuesMatchPossibilities"})," filter is used to exclude records where a field matches any of a list of possibilities.\nThe ",(0,t.jsx)(i.code,{children:"ExcludeWhenValuesMatchPossibilities"})," is accessible via the ",(0,t.jsx)(i.code,{children:"implementation"})," string ",(0,t.jsx)(i.code,{children:"nodestream.pipeline.filters:ExcludeWhenValuesMatchPossibilities"}),"."]}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Key"}),(0,t.jsx)(i.th,{children:"Description"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Default"}),(0,t.jsx)(i.th,{children:"Required"})]})}),(0,t.jsx)(i.tbody,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"fields"})}),(0,t.jsx)(i.td,{children:"A list of field matchers."}),(0,t.jsx)(i.td,{children:"List[FieldMatcher]"}),(0,t.jsx)(i.td,{children:"N/A"}),(0,t.jsx)(i.td,{children:"Yes"})]})})]}),"\n",(0,t.jsx)(i.h2,{id:"fieldmatcher",children:(0,t.jsx)(i.code,{children:"FieldMatcher"})}),"\n",(0,t.jsxs)(i.p,{children:["A ",(0,t.jsx)(i.code,{children:"FieldMatcher"})," is an object with the following properties:"]}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Key"}),(0,t.jsx)(i.th,{children:"Description"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Default"}),(0,t.jsx)(i.th,{children:"Required"})]})}),(0,t.jsxs)(i.tbody,{children:[(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"value"})}),(0,t.jsx)(i.td,{children:"An expression that selects the value of the field to match on."}),(0,t.jsx)(i.td,{children:"JMESPath"}),(0,t.jsx)(i.td,{children:"N/A"}),(0,t.jsx)(i.td,{children:"Yes"})]}),(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"possibilities"})}),(0,t.jsx)(i.td,{children:"A list of values to match against."}),(0,t.jsx)(i.td,{children:"List[Any]"}),(0,t.jsx)(i.td,{children:"N/A"}),(0,t.jsx)(i.td,{children:"Yes"})]}),(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:(0,t.jsx)(i.code,{children:"normalization"})}),(0,t.jsxs)(i.td,{children:["A list of normalization functions to apply to the field value before matching. See ",(0,t.jsx)(i.a,{href:"../interpreting#normalizers",children:"normalization"})," reference for flags"]}),(0,t.jsx)(i.td,{children:"Dict[str, Any]"}),(0,t.jsx)(i.td,{children:"N/A"}),(0,t.jsx)(i.td,{children:"No"})]})]})]}),"\n",(0,t.jsx)(i.h2,{id:"reminder",children:"Reminder"}),"\n",(0,t.jsxs)(i.p,{children:["Remember that you can always build your own filters by implementing the ",(0,t.jsx)(i.code,{children:"Filter"})," interface. See ",(0,t.jsx)(i.a,{href:"../../tutorials-advanced/new-steps",children:"here"})," for more information."]})]})}function a(e={}){const{wrapper:i}={...(0,r.M)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},2172:(e,i,s)=>{s.d(i,{I:()=>n,M:()=>d});var t=s(1504);const r={},l=t.createContext(r);function d(e){const i=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function n(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),t.createElement(l.Provider,{value:i},e.children)}}}]);