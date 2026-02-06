import { getBabelInputPlugin, getBabelOutputPlugin } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const plugins = [
  typescript({ declaration: false }),
  nodeResolve(),
  json(),
  commonjs(),
  getBabelInputPlugin({ babelHelpers: "bundled" }),
  getBabelOutputPlugin({
    presets: [["@babel/preset-env", { modules: false }]],
    compact: true,
  }),
  terser(),
];

export default {
  input: "src/panel-cards.ts",
  output: {
    file: "dist/lovelace-cards.js",
    format: "es",
    inlineDynamicImports: true,
  },
  plugins,
};
