import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Tools",
    Svg: require("@site/static/tiger/adorkable.svg").default,
    description: <>Some useful tools</>,
  },
  {
    title: "Wrappers",
    Svg: require("@site/static/tiger/caper.svg").default,
    description: <>Function wrappers</>,
  },
  {
    title: "Components",
    Svg: require("@site/static/tiger/easy.svg").default,
    description: <>My components</>,
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={styles.itemCard}>
      <div className="text--center">
        <Heading as="h3">{title}</Heading>
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className={styles.itemContainer}>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
