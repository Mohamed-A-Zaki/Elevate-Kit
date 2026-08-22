import { trans } from "@/shared/localization/trans";
import { Button, Card, MultiSelect, Select } from "@mantine/core";
import Helmet from "@mongez/react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet
        title={trans("helmet.homePage")}
        description="Best deals every day."
        keywords={["electronics", "deals", "shop"]}
      />

      <div className="py-10">
        <Card>
          <Select
            label="Your favorite library"
            placeholder="Pick value"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
          <MultiSelect
            label="Your favorite libraries"
            placeholder="Pick value"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
          <Button mt={10} className="w-fit! ms-auto">test</Button>

          <div>test</div>
        </Card>
      </div>
    </>
  );
}
