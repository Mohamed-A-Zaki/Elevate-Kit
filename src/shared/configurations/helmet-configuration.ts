import { setHelmetConfigurations } from "@mongez/react-helmet";
import { trans } from "../utils/trans";

setHelmetConfigurations({
  // App-name suffix
  appName: trans("app_name"),
  appendAppName: true,
  appNameSeparator: " | ",

  // translation
  translatable: true,
  translateAppName: true,
  translationFunction: (key: string) => trans(`helmet.${key}`),
});
