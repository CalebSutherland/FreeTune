export const paths = {
  auth: {
    register: {
      path: "/auth/register",
      getHref: () => "/auth/register",
    },
    login: {
      path: "/auth/login",
      getHref: () => "/auth/login",
    },
  },

  app: {
    root: {
      path: "/",
      getHref: () => "/",
    },
    home: {
      getHref: () => "/",
    },
    tools: {
      path: "tools",
      getHref: () => "/tools",
    },
    resources: {
      path: "resources",
      getHref: () => "/resources",
    },
    about: {
      path: "about",
      getHref: () => "/about",
    },
  },
} as const;
