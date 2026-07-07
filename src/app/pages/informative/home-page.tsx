import { trans } from "@/shared/utils/trans";

export default function HomePage() {
  return (
    <div>
      <div className="text-3xl my-5">{trans("common.homePage")}</div>

      <div>
        {trans("common.greeting", {
          firstName: "Mohamed",
          lastName: "Zaki",
        })}
      </div>
    </div>
  );
}
