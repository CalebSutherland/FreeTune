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
      classic_tuner: {
        path: "classic_tuner",
        getHref: () => "/tools/classic_tuner",
      },
      metronome: {
        path: "metronome",
        getHref: () => "/tools/metronome",
      },
      chord_library: {
        root: {
          path: "chord_library",
          getHref: () => "/tools/chord_library",
        },
        chord_library_key: {
          path: ":key",
          getHref: (key: string) => `/tools/chord_library/${key}`,
        },
        chord_library_key_suffix: {
          path: ":key/:suffix",
          getHref: (key: string, suffix: string) =>
            `/tools/chord_library/${key}/${suffix}`,
        },
      },
    },
    resources: {
      path: "resources",
      getHref: () => "/resources",
    },
  },
} as const;
