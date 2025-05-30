export const paths = {
  app: {
    root: {
      path: "/",
      getHref: () => "/",
    },
    home: {
      getHref: () => "/",
    },
    about: {
      path: "about",
      getHref: () => "/about",
    },
  },
} as const;
