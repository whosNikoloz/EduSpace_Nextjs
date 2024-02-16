export const i18n = {
  defaultLocale: "ge",
  locales: ["ge", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
