import { setHelmetConfigurations } from "@mongez/react-helmet";
import { trans } from "../utils/trans";

setHelmetConfigurations({
  // App-name suffix
  appName: trans("app_name" as any),
  appendAppName: true,
  appNameSeparator: " | ",

  // translation
  translatable: true,
  translateAppName: true,
  translationFunction: (key: string) => {
    return trans(`helmet.${key}` as any);
  },
});
