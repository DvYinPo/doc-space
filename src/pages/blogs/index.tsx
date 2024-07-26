import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/pages/_components/HomepageFeatures";
import styles from "./index.module.css";
import { usePluginData } from "@docusaurus/useGlobalData";

export default function (): JSX.Element {
  const myPlugin = usePluginData("docusaurus-theme-classic");
  const context = useDocusaurusContext();
  console.log("=> context", context);
  console.log("=> myPlugin", myPlugin);

  return (
    <Layout description="yinpo blogs showcase!">
      <div>this is blogs page~</div>
    </Layout>
  );
}
