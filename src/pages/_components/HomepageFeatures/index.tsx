import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

type FeatureItem = {
  title: string;
  link: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Blog",
    Svg: require("@site/static/tiger/happy.svg").default,
    link: "/blog",
    description: <>Blogs</>,
  },
  {
    title: "Tools",
    Svg: require("@site/static/tiger/adorkable.svg").default,
    link: "/tools",
    description: <>Some useful tools</>,
  },
  {
    title: "Wrappers",
    Svg: require("@site/static/tiger/caper.svg").default,
    link: "/docs/",
    description: <>Function wrappers</>,
  },
  {
    title: "Components",
    Svg: require("@site/static/tiger/easy.svg").default,
    link: "/components",
    description: <>My components</>,
  },
];

function Feature({ title, Svg, description, link }: FeatureItem) {
  return (
    <Link className={styles.itemCard} href={link}>
      <div className="text--center">
        <Heading as="h3">{title}</Heading>
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <p>{description}</p>
      </div>
    </Link>
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
