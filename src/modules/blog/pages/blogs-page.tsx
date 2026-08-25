import { trans } from "@/packages/smart-localization";
import { preferredLocalePath, URLS } from "@/shared/routing";
import { Button } from "@mantine/core";
import { Link } from "react-router";

export default function BlogsPage() {
  return (
    <>
      <div className="my-5 text-3xl">{trans("common.blogsPage")}</div>

      <Button
        component={Link}
        to={preferredLocalePath(URLS.blogDetailsPath(100))}
      >
        {trans("common.blog")}
      </Button>
    </>
  );
}
