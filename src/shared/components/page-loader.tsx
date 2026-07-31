import { Loader } from "@mantine/core";

export default function PageLoader() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <Loader size={40} />
    </div>
  );
}
