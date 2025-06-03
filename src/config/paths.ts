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
      root: {
        path: "tools",
        getHref: () => "/tools",
      },
      tuner: {
        getHref: () => "/tools",
      },
      metronome: {
        path: "metronome",
        getHref: () => "/tools/metronome",
      },
      chord_library: {
        path: "chord_library",
        getHref: () => "/tools/chord_library",
      },
    },
    resources: {
      path: "resources",
      getHref: () => "/resources",
    },
  },
} as const;
