import { preferredLocalePath, URLS } from "@/shared/routing";
import { trans } from "@/shared/utils/trans";
import { Button } from "@mantine/core";
import { Link } from "react-router";

export default function BlogsPage() {
  return (
    <>
      <div className="text-3xl my-5">{trans("common.blogsPage")}</div>

      <Button
        component={Link}
        to={preferredLocalePath(URLS.blogDetailsPath(100))}
      >
        {trans("common.blog")}
      </Button>
    </>
  );
}
