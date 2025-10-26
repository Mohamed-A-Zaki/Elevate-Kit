import { Button } from "@mantine/core";
import { queryString } from "../packages/queryString.ts";

export default function HomePage() {
  return (
    <>
      <div className={"flex items-center gap-4 m-3"}>
        <Button
          onClick={() => {
            console.log(queryString.get());
          }}
        >
          get query string
        </Button>
        <Button
          onClick={() => {
            queryString.set({
              name: "John",
              age: 30,
              skills: ["ts", "react"],
            });
          }}
        >
          set query string
        </Button>
        <Button
          onClick={() => {
            queryString.remove();
          }}
        >
          remove query string
        </Button>
        <Button onClick={() => queryString.update({ name: "ahmed" })}>
          update query string
        </Button>
      </div>
    </>
  );
}
