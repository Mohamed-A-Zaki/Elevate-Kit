import { trans } from "@/packages/smart-localization";
import Helmet from "@mongez/react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet
        title={trans("helmet.homePage")}
        description="Best deals every day."
        keywords={["electronics", "deals", "shop"]}
      />
      <div className="my-5 text-3xl">{trans("common.homePage")}</div>
    </>
  );
}
