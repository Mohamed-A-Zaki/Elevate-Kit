import PositionsPage from "@/modules/positions/pages/positions-page";
import Helmet from "@mongez/react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet
        title="homePage"
        description="Best deals every day."
        keywords={["electronics", "deals", "shop"]}
      />

      <PositionsPage />
    </>
  );
}
