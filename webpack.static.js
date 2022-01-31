const path = require("path");
const MergeIntoSingleFilePlugin = require("webpack-merge-and-include-globally");
const { minify } = require("terser");
const CleanCSS = require("clean-css");
const RemovePlugin = require("remove-files-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const scripts = [
  "assets/plugins/jquery/jquery.min.js",
  "assets/plugins/jquery-ui/jquery-ui.min.js",
  "assets/plugins/jquery-validation/jquery.validate.js",
  "assets/plugins/bootstrap/js/bootstrap.bundle.min.js",
  "assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js",
  "assets/plugins/toastr/toastr.min.js",
  "assets/plugins/inputmask/min/jquery.inputmask.bundle.min.js",
  "assets/vendor/bootstrap-select-1.13.14/js/bootstrap-select.min.js",
  // "assets/plugins/select2/js/select2.full.min.js",
  "assets/dist/js/adminlte.js",
  // "assets/dist/js/adminlte.js.map",
  // "assets/dist/js/adminlte.min.js.map"
];

const styles = [
  "assets/plugins/fontawesome-free/css/all.min.css",
  "assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css",
  "assets/plugins/toastr/toastr.min.css",
  "assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
  "assets/vendor/bootstrap-select-1.13.14/css/bootstrap-select.min.css",
  // "assets/plugins/select2/css/select2.min.css",
  // "assets/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css",
  "assets/dist/css/adminlte.min.css",
  "assets/css/custom.css",
];

const staticPath = path.resolve(__dirname, "static");

module.exports = {
  entry: "./package.json",
  output: {
    filename: "[name]",
    path: staticPath,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./assets/img", to: "./img" },
        { from: "./assets/fonts", to: "./fonts" },
        {
          from: "./assets/vendor/@fortawesome/fontawesome-free/webfonts",
          to: "./webfonts",
        },
      ],
    }),
    new MergeIntoSingleFilePlugin({
      files: {
        "js/bundle.js": scripts.map((script) => {
          return path.resolve(__dirname, script);
        }),
        "css/assets.css": styles.map((style) => {
          return path.resolve(__dirname, style);
        }),
      },
      transform: {
        "js/bundle.js": async (code) => {
          const mini = await minify(code);

          return mini.code;
        },
        "css/assets.css": async (style) =>
          new CleanCSS({}).minify(style).styles,
      },
      transformFileName: (filename, extension, hash) => {
        const folder = filename.split("/")[0];

        return `${folder}/${hash}${extension}`;
      },
    }),
    new RemovePlugin({
      before: {
        root: staticPath,
        include: ["js", "css", "img", "fonts", "webfonts"],
      },
      after: {
        root: staticPath,
        include: ["main"],
      },
    }),
  ],
};
