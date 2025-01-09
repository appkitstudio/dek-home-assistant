import svgr from "vite-plugin-svgr";

// This file is used to extend the options used for rollup.
// Add your own options here to customize the build.
// https://dek.appkit.studio/docs/plugins/rollup-options
export function extendOptions(options) {
  // add the svgr plugin to the rollup options to allow importing SVG files as React components
  options.plugins.push(svgr());

  return options;
}
