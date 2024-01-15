import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let alias = {};

  if (mode === "development") {
    alias = {
      "babylon-msdf-text": path.resolve(
        __dirname,
        "../babylon-msdf-text/src/index.js"
      ),
    };
  }

  return {
    resolve: {
      alias: alias,
    },
    plugins: [],
  };
});
