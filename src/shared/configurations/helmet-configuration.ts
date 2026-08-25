import { setHelmetConfigurations } from "@mongez/react-helmet";
import { trans } from "../../packages/smart-localization";

setHelmetConfigurations({
  // App-name suffix
  // appName: trans("helmet.app_name"),
  appName: "helmet.app_name",
  appendAppName: true,
  appNameSeparator: " | ",

  // translation
  translatable: true,
  translateAppName: true,
  translationFunction: (key: string) => {
    return trans(key as any);
  },
});
