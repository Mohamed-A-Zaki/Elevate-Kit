import { Button } from "@mantine/core";
import { cache } from "smart-cache-ts";
import { queryString } from "smart-query-string";
import LanguageDirectionToggle from "../components/utils/language-direction-toggle.tsx";
import { ThemeToggler } from "../components/utils/theme-toggler.tsx";

type User = {
  name: string;
  age: number;
  job: string;
};

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

      <hr />

      <div className={"flex items-center gap-4 m-3"}>
        <Button
          onClick={() => {
            console.log(cache.get<User>("test-user")?.name);
          }}
        >
          get user from cache
        </Button>
        <Button
          onClick={() => {
            cache.set<User>("test-user", {
              name: "Mohamed-Zaki",
              age: 26,
              job: "Front end developer",
            });
          }}
        >
          add test user to cache
        </Button>
        <Button
          onClick={() => {
            cache.remove("test-user");
          }}
        >
          remove test-user from cache
        </Button>
        <Button
          onClick={() => {
            cache.clear();
          }}
        >
          clear cache
        </Button>
      </div>

      <hr />

      <div className={`flex items-center gap-4 m-3`}>
        <ThemeToggler variant={"select"} />
        <LanguageDirectionToggle />
      </div>
    </>
  );
}
