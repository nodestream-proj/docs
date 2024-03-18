import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Build Fast',
    Svg: require('@site/static/img/undraw_nodestream_code.svg').default,
    description: (
      <>
        Not familiar with Cypher or Gremlin? No problem! Nodestream provides a
        simple, yet powerful, DSL to build a graph from your data.
      </>
    ),
  },
  {
    title: 'Stay Flexible',
    Svg: require('@site/static/img/undraw_nodestream_servers.svg').default,
    description: (
      <>
        Nodestream is built to support multiple graph databases, including
        Neo4j and Amazon Neptune. You can even use multiple databases in the
        same project!
      </>
    ),
  },
  {
    title: 'Extract Insights',
    Svg: require('@site/static/img/undraw_nodestream_data_processing.svg').default,
    description: (
      <>
        Nodestream provides tooling to convert build reproducible pipelines 
        to run graph algorithms and extract insights from your data. Operationalize
        your Jupyter notebooks.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
