import { trans } from "@/shared/utils/trans";
import Helmet from "@mongez/react-helmet";

export default function AboutPage() {
  return (
    <>
      <Helmet
        title="aboutPage"
        description="Best deals every day."
        keywords={["electronics", "deals", "shop"]}
      />
      <div className="text-3xl my-5">{trans("common.aboutPage")}</div>
    </>
  );
}
