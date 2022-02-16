import path from "path";
import glob from "glob";

const [css, js] = glob.sync("**/*.{js,css}", {
  cwd: path.resolve(__dirname, "static"),
});

export default {
  ssr: false,

  server: {
    port: process.env.NUXT_PORT,
    host: process.env.NUXT_HOST,
  },

  generate: {
    dir: "public",
  },

  components: true,

  build: {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-private-methods", { loose: true }],
        ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
      ],
    },
    extend(config, {}) {
      config.node = {
        fs: "empty",
        child_process: "empty",
      };
    },
  },

  head: {
    title: "Test Nuxt Title",
    meta: [
      { charset: "utf-8" },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge,chrome=1" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
      },
      {
        name: "viewport",
        content: "width=device-width",
      },
    ],

    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Muli:400,300",
        type: "text/css",
      },
      { rel: "apple-touch-icon", href: "/img/AdminLTELogo.png" },
      { rel: "icon", type: "image/png", href: "/img/AdminLTELogo.png" },
      { rel: "stylesheet", href: `/${css}` },
    ],

    script: [{ src: `/${js}`, body: true }],
  },

  loading: "~/components/FullLoader.vue",

  watchers: {
    hot: true,
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },

  plugins: [
    "~/plugins/axios",
    "~/plugins/Validation",
    "~/plugins/Pagination",
    "~/plugins/Swal",
    "~/plugins/VuePlugins",
  ],

  modules: ["@nuxtjs/axios", "nuxt-route-meta"],

  axios: {
    baseURL: `${process.env.NUXT_API_URL}`,
    progress: false,
    headers: {
      common: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    },
  },
  env: process.env,
};
