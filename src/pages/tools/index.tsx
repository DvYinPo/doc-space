import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { usePluginData } from "@docusaurus/useGlobalData";

export default function (): JSX.Element {
  const myPlugin = usePluginData("docusaurus-theme-classic");
  const context = useDocusaurusContext();
  console.log("=> context", context);
  console.log("=> myPlugin", myPlugin);

  return (
    <Layout description="yinpo blogs showcase!">
      <div>this is tools page~</div>
    </Layout>
  );
}
