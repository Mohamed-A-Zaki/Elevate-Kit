import { trans } from "@/shared/utils/trans";

export default function TransExample() {
  return (
    <div className="flex flex-col gap-2 border rounded-md p-5 m-5">
      <div className="text-3xl">{trans("common.homePage")}</div>

      <div>
        {trans("common.greeting", {
          firstName: "Mohamed",
          lastName: "Zaki",
        })}
      </div>
    </div>
  );
}
