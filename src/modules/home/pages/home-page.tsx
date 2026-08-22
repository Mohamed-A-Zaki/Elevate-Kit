import { trans } from "@/shared/localization/trans";
import Helmet from "@mongez/react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet
        title={trans("helmet.homePage")}
        description="Best deals every day."
        keywords={["electronics", "deals", "shop"]}
      />
    </>
  );
}
