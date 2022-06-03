const fs = require("fs-extra");
const concat = require("concat");

build = async () => {
  const files = [
    "./dist/demo/runtime-es2015.js",
    "./dist/demo/polyfills-es2015.js",
    "./dist/demo/main-es2015.js",
    "./caller.js",
  ];

  await fs.ensureDir("widget");
  await concat(files, "widget/news-widget.js");
};
build();
