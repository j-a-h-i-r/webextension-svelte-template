// @ts-check

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import fs from "fs";
import copy from "rollup-plugin-copy";
import multiInput from "rollup-plugin-multi-input";

const production = !process.env.ROLLUP_WATCH;

/**
 * @param {string} moduleName
 * @param {boolean} useSvelte
 */
function createConfig(moduleName, useSvelte = false) {
  const htmlFileName = `src/app/${moduleName}/${moduleName}.html`;
  const hasHtml = fs.existsSync(htmlFileName);

  return {
    input: `src/app/${moduleName}/${moduleName}.ts`,
    output: {
      format: "iife",
      file: `dist/${moduleName}/${moduleName}.js`,
    },
    plugins: [
      useSvelte &&
      svelte({
        compilerOptions: {
          dev: !production,
        },
        preprocess: sveltePreprocess(),
      }),
      hasHtml &&
      copy({
        targets: [
          { src: htmlFileName, dest: `dist/${moduleName}` }
        ]
      }),
      css({ output: `${moduleName}.css` }),
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

function compileDir(moduleName) {
  return {
    input: `src/app/${moduleName}/**/*.ts`,
    output: {
      dir: `dist/${moduleName}`,
    },
    plugins: [
      multiInput({relative: `src/app/${moduleName}`}),
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

/**
 * Copy Assets and bundle css
 * @returns 
 */
function copyAssets() {
  return {
    input: "src/__dummy__.ts",
    output: {
      dir: ".",
    },
    plugins: [
      copy({
        targets: [
          { src: "src/manifest.json", dest: `dist` },
          { src: "src/static", dest: `dist` },
        ]
      }),
    ]
  }
}

export default [
  createConfig("options", true),
  createConfig("popup", true),
  compileDir("background"),
  compileDir("content_scripts"),
  copyAssets(),
];
