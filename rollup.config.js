// @ts-check

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

/**
 * @param {string} filename
 * @param {boolean} useSvelte
 */
function createConfig(filename, useSvelte = false) {
  return {
    input: `src/${filename}.ts`,
    output: {
      format: "iife",
      file: `dist/generated/${filename}.js`,
    },
    plugins: [
      useSvelte &&
      svelte({
        compilerOptions: {
          dev: !production,
        },
        preprocess: sveltePreprocess(),
      }),
      css({ output: `${filename}.css` }),
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
      typescript(),
      production && terser(),
    ],
  };
}

export default [
  createConfig("options", true),
  createConfig("popup", true),
  createConfig("background"),
  createConfig("content_scripts/script"),
];
