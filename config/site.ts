export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "EduSpace",
  description:
    "გამოიკვლიეთ კოდირების სამყარო EduSpace-ით. ისწავლეთ პროგრამირება ონლაინ და დაეუფლეთ თქვენს უნარებს.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Compiler",
      href: "/compiler/csharp",
    },
    {
      label: "Social",
      href: "/social",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],

  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
