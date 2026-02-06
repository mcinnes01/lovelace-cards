import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/panel-cards.ts",
  output: {
    file: "dist/panel-cards.js",
    format: "iife",
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: false, compilerOptions: { target: "ES2020" } }),
    terser(),
  ],
  external: [],
};
