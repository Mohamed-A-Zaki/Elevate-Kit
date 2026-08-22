import { trans } from "@/shared/localization/trans";
import Helmet from "@mongez/react-helmet";

export default function AboutPage() {
  return (
    <>
      <Helmet
        title={trans("helmet.aboutPage")}
        description="Best deals every day."
        keywords={["electronics", "deals", "shop"]}
      />
      <div className="my-5 text-3xl">{trans("common.aboutPage")}</div>
    </>
  );
}
